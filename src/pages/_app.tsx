import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { NhostNextProvider, NhostClient } from "@nhost/nextjs";

import { LayoutPageDefault } from "../shared/layout/LayoutPageDefault";
import { TaskProvider, PomoProvider, UserProvider } from "../shared/contexts/";
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
          <TaskProvider>
            <PomoProvider>
              <LayoutPageDefault>
                <Component {...pageProps} />
              </LayoutPageDefault>
            </PomoProvider>
          </TaskProvider>
        </ChakraProvider>
      </UserProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
