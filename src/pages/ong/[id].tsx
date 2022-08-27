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

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [ong, setOng] = useState<IOng>();
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();
  const [isLoading, setIsLoading] = useState(true);

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

          {publicacoes === undefined && (
            <Text fontSize={"xl"}>
              Esta ong ainda não publicou nenhuma necessidade...
            </Text>
          )}

          {publicacoes?.map((publicacao) => (
            <PublicacaoCard
              key={publicacao.id}
              title={publicacao.title}
              description={publicacao.description}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;
