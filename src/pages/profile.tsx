import React, { useEffect } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useSignOut } from "@nhost/react";
import withAuth from "../shared/components/with-auth/WithAuth";

const Profile: React.FC = () => {
  const { signOut } = useSignOut();

  useEffect(() => {
    document.title = "PomoTask | Profile";
  }, []);

  return (
    <VStack>
      <Text fontSize="2xl">User profile</Text>
      <Button onClick={signOut}>Logout</Button>
    </VStack>
  );
};

export default withAuth(Profile);
