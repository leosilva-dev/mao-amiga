import { VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Pomodoro } from "../shared/components/pomodoro/Pomodoro";

import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("../shared/components/task/TaskList"),
  { ssr: false }
);

const Home: NextPage = () => {
  useEffect(() => {
    document.title = "PomoTask";
  }, []);

  return (
    <VStack>
      <Pomodoro />
      <DynamicComponent />
    </VStack>
  );
};

export default Home;
