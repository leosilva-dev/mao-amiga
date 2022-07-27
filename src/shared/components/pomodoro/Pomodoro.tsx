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
    return (100 * (defaultTime - secondsAmount)) / defaultTime;
  };

  return (
    <VStack>
      {isCounting && (
        <>
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
                {isCounting &&
                  `${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Button
            leftIcon={<Icon as={FiStopCircle} />}
            color="primary"
            variant="solid"
            onClick={stopPomo}
          >
            Stop Pomo
          </Button>
        </>
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
    </VStack>
  );
};
