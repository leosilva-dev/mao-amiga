import type { NextPage } from "next";
import { Heading, Highlight, Box, Progress, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {
  IPublicacao,
  publicacaoService,
} from "../shared/service/api/publicacao/Publicacao";
import { PublicacaoCard } from "../shared/components/publicacao-card/PublicacaoCard";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { CreatePublicacao } from "../shared/components/create-publicacao/CreatePublicacao";
import { IOng, ongService } from "../shared/service/api/ong/Ong";

const Home: NextPage = () => {
  const user = useUserData();
  const { isAuthenticated } = useAuthenticationStatus();

  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [ongLogada, setOngLogada] = useState<IOng>();

  useEffect(() => {
    ongService
      .getByNhostId(user?.metadata.nhost_id as string)
      .then((response) => {
        if (response) {
          setOngLogada(response);
        }
      });
  }, [user]);

  useEffect(() => {
    loadPublicacoes();
  }, []);

  useEffect(() => {
    loadPublicacoes();
  }, [render]);

  const loadPublicacoes = () => {
    publicacaoService.getAll().then((response) => {
      if (response) {
        setPublicacoes(response);
      }
      setIsLoading(false);
    });
  };

  return (
    <Box marginBottom={5} width="full" height="full">
      {isLoading && (
        <Box width="full" height="full">
          <Progress isIndeterminate size="xs" color="green.300" />
          <Text fontSize={"md"}>Carregando...</Text>
        </Box>
      )}
      {!isLoading && (
        <>
          <Heading lineHeight="tall">
            <Highlight
              query={["precisa", "ajuda"]}
              styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
            >
              Encontre alguém que precisa da sua ajuda.
            </Highlight>
          </Heading>

          {isAuthenticated && ongLogada && (
            <Box display={"flex"} justifyContent="center" marginTop={5}>
              <CreatePublicacao
                ongId={ongLogada?.id}
                render={render}
                setRender={setRender}
              />
            </Box>
          )}

          {publicacoes &&
            publicacoes
              .sort(
                (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
              )
              .map((publicacao) => (
                <PublicacaoCard
                  key={publicacao.id}
                  ongLogadaId={ongLogada?.id}
                  ongPublicacaoId={publicacao.ong_id}
                  publicacaoId={publicacao.id}
                  title={publicacao.title}
                  nhost_id={String(publicacao.ong.nhost_id)}
                  ongName={String(publicacao.ong.name)}
                  created_at={publicacao.created_at}
                  description={publicacao.description}
                  render={render}
                  setRender={setRender}
                />
              ))}
        </>
      )}
    </Box>
  );
};

export default Home;
