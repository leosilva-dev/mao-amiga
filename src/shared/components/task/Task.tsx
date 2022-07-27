import React, { useState } from "react";
import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";

import { ITask } from "../../service/api/task/Task";
import { useTask } from "../../hooks/useTask";
import { EditTaskDialog } from "./EditTaskDialog";

export const Task: React.FC<ITask> = ({ done, id, order, title }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { handleDeleteTask, handleCheckTask } = useTask();

  return (
    <HStack padding={2}>
      <Box cursor={"grabbing"}>
        <DragHandleIcon />
      </Box>

      <Checkbox
        size={"lg"}
        isChecked={done}
        onChange={() => handleCheckTask(id)}
      />

      {done ? (
        <Text isTruncated width="80" fontSize="md" as="del">
          {title}
        </Text>
      ) : (
        <Text isTruncated width="80" fontSize="md" as="abbr">
          {title}
        </Text>
      )}
      <EditTaskDialog id={id} title={title} done={done} />

      {showConfirmDelete ? (
        <Tooltip
          hasArrow
          label="Confirm delete?"
          placement="top"
          bg="gray.300"
          color="black"
        >
          <IconButton
            fontSize="18px"
            colorScheme="red"
            aria-label={"delete task"}
            onClick={() => {
              handleDeleteTask(id);
            }}
            icon={<CheckIcon />}
            variant="ghost"
          />
        </Tooltip>
      ) : (
        <Tooltip
          hasArrow
          label="Delete task"
          placement="top"
          bg="gray.300"
          color="black"
        >
          <IconButton
            fontSize="18px"
            colorScheme="#26C485"
            aria-label={"delete task"}
            onClick={() => {
              setShowConfirmDelete(true);
              setTimeout(() => {
                setShowConfirmDelete(false);
              }, 5000);
            }}
            icon={<DeleteIcon />}
            variant="ghost"
          />
        </Tooltip>
      )}
    </HStack>
  );
};
