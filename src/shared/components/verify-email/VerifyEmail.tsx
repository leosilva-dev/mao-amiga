import { Box, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

export default function VerifyEmail() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Verifique o seu e-mail
      </Heading>
      <Text color={"gray.500"}>
        Enviamos um link de verificação para o e-mail informado por você no
        cadastro. Para confirmar a sua conta basta clicar no link!
      </Text>
    </Box>
  );
}
