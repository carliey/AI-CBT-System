import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    transparent?: string;
  }
  interface SimplePaletteColorOptions {
    transparent?: string;
  }

  interface TypographyVariants {
    inputLabel: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    inputLabel?: React.CSSProperties;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#299AF4",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    inputLabel: {
      color: "#333333",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "24px",
      display: "block",
      textTransform: "capitalize",
    },
  },
});
