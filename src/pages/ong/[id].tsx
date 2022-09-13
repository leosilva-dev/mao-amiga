import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Box, Progress, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { IOng, ongService } from "../../shared/service/api/ong/Ong";
import {
  IPublicacao,
  publicacaoService,
} from "../../shared/service/api/publicacao/Publicacao";
import { PublicacaoCard } from "../../shared/components/publicacao-card/PublicacaoCard";
import { useUserData } from "@nhost/react";

const Home: NextPage = () => {
  const router = useRouter();
  const user = useUserData();
  const { id } = router.query;

  const [render, setRender] = useState(false);
  const [ong, setOng] = useState<IOng>();
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [ongLogada, setOngLogada] = useState<IOng>();

  useEffect(() => {
    if (user?.metadata.nhost_id !== undefined) {
      ongService
        .getByNhostId(user.metadata.nhost_id as string)
        .then((response) => {
          if (response) {
            setOngLogada(response);
            console.log(response);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    ongService.getByNhostId(id as string).then((response) => {
      if (response) {
        setOng(response);
      }
    });
  }, [id]);

  useEffect(() => {
    if (ong?.id === undefined) return;
    publicacaoService.getByOngId(ong.id).then((response) => {
      if (response) {
        setPublicacoes(response);
        console.log(response);
      }
      setIsLoading(false);
    });
  }, [ong]);

  return (
    <Box marginBottom={5} width="full" height="full">
      {isLoading && (
        <Box width="full" height="full">
          <Progress isIndeterminate size="xs" color="green.300" />
          <Text fontSize={"md"}>Carregando...</Text>
        </Box>
      )}
      {!isLoading && ong !== undefined && (
        <>
          <Text fontSize={"5xl"}>{ong.name}</Text>
          <Text fontSize={"xl"}>{ong.description}</Text>

          <Text marginTop={5} fontSize={"2xl"}>
            Publicações da ong:
          </Text>

          {publicacoes === undefined && (
            <Text fontSize={"xl"}>
              Esta ong ainda não publicou nenhuma necessidade...
            </Text>
          )}

          {publicacoes &&
            ong &&
            publicacoes?.map((publicacao) => (
              <PublicacaoCard
                key={publicacao.id}
                ongLogadaId={ongLogada?.id}
                ongPublicacaoId={publicacao.ong_id}
                publicacaoId={publicacao.id}
                title={publicacao.title}
                nhost_id={String(ongLogada?.nhost_id)}
                ongName={String(ong?.name)}
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
