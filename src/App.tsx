import { Box } from "@mui/material";
import Router from "./routes/Router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

function App() {
  return (
    <Box bgcolor={"#F5F5F5"} minHeight={"100vh"}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Box>
  );
}

export default App;
