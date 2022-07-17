import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "../theme";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const redirectUri = `${process.env.NEXT_PUBLIC_HOST}/tasks`;

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={redirectUri}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default MyApp;
