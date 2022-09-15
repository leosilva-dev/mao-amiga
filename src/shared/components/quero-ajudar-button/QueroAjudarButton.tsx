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
import { contatoService, IContato } from "../../service/api/contatos/Contatos";

interface IQueroAjudarButtonProps {
  ongId: number;
}

export const QueroAjudarButton: React.FC<IQueroAjudarButtonProps> = ({
  ongId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [contato, setContato] = useState<IContato>();

  const atOpen = async () => {
    const response = await contatoService.getByOngId(ongId);
    setContato(response);
    onOpen();
  };

  return (
    <>
      <Button
        size={"sm"}
        color="white"
        bg={"primary"}
        _hover={{
          bg: "primaryHover",
        }}
        onClick={atOpen}
      >
        Quero ajudar
      </Button>
      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contatos da ONG:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <Box>
                <FormControl id="title">
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    disabled
                    width={400}
                    value={contato?.phone_number}
                    type="text"
                  />
                </FormControl>

                <FormControl id="description">
                  <FormLabel>E-mail</FormLabel>
                  <Input disabled width={400} value={contato?.email} />
                </FormControl>

                <FormControl id="description">
                  <FormLabel>Endereço</FormLabel>
                  <Textarea disabled width={400} value={contato?.address} />
                </FormControl>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
