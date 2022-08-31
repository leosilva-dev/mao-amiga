import React from "react";
import { Button, Text, Box, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/pt-br";

interface IPublicacaoCardProps {
  title: string;
  ongName: string;
  nhost_id: string;
  created_at: string;
  description: string;
}

export const PublicacaoCard: React.FC<IPublicacaoCardProps> = ({
  title,
  ongName,
  nhost_id,
  created_at,
  description,
}) => {
  const router = useRouter();

  return (
    <Box
      p="4"
      m="4"
      width={"full"}
      boxShadow="xl"
      borderRadius="md"
      _hover={{
        boxShadow: "2xl",
        transition: "all 0.5s ease-out",
      }}
    >
      <Box alignItems="center" marginBottom={2}>
        <Text
          fontSize={"md"}
          fontWeight="bold"
          color="blue.400"
          cursor={"pointer"}
          _hover={{
            color: "blue.600",
            transition: "all 0.5s ease-out",
          }}
          onClick={() => router.push(`/ong/${nhost_id}`)}
        >
          {ongName}
        </Text>
        <Text fontSize={"sm"}>{moment(created_at).fromNow()}</Text>
        <Text fontWeight="bold" fontSize={"2xl"}>
          {title}
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text fontSize={"lg"} textAlign={"left"} maxW={"6xl"}>
          {description}
        </Text>
      </Box>
      <Divider />
      <Box marginTop={2} display={"flex"} justifyContent="end">
        <Button
          size={"sm"}
          color="white"
          bg={"green.400"}
          _hover={{
            bg: "green.500",
          }}
          onClick={() => router.push(`/`)}
        >
          Quero ajudar
        </Button>
      </Box>
    </Box>
  );
};
