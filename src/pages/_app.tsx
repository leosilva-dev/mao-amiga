import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { NhostNextProvider, NhostClient } from "@nhost/nextjs";

import { LayoutPageDefault } from "../shared/layout/LayoutPageDefault";
import { UserProvider } from "../shared/contexts/";
import { myTheme } from "../shared/themes/Theme";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <UserProvider>
        <ChakraProvider resetCSS theme={myTheme}>
          <LayoutPageDefault>
            <Component {...pageProps} />
          </LayoutPageDefault>
        </ChakraProvider>
      </UserProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
