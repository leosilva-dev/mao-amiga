import React from "react";
import {
  useColorMode,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface IDeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton: React.FC<IDeleteButtonProps> = ({ onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <Box marginBottom={5} cursor="pointer">
        <DeleteIcon onClick={onOpen} />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir publicação
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja excluir esta publicação?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
