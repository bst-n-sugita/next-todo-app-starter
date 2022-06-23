import { useState, useCallback, useEffect } from "react";

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

import { TasksResponse, getTasks } from "../modules/apiClient";

const OperationButtons = () => {
  return (
    <Stack direction="row">
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const IndexPage = () => {
  const [tasks, setTasks] = useState<TasksResponse | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Typography variant="h3" align="center" marginTop={3}>
        TODO LIST
      </Typography>
      {tasks && (
        <Container maxWidth="sm">
          <List sx={{ width: "100%" }}>
            {tasks.tasks.map((task) => (
              <ListItem key={task.id} secondaryAction={<OperationButtons />}>
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
