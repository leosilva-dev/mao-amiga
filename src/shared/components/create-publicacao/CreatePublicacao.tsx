import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Feedback } from "../../util/Feedback";
import { publicacaoService } from "../../service/api/publicacao/Publicacao";

interface ICreatePublicacaoProps {
  ongId: number;
  render: boolean;
  setRender: (value: boolean) => void;
}

export const CreatePublicacao: React.FC<ICreatePublicacaoProps> = ({
  ongId,
  render,
  setRender,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const valide = () => {
    if (!title.length) {
      Feedback("O campo título é obrigatório", "error");
      return false;
    }
    if (!description.length) {
      Feedback("O campo descrição é obrigatório", "error");
      return false;
    }
    return true;
  };

  const handleCreatePublication = async () => {
    setIsSavingChanges(true);

    const publicacaoIsValid = valide();

    if (publicacaoIsValid) {
      const CreatedWithSuccess = await publicacaoService.create(
        ongId,
        title,
        description
      );

      if (CreatedWithSuccess) {
        Feedback("Publicação criada com sucesso", "success");
      } else {
        Feedback(
          "Ocorreu um erro ao criar a sua publicação. Tente novamanete mais tarde...",
          "error"
        );
      }
      setTitle("");
      setDescription("");
      setIsSavingChanges(false);
      onClose();
      setRender(!render);
    }
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        color="white"
        background="primary"
        _hover={{
          background: "primaryHover",
        }}
        onClick={onOpen}
      >
        Nova publicação
      </Button>
      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar uma nova publicação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <Box>
                <FormControl id="title">
                  <FormLabel>Nome</FormLabel>
                  <Input
                    width={400}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSavingChanges}
              loadingText="Salvando alterações"
              background={"primary"}
              marginRight={2}
              color="white"
              _hover={{
                background: "primaryHover",
              }}
              onClick={handleCreatePublication}
            >
              Publicar
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
