import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("required"),
});

function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box sx={{ py: 8, px: 6 }}>
      <Typography variant="h6">Sign In</Typography>
      <Typography sx={{ py: 2 }}>
        New here?{" "}
        <Link to="/signup">
          <strong>Sign up</strong>
        </Link>
      </Typography>
      <Box component="form">
        <Grid container rowGap={2}>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              type="password"
              id="password"
              name="password"
              label="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid>
            <Button variant="contained">Create Account</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignIn;
