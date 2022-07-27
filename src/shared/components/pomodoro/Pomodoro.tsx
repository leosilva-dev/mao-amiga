import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FiPlay, FiStopCircle } from "react-icons/fi";
import { usePomo } from "../../hooks/usePomo";

export const Pomodoro: React.FC = () => {
  const { colorMode } = useColorMode();
  const { isCounting, secondsAmount, defaultTime, startPomo, stopPomo } =
    usePomo();

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const percentage = () => {
    if (!isCounting) {
      return 0;
    }
    return (100 * (defaultTime - secondsAmount)) / defaultTime;
  };

  const getClockLabel = (): string => {
    if (!isCounting) {
      return "00:00";
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  return (
    <VStack>
      <Box>
        <CircularProgress
          capIsRound
          size="300px"
          color="primary"
          value={percentage()}
          thickness={"1px"}
          trackColor={colorMode === "light" ? "gray.200" : "gray.700"}
        >
          <CircularProgressLabel
            color={isCounting ? "whiteAlpha.900" : "gray.700"}
          >
            {getClockLabel()}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box paddingBottom={5}>
        {isCounting && (
          <Button
            leftIcon={<Icon as={FiStopCircle} />}
            color="primary"
            variant="solid"
            onClick={stopPomo}
          >
            Stop Pomo
          </Button>
        )}
        {!isCounting && (
          <Button
            leftIcon={<Icon as={FiPlay} />}
            color="primary"
            variant="solid"
            onClick={startPomo}
          >
            Start Pomo
          </Button>
        )}
      </Box>
    </VStack>
  );
};
