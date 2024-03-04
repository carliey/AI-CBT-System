import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLoginMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { login } from "./authSlice";
import { GoogleLogin } from "@react-oauth/google";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("required"),
});

function SignIn() {
  const [signin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await signin(values).unwrap();
        dispatch(login(res));
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
      <Typography variant="h6">Sign In</Typography>
      <Typography sx={{ py: 2 }}>
        New here?{" "}
        <Link to="/signup">
          <strong>Sign up</strong>
        </Link>
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
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
            <Button type="submit" variant="contained">
              {isLoading ? "Loading..." : "Signin"}
            </Button>
          </Grid>
        </Grid>
        {/* <div
          id="g_id_onload"
          data-client_id="991884877078-idrnc66t0f7vn0pcdoqj4b7tbtc6hl07.apps.googleusercontent.com"
          data-context="signup"
          data-ux_mode="popup"
          data-login_uri="http://localhost:5173"
          data-auto_select="true"
          data-itp_support="true"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signup_with"
          data-size="medium"
          data-locale="en-GB"
          data-logo_alignment="left"
        ></div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ; */}
      </Box>
    </Box>
  );
}

export default SignIn;
