import { useAuth0 } from "@auth0/auth0-react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isLoading &&
    !isAuthenticated && (
      <Box sx={{ mb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TODO LIST
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                loginWithRedirect({ screen_hint: "signup" });
              }}
            >
              SIGN UP
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => {
                loginWithRedirect({ screen_hint: "login" });
              }}
            >
              SIGN IN
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
  );
};

export default Header;
