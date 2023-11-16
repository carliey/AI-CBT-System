import { Box, Button, Stack, Typography } from "@mui/material";
import { Quiz, Test } from "../../types/test";
import { useNavigate } from "react-router-dom";
import { useUnpublishQuizMutation } from "./testApiSlice";
import { toast } from "react-toastify";

interface Props {
  quizzes: Quiz[];
}

const Published = ({ quizzes }: Props) => {
  const navigate = useNavigate();
  const [unpublish, { isLoading: isUnpublishing }] = useUnpublishQuizMutation();

  const handleUnpublish = async (e: any, id: number) => {
    e.stopPropagation();
    try {
      await unpublish(id).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("error unpublishing");
    }
    console.log("handle unpublish");
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
              onClick={(e) => handleUnpublish(e, test.id)}
            >
              {isUnpublishing ? "loading..." : "Unpublish"}
            </Button>
          </Stack>
        </Box>
      ))}
    </div>
  );
};

export default Published;
