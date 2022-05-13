import React from "react";
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiCheckCircle, FiSettings, FiUser } from "react-icons/fi";

export const Header = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Link href="/" passHref>
            <Box
              fontWeight={"bold"}
              fontSize={18}
              fontFamily={"Helvetica"}
              cursor={"pointer"}
            >
              <Icon as={FiCheckCircle} /> PomoTask
            </Box>
          </Link>
        </HStack>
        <Flex alignItems={"center"}>
          <Link href="/profile" passHref>
            <IconButton
              aria-label="Config"
              fontSize="18px"
              colorScheme="#26C485"
              icon={<Icon as={FiUser} />}
              variant="ghost"
            />
          </Link>
          <Link href="/config" passHref>
            <IconButton
              aria-label="Config"
              fontSize="18px"
              colorScheme="#26C485"
              icon={<Icon as={FiSettings} />}
              variant="ghost"
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
