import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Container,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import { deleteTask } from "../modules/apiClient/tasks/deleteTask";
import { useFetchTasks } from "../modules/hooks/useFetchTasks";

interface OperationButtonProps {
  taskId: number;
}

const OperationButtons: React.VFC<OperationButtonProps> = (props) => {
  const handleDelete = async () => {
    try {
      await deleteTask(props.taskId);
      // fetchTasks();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const IndexPage = () => {
  const { tasks } = useFetchTasks();

  return (
    <>
      <Typography variant="h3" align="center" marginTop={3}>
        TODO LIST
      </Typography>
      {tasks && (
        <Container maxWidth="sm">
          <List sx={{ width: "100%" }}>
            {tasks.tasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={<OperationButtons taskId={task.id} />}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FactCheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={task.description}
                  secondary={`作成日時：${new Date(
                    task.created_at
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </>
  );
};

export default IndexPage;
