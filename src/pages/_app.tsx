import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { myTheme } from "../shared/themes/Theme";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ myTheme });
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
