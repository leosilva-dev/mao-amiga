import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useTask } from "../../hooks/useTask";
import { FiXCircle, FiCoffee } from "react-icons/fi";
import { RepeatClockIcon } from "@chakra-ui/icons";

export const Pomodoro: React.FC = () => {
  const { colorMode } = useColorMode();
  const {
    isCounting,
    currentTask,
    secondsAmount,
    AbandonTask,
    startTask,
    defaultTime,
  } = useTask();

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const percentage = () => {
    return (100 * (defaultTime - secondsAmount)) / defaultTime;
  };

  return (
    <VStack>
      <Box>
        <CircularProgress
          capIsRound
          size="400px"
          color="primary"
          value={percentage()}
          thickness={isCounting ? "1px" : "0px"}
          trackColor={colorMode === "light" ? "gray.200" : "gray.700"}
        >
          <CircularProgressLabel>
            {isCounting ? (
              `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`
            ) : (
              <VStack alignItems={"center"}>
                <Icon boxSize="50" as={FiCoffee} />
                <Text fontSize="2xl" as="em">
                  All done, no more tasks...
                </Text>
              </VStack>
            )}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      {isCounting ? (
        <HStack>
          {isCounting ? (
            <Tooltip
              hasArrow
              label="Abandon task"
              placement="top"
              bg="gray.300"
              color="black"
            >
              <IconButton
                fontSize="18px"
                colorScheme="telegram"
                aria-label={"play or pause"}
                onClick={() => AbandonTask(currentTask.id)}
                icon={<Icon as={FiXCircle} />}
                variant="ghost"
              />
            </Tooltip>
          ) : (
            <Tooltip
              hasArrow
              label="Restart task"
              placement="top"
              bg="gray.300"
              color="black"
            >
              <IconButton
                fontSize="18px"
                colorScheme="telegram"
                aria-label={"restart"}
                onClick={() => startTask(currentTask.id)}
                icon={<RepeatClockIcon />}
                variant="ghost"
              />
            </Tooltip>
          )}

          <Text isTruncated fontSize="xl">
            {currentTask.title}
          </Text>
        </HStack>
      ) : null}
    </VStack>
  );
};
