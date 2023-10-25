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
import { toast } from "react-toastify";
import * as yup from "yup";
import { useUpdateProfileMutation } from "./profileApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentUser, setProfile } from "../auth/authSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Password is required"),
  about: yup.string().required("About is required"),
});

const UpdateProfileModal = ({ open, onClose }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      about: user?.about || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await updateProfile(values).unwrap();
        dispatch(setProfile({ user: res.data }));
        toast.success("profile updated successfully");
        onClose();
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    },
  });

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container rowGap={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                // helperText={formik.touched.name && formik.errors.name}
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
                // helperText={formik?.touched?.about && formik?.errors?.about}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                {isLoading ? "loading..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
