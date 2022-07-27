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
import { useSignUpEmailPassword } from "@nhost/react";

import { Feedback } from "../shared/util/Feedback";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const { colorMode } = useColorMode();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();

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

  const goToProfile = () => {
    // navigate("/profile");
  };

  const handleSignUp = async () => {
    await signUpEmailPassword(email, password, {
      displayName: name,
    });

    console.log("isSuccess", isSuccess);
    console.log("needsEmailVerification", needsEmailVerification);
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
                <FormControl id="name">
                  <FormLabel>Nome</FormLabel>
                  <Input
                    width={400}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </FormControl>

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
                      onClick={() => handleSignUp()}
                    >
                      Cadastrar
                    </Button>
                    <Button
                      variant={"link"}
                      bg={colorMode === "light" ? "whiteAlpha.100" : "gray.700"}
                      color={"blue.500"}
                      onClick={() => router.push("/signin")}
                    >
                      Já possui conta? Entrar
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

export default SignUp;
