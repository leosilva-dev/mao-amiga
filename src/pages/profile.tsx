import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Stack,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useUserData } from "@nhost/react";
import withAuth from "../shared/components/with-auth/WithAuth";
import { IOng, ongService } from "../shared/service/api/ong/Ong";
import { Feedback } from "../shared/util/Feedback";

const Profile: React.FC = () => {
  const user = useUserData();
  const { colorMode } = useColorMode();

  const [editMode, setEditMode] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [ong, setOng] = useState<IOng>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Mão amiga | Perfil";
  }, []);

  useEffect(() => {
    ongService
      .getOngByNhostId(user?.metadata.nhost_id as string)
      .then((response) => {
        if (response) {
          setOng(response);
        }
        setIsLoading(false);
      });
  }, [user]);

  const handleUpdateOng = async (
    id: number,
    name: string,
    description: string
  ) => {
    setIsSavingChanges(true);
    const updatedSuccessfully = await ongService.updateOngById(
      id,
      name,
      description
    );
    if (updatedSuccessfully) {
      Feedback("Perfil atualizado com sucesso", "success");
    } else {
      Feedback(
        "Ocorreu um erro ao atualizar o seu perfil. Tente novamanete mais tarde...",
        "error"
      );
    }
    setIsSavingChanges(false);
    setEditMode(false);
  };

  return (
    <Box marginBottom={5} width="full" height="full">
      {isLoading && (
        <Box width="full" height="full">
          <Progress isIndeterminate size="xs" color="green.300" />
          <Text fontSize={"md"}>Carregando...</Text>
        </Box>
      )}
      {!isLoading && ong !== undefined && (
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
                    value={ong.name}
                    onChange={(e) => setOng({ ...ong, name: e.target.value })}
                    type="text"
                    disabled={!editMode}
                  />
                </FormControl>

                <FormControl id="description">
                  <FormLabel>Descrição</FormLabel>
                  <Textarea
                    width={400}
                    value={ong.description}
                    onChange={(e) =>
                      setOng({ ...ong, description: e.target.value })
                    }
                    disabled={!editMode}
                  />
                </FormControl>

                <Stack spacing={10}>
                  <Stack>
                    {editMode && (
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        isLoading={isSavingChanges}
                        loadingText="Salvando alterações"
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={() => {
                          handleUpdateOng(ong.id, ong.name, ong.description);
                        }}
                      >
                        Salvar alterações
                      </Button>
                    )}
                    {!editMode && (
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={() => {
                          setEditMode(true);
                        }}
                      >
                        Editar perfil
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default withAuth(Profile);
