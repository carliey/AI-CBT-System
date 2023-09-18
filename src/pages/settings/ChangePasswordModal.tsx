import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  old_password: yup.string().required("Password is required"),
  new_password: yup.string().required("New Password Is Required"),
  confirm_new_password: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("new_password"), ""], "Passwords do not match"),
});

const ChangePasswordModal = ({ open, onClose }: Props) => {
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <DialogTitle>Update Password</DialogTitle>
      <DialogContent>
        <Box component="form">
          <Grid container rowGap={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                type="password"
                id="old_password"
                name="old_password"
                label="Enter your password"
                variant="outlined"
                value={formik.values.old_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.old_password &&
                  Boolean(formik.errors.old_password)
                }
                helperText={
                  formik.touched.old_password && formik.errors.old_password
                }
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                type="password"
                id="new_password"
                name="new_password"
                label="New Password"
                variant="outlined"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.new_password &&
                  Boolean(formik.errors.new_password)
                }
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                type="password"
                id="confirm_new_password"
                name="confirm_new_password"
                label="Confirm new password"
                variant="outlined"
                value={formik.values.confirm_new_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirm_new_password &&
                  Boolean(formik.errors.confirm_new_password)
                }
                helperText={
                  formik.touched.confirm_new_password &&
                  formik.errors.confirm_new_password
                }
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
