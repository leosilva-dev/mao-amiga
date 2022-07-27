import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { myTheme } from "../shared/themes/Theme";
import { LayoutPageDefault } from "../shared/layout/LayoutPageDefault";
import { TaskProvider } from "../shared/contexts/TaskContext";
import { PomoProvider } from "../shared/contexts/PomoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <TaskProvider>
        <PomoProvider>
          <LayoutPageDefault>
            <Component {...pageProps} />
          </LayoutPageDefault>
        </PomoProvider>
      </TaskProvider>
    </ChakraProvider>
  );
}

export default MyApp;
