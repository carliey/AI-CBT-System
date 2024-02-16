import { Box } from "@mui/material";
import Router from "./routes/Router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <Box bgcolor={"#F5F5F5"} minHeight={"100vh"}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider
          clientId={
            "991884877078-idrnc66t0f7vn0pcdoqj4b7tbtc6hl07.apps.googleusercontent.com"
          }
        >
          <ToastContainer />
          <Router />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
