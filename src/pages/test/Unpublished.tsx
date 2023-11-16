import { Box, Button, Stack, Typography } from "@mui/material";
import { Quiz } from "../../types/test";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePublishQuizMutation } from "./testApiSlice";

interface Props {
  quizzes: Quiz[];
}

const Unpublished = ({ quizzes }: Props) => {
  const navigate = useNavigate();

  const [publish, { isLoading: isPublishing }] = usePublishQuizMutation();

  const handlePublish = async (e: any, id: number) => {
    e.stopPropagation();
    try {
      await publish(id).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("error publishing");
    }
    console.log("handle publish");
  };

  if (!quizzes.length || quizzes.length === 0) {
    return (
      <div>
        <h4>No result found</h4>
      </div>
    );
  }

  return (
    <div>
      {quizzes.map((test: Quiz, index) => (
        <Box key={index} sx={{ my: 3, p: 2, border: "2px solid #F5F5F5" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ cursor: "pointer" }}
            alignItems={"center"}
            onClick={() => {
              navigate("published", {
                state: test,
                preventScrollReset: true,
              });
            }}
          >
            <Typography variant="h5" flex={1} component="h2">
              {test.title} {index === 0}
            </Typography>
            <Typography variant="subtitle1" flex={1}>
              Participants: {test.participants?.length}
            </Typography>
            <Typography variant="subtitle1" sx={{ width: "220px" }}>
              Date: {test.date}
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => handlePublish(e, test.id)}
            >
              {isPublishing ? "loading..." : "Unpublish"}
            </Button>
          </Stack>
        </Box>
      ))}
    </div>
  );
};

export default Unpublished;
