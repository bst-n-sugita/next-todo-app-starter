import { ReactElement, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "@mui/material";
import router from "next/router";

import Header from "../../components/organisms/header";
import { NextPageWithLayout } from "../_app";

const Login: NextPageWithLayout = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    !isLoading &&
    !isAuthenticated && (
      <Container maxWidth="sm">やることをきれいに管理しよう！</Container>
    )
  );
};

Login.getLayout = (page: ReactElement) => {
  return (
    <>
      {/* テスト */}
      <Header />
      {page}
    </>
  );
};

export default Login;
