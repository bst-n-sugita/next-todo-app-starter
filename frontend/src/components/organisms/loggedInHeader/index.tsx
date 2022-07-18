import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";

const LoggedInHeader = () => {
  const { logout } = useAuth0();

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO LIST
          </Typography>
          <IconButton onClick={() => logout()}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoggedInHeader;
