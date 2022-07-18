import { ReactElement, useState } from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { SubmitHandler } from "react-hook-form";

import TaskForm, { taskFormValues } from "../components/molecules/taskForm";
import EditModal from "../components/organisms/editModal";
import Layout from "../components/templates/layout";
import { addTask } from "../modules/apiClient/tasks/addTask";
import { Task } from "../modules/apiClient/tasks/common";
import { deleteTask } from "../modules/apiClient/tasks/deleteTask";
import { useFetchTasks } from "../modules/hooks/useFetchTasks";
import { NextPageWithLayout } from "./_app";

interface OperationButtonProps {
  task: Task;
  fetchTasks: () => void;
  onDelete: () => void;
}

const OperationButtons: React.VFC<OperationButtonProps> = ({
  task,
  fetchTasks,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    fetchTasks();
  };

  return (
    <Stack direction="row">
      <IconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <EditModal task={task} open={open} handleClose={handleClose} />
      <IconButton edge="end" aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const IndexPage: NextPageWithLayout = withAuthenticationRequired(() => {
  const { tasks, setTasks, fetchTasks } = useFetchTasks();

  const onSubmit: SubmitHandler<taskFormValues> = async ({
    title,
    description,
  }) => {
    try {
      const params = {
        name: title,
        description: description,
      };
      const { data } = await addTask(params);
      setTasks((prev) => [...prev, data.addTask]);
    } catch (e) {
      console.log(e);
    }
  };

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
      <TaskForm onSubmit={onSubmit} />
      {tasks && (
        <Container maxWidth="sm">
          <List sx={{ width: "100%" }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <OperationButtons
                    task={task}
                    fetchTasks={() => {
                      fetchTasks();
                    }}
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
});

IndexPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default IndexPage;
