import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { Progress } from "@chakra-ui/react";
import React from "react";

export default function withAuth(Component: React.FC) {
  return function AuthProtected() {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <Progress size="xs" isIndeterminate />;
    }

    if (!isAuthenticated) {
      router.push("/entrar");
      return null;
    }

    return <Component />;
  };
}
