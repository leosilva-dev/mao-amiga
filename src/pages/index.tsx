import type { NextPage } from "next";
import { Heading, Highlight, Box, Progress, Text } from "@chakra-ui/react";

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

      {ongs.map((ong) => (
        <OngCard
          key={ong.id}
          nhost_id={ong.nhost_id}
          nome={ong.name}
          descricao={ong.description}
        />
      ))}
    </Box>
  );
};

export default Home;
