import React, { useEffect, useState } from "react";
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
  Textarea,
} from "@chakra-ui/react";
import { useSignUpEmailPassword } from "@nhost/react";

import { Feedback } from "../shared/util/Feedback";
import { useRouter } from "next/router";
import { ongService } from "../shared/service/api/ong/Ong";
import VerifyEmail from "../shared/components/verify-email/VerifyEmail";

const Cadastrar: React.FC = () => {
  const { colorMode } = useColorMode();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
    if (!name.length) {
      Feedback("O campo nome é obrigatório", "error");
      return false;
    }
    if (!description.length) {
      Feedback("O campo descrição é obrigatório", "error");
      return false;
    }
    if (!email.includes("@")) {
      Feedback("Informe um e-mail válido", "error");
      return false;
    }
    if (password.length < 8) {
      Feedback("A senha precisa conter pelo menos oito caracteres", "error");
      return false;
    }
    Feedback("Criando sua conta...", "info");
    return true;
  };

  const handleSignUp = async () => {
    const ongIsValid = valide();
    const nhost_id = ongService.generateNhostId();

    if (ongIsValid) {
      const ongCreatedWithSuccess = await ongService.createOng(
        name,
        description,
        nhost_id
      );

      if (ongCreatedWithSuccess) {
        const response = await signUpEmailPassword(email, password, {
          displayName: name,
          metadata: {
            nhost_id: nhost_id,
          },
        });
        console.log(response);
      } else {
        Feedback("Ocorreu um erro ao criar sua conta", "error");
      }
    }
  };

  if (isSuccess) {
    router.push("/");
    return null;
  }

  return (
    <>
      {needsEmailVerification ? (
        <VerifyEmail />
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
                  <FormLabel>Nome da ONG</FormLabel>
                  <Input
                    width={400}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </FormControl>

                <FormControl id="description">
                  <FormLabel>Descrição</FormLabel>
                  <Textarea
                    width={400}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                      onClick={() => router.push("/entrar")}
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

export default Cadastrar;
