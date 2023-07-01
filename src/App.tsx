import Router from "./navigation/Router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

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
