import type { NextPage } from "next";
import { HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Pomodoro } from "../shared/components/pomodoro/Pomodoro";

import dynamic from "next/dynamic";
import withAuth from "../shared/components/with-auth/WithAuth";

const DynamicComponent = dynamic(
  () => import("../shared/components/task/TaskList"),
  { ssr: false }
);

const Home: NextPage = () => {
  useEffect(() => {
    document.title = "PomoTask";
  }, []);

  return (
    <HStack>
      <DynamicComponent />
    </HStack>
  );
};

export default withAuth(Home);
