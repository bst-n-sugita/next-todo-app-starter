import { useCallback, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { addTask } from "../modules/apiClient/tasks/addTask";
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
  const [newTask, setNewTask] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      const params = {
        name: "name",
        description: "description",
      };
      const { data } = await addTask(params);
      setTasks((prev) => [...prev, data.addTask]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography variant="h3" align="center" marginTop={3} gutterBottom>
        TODO LIST
      </Typography>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={1}>
          <TextField
            id="title"
            label="タイトル"
            variant="outlined"
            size="small"
            sx={{ width: "40%" }}
          />
          <TextField
            id="description"
            label="内容"
            variant="outlined"
            size="small"
            sx={{ width: "60%" }}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            作成
          </Button>
        </Stack>
      </Container>
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
