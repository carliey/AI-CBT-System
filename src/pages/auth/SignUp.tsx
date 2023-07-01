import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  // email: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Email is required"),
  // classroom: yup.string().required("Email is required"),
});

function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      about: "",
      password: "",
      password_confirm: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box sx={{ py: 8, px: 6 }}>
      <Typography variant="h6">Sign up</Typography>
      <Typography sx={{ py: 2 }}>
        Have an account? <Link to="/signin">Sign in</Link>
      </Typography>
      <Box component="form">
        <Grid container rowGap={2}>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Organization Name *"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Organization Name *"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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

export default SignUp;
