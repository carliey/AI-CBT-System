import { Box, Dialog, Typography } from "@mui/material";

interface ChangePasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

function ChangePasswordModal({ open, handleClose }: ChangePasswordModalProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className="page-body" sx={{ p: 2 }}>
        {/* header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            mb: 3,
            gap: 3,
          }}
        >
          <Typography variant="h5">Edit name </Typography>
        </Box>
        {/* end of header */}
        Change password
      </Box>
    </Dialog>
  );
}

export default ChangePasswordModal;
