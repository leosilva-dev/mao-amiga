import type { NextPage } from "next";
import {
  Heading,
  HStack,
  Skeleton,
  Stack,
  Highlight,
  VStack,
  Box,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { IOng, ongService } from "../shared/service/api/ong/Ong";
import { OngCard } from "../shared/components/ong-card/OngCard";

const Home: NextPage = () => {
  const [ongs, setOngs] = useState<IOng[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ongService.getAllOngs().then((ongs) => {
      if (ongs) {
        setOngs(ongs);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <Box marginBottom={5} width="full" height="full">
      {isLoading && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
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

      {ongs.map((ong) => (
        <OngCard
          key={ong.id}
          id={ong.id}
          nome={ong.nome}
          descricao={ong.descricao}
        />
      ))}
    </Box>
  );
};

export default Home;
