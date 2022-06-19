import { useState, useCallback, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";

import { TasksResponse, getTasks } from "../modules/apiClient";

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
            {tasks.tasks.map((task, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FactCheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={task.name}
                  secondary={task.description}
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
