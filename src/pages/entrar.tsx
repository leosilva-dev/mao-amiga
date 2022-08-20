import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { useSignInEmailPassword } from "@nhost/react";

import { Feedback } from "../shared/util/Feedback";
import { useRouter } from "next/router";

const Entrar: React.FC = () => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { signInEmailPassword, isSuccess, needsEmailVerification, isError } =
    useSignInEmailPassword();

  const handleSignIn = async () => {
    Feedback("Acessando sua conta...", "info");
    const response = await signInEmailPassword(email, password);

    if (isError) {
      Feedback(
        response.error?.message || "Ocorreu um erro ao acessar a sua conta...",
        "error"
      );
    }
  };

  if (isSuccess) {
    router.push("/");
    return null;
  }

  return (
    <>
      {needsEmailVerification ? (
        <p>
          Please check your mailbox and follow the verification link to verify
          your email.
        </p>
      ) : (
        <>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Box
              bg={colorMode === "light" ? "white" : "gray.700"}
              boxShadow={"lg"}
              rounded={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Senha</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={() => handleSignIn()}
                    >
                      Entrar
                    </Button>
                    <Button
                      variant={"link"}
                      bg={colorMode === "light" ? "whiteAlpha.100" : "gray.700"}
                      color={"blue.500"}
                      onClick={() => router.push("/cadastrar")}
                    >
                      Ainda não possui uma conta? Cadastrar
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

export default Entrar;
