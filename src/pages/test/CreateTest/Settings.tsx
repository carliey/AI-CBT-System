import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";

import { useMemo, useState } from "react";
import ParticipantsTable from "./ParticipantsTable";
import { Participant } from "../../../types/participants";
import UploadParticipantsModal from "./UploadParticipantsModal";

type Props = {
  rows?: [];
};

const Settings = (props: Props) => {
  const [checked, setChecked] = useState(["wifi"]);
  const [openUploadParticipants, setOpenUploadParticipants] = useState(false);
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const participants = useMemo<Participant[]>(() => {
    return [
      { id: 1, name: "Muhammed Ladan", email: "mdcarliey@gmail.com" },
      { id: 2, name: "Faiza yusuf", email: "faizayusuf330@gmail.com" },
    ];
  }, []);

  return (
    <div>
      <Card elevation={2} sx={{ my: 2 }}>
        <CardContent>
          <Grid container spacing={1} columnSpacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth variant="standard" label="Test Title" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" variant="standard" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                minRows={2}
                fullWidth
                label="Instructions"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                aria-valuemin={0}
                aria-valuemax={1000}
                label="Duration(minutes)"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Date and Time"
                variant="standard"
              />
            </Grid>
          </Grid>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemText primary="Show result at the end of test" />
              <Switch
                edge="end"
                onChange={handleToggle("wifi")}
                checked={checked.indexOf("wifi") !== -1}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <ParticipantsTable
        rows={participants}
        setOpenUploadParticipants={setOpenUploadParticipants}
      />
      <UploadParticipantsModal
        open={openUploadParticipants}
        onClose={() => setOpenUploadParticipants(false)}
      />
    </div>
  );
};

export default Settings;
