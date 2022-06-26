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
  onDelete: () => void;
}

const OperationButtons: React.VFC<OperationButtonProps> = (props) => {
  return (
    <Stack direction="row">
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={props.onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const IndexPage = () => {
  const { tasks, setTasks } = useFetchTasks();

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography variant="h3" align="center" marginTop={3}>
        TODO LIST
      </Typography>
      {tasks && (
        <Container maxWidth="sm">
          <List sx={{ width: "100%" }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <OperationButtons
                    onDelete={() => {
                      handleDelete(task.id);
                    }}
                  />
                }
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
