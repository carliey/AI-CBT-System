import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function LandingLayout() {
  return (
    <Grid container sx={{ minHeight: "100vh", p: 1 }}>
      <Grid item xs={4}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 4,
            p: 4,
            color: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4">
            Efficient automated aptitude testing
          </Typography>
          <Typography>We help you create and administer tests</Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default LandingLayout;
