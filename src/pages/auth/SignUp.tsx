import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSignupMutation } from "./authApiSlice";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string().required("required"),
  about: yup.string().required("required"),
  password: yup.string().required(),
  password_confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), ""], "passwords do not match"),
});

function SignUp() {
  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      about: "",
      password: "",
      password_confirm: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        about: values.about,
      };
      try {
        const res = await register(data).unwrap();
        toast.success("Account Created, Signin to continue");
        navigate("/signin");
        console.log(res);
      } catch (error: any) {
        console.log(error);
        if (error && error?.message) {
          toast.error(error.message);
        } else {
          toast.error("something went wrong");
        }
      }
    },
  });

  return (
    <Box sx={{ py: 8, px: 6 }}>
      <Typography variant="h6">Sign up</Typography>
      <Typography sx={{ py: 2 }}>
        Have an account?{" "}
        <Link to="/signin">
          <strong>Sign in</strong>
        </Link>
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container rowGap={2}>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Organization Name "
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
              id="about"
              name="about"
              label="About"
              variant="outlined"
              value={formik.values.about}
              onChange={formik.handleChange}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Organization email "
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
              label="Enter password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              type="password"
              id="password_confirm"
              name="password_confirm"
              label="Confirm password"
              variant="outlined"
              value={formik.values.password_confirm}
              onChange={formik.handleChange}
              error={
                formik.touched.password_confirm &&
                Boolean(formik.errors.password_confirm)
              }
              helperText={
                formik.touched.password_confirm &&
                formik.errors.password_confirm
              }
            />
          </Grid>
          <Grid>
            <Button type="submit" variant="contained">
              {isLoading ? "loading" : "Create Account"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignUp;
