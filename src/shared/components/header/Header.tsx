import React from "react";
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Icon,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiDonateHeart } from "react-icons/bi";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { ToggleMode } from "../toggleMode/ToggleMode";

export const Header = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();
  const router = useRouter();

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
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon as={BiDonateHeart} fontSize={22} />
              <Text marginLeft={2}>Mão amiga</Text>
            </Box>
          </Link>
        </HStack>
        <Flex alignItems={"center"}>
          {isAuthenticated && (
            <Button
              bg={"transparent"}
              color={"blue.400"}
              variant={"unstyled"}
              onClick={() => router.push("/profile")}
            >
              {user?.displayName}
            </Button>
          )}
          {!isAuthenticated && (
            <HStack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                variant="solid"
                onClick={() => router.push("/entrar")}
              >
                Entrar como ONG
              </Button>
              <Button
                bg={"transparent"}
                color={"blue.400"}
                variant={"link"}
                onClick={() => router.push("/cadastrar")}
              >
                Cadastre sua ONG
              </Button>
            </HStack>
          )}
          <ToggleMode />
        </Flex>
      </Flex>
    </Box>
  );
};
