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
    <Box
      p="4"
      m="4"
      width={"full"}
      boxShadow="xl"
      cursor="pointer"
      borderRadius="md"
      _hover={{
        boxShadow: "2xl",
        transition: "all 0.5s ease-out",
      }}
      onClick={() => router.push(`/ong/${id}`)}
    >
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
      <Box display={"flex"} justifyContent="end">
        <Button
          size={"sm"}
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
