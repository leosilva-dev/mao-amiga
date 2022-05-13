import React, { useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = "PomoTask | Profile";
  }, []);
  return (
    <VStack>
      <Text fontSize="2xl">User profile</Text>
    </VStack>
  );
};

export default Profile;
