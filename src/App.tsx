import Router from "./navigation/Router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
