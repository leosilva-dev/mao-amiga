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

const SignIn: React.FC = () => {
  const { colorMode } = useColorMode();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const valide = () => {
    if (password.length < 3) {
      Feedback("A senha precisa conter pelo menos três caracteres", "error");
      return false;
    }
    if (!email.includes("@")) {
      Feedback("Informe um e-mail válido", "error");
      return false;
    }
    if (!name.length) {
      Feedback("O campo nome é obrigatório", "error");
      return false;
    }
    Feedback("Criando sua conta...", "info");
    return true;
  };

  const handleSignIn = async () => {
    await signInEmailPassword(email, password);
  };

  if (isSuccess) {
    router.push(process.env.APP_URL || "https://pomotask-next.vercel.app/");
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
                      onClick={() => router.push("/signup")}
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

export default SignIn;
