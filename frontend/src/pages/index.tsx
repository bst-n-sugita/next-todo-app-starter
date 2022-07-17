import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const IndexPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TODO LIST
            </Typography>
            <Button
              color="inherit"
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
            >
              SIGN UP
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => loginWithRedirect()}
            >
              SIGN IN
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="sm">やることをきれいに管理しよう！</Container>
    </>
  );
};

export default IndexPage;
