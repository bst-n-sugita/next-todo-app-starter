import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

const LoginButton = ({ onSignup, onLogin }) => {
  return (
    <>
      <Button color="inherit" onClick={onSignup}>
        SIGN UP
      </Button>
      <Button variant="contained" sx={{ ml: 1 }} onClick={onLogin}>
        SIGN IN
      </Button>
    </>
  );
};

const LogoutButton = ({ onLogout }) => {
  return (
    <IconButton onClick={onLogout}>
      <LogoutIcon />
    </IconButton>
  );
};

const Header = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO LIST
          </Typography>
          {!isLoading &&
            (isAuthenticated ? (
              <LogoutButton onLogout={() => logout()} />
            ) : (
              <LoginButton
                onSignup={() => loginWithRedirect({ screen_hint: "signup" })}
                onLogin={() => loginWithRedirect({ screen_hint: "login" })}
              />
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
