import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "@mui/material";
import router from "next/router";

import Header from "../../components/organisms/header";

const Login = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    !isLoading &&
    !isAuthenticated && (
      <>
        <Header />
        <Container maxWidth="sm">やることをきれいに管理しよう！</Container>
      </>
    )
  );
};

export default Login;
