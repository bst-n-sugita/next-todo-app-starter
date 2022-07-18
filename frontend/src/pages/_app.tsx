import { ReactElement, ReactNode } from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { NextPage } from "next";

import { theme } from "../theme";

import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_HOST}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default MyApp;
