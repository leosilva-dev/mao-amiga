import React from "react";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { FiCoffee } from "react-icons/fi";

export const AllDoneMessage: React.FC = () => {
  return (
    <VStack alignItems={"center"} padding={5}>
      <Icon boxSize="50" as={FiCoffee} />
      <Text fontSize="2xl" as="em">
        All done, no more tasks...
      </Text>
    </VStack>
  );
};
