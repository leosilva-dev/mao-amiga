import React from "react";
import { Button, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IOngCardProps {
  id: number;
  nome: string;
  descricao: string;
}

export const OngCard: React.FC<IOngCardProps> = ({ id, nome, descricao }) => {
  const router = useRouter();

  return (
    <Box p="4" boxShadow="xl" m="4" borderRadius="md" width={"full"}>
      <Box alignItems="center" marginBottom={2}>
        <Text fontWeight="bold" fontSize={"2xl"}>
          {nome}
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text fontSize={"lg"} textAlign={"left"} maxW={"6xl"}>
          {descricao}
        </Text>
      </Box>
      <Box>
        <Button
          variant="solid"
          color="white"
          bg={"green.400"}
          _hover={{
            bg: "green.500",
          }}
          onClick={() => router.push(`/ong/${id}`)}
        >
          Conhecer ONG
        </Button>
      </Box>
    </Box>
  );
};
