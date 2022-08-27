import type { NextPage } from "next";
import { Heading, Highlight, Box, Progress, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {
  IPublicacao,
  publicacaoService,
} from "../shared/service/api/publicacao/Publicacao";
import { PublicacaoCard } from "../shared/components/publicacao-card/PublicacaoCard";
import { stringify } from "querystring";

const Home: NextPage = () => {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    publicacaoService.getAll().then((response) => {
      if (response) {
        setPublicacoes(response);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <Box marginBottom={5} width="full" height="full">
      {isLoading && (
        <Box width="full" height="full">
          <Progress isIndeterminate size="xs" color="green.300" />
          <Text fontSize={"md"}>Carregando...</Text>
        </Box>
      )}
      {!isLoading && (
        <Heading lineHeight="tall">
          <Highlight
            query={["precisa", "ajuda"]}
            styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
          >
            Encontre alguém que precisa da sua ajuda.
          </Highlight>
        </Heading>
      )}

      {publicacoes &&
        publicacoes.map((publicacao) => (
          <PublicacaoCard
            key={publicacao.id}
            ongName={String(publicacao.ong_id)}
            title={publicacao.title}
            description={publicacao.description}
          />
        ))}
    </Box>
  );
};

export default Home;
