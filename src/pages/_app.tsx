import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { myTheme } from "../shared/themes/Theme";
import { LayoutPageDefault } from "../shared/layout/LayoutPageDefault";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ myTheme });
  return (
    <ChakraProvider resetCSS theme={theme}>
      <LayoutPageDefault>
        <Component {...pageProps} />
      </LayoutPageDefault>
    </ChakraProvider>
  );
}

export default MyApp;
