import React, { useRef, useState, KeyboardEvent } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useTask } from "../../hooks/useTask";
import { FiCornerDownLeft, FiPlus } from "react-icons/fi";

export const NewTaskDialog: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleCreateTask } = useTask();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputFocus = useRef<HTMLInputElement>(null);

  const handleNewTask = (title: string) => {
    handleCreateTask(title);
    handleOnClose();
  };

  const handleOnClose = () => {
    setNewTaskTitle("");
    onClose();
  };

  const handleTitleChange = (newTitle: string) => {
    setNewTaskTitle(newTitle);
  };

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      handleNewTask(newTaskTitle);
    }
  };

  return (
    <>
      <Box paddingY={5}>
        <Button
          leftIcon={<Icon as={FiPlus} />}
          color="primary"
          variant="solid"
          onClick={onOpen}
        >
          New task
        </Button>
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={inputFocus}
        onClose={handleOnClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Create a new task</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody onKeyDown={handleKeyboardEvent}>
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Icon color={"gray.400"} as={FiCornerDownLeft} />}
              />
              <Input
                ref={inputFocus}
                value={newTaskTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Type here..."
              />
            </InputGroup>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                handleOnClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              ml={3}
              onClick={() => handleNewTask(newTaskTitle)}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
