import { yupResolver } from "@hookform/resolvers/yup";
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
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

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

interface newTaskFormValues {
  title: string;
  description: string;
}

const IndexPage = () => {
  const { tasks, setTasks } = useFetchTasks();

  const newTaskSchema = yup.object({
    title: yup
      .string()
      .max(20, "20文字以内にしてください")
      .required("入力必須です"),
    description: yup
      .string()
      .max(20, "20文字以内にしてください")
      .required("入力必須です"),
  });

  const { control, handleSubmit, reset } = useForm<newTaskFormValues>({
    resolver: yupResolver(newTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async ({ title, description }: newTaskFormValues) => {
    try {
      const params = {
        name: title,
        description: description,
      };
      const { data } = await addTask(params);
      setTasks((prev) => [...prev, data.addTask]);
      reset();
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
      <Typography variant="h3" align="center" marginTop={3} gutterBottom>
        TODO LIST
      </Typography>
      <Container maxWidth="sm">
        <Stack direction="row" spacing={1}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                id="title"
                label="タイトル"
                variant="outlined"
                size="small"
                sx={{ width: "40%" }}
                required
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                id="description"
                label="内容"
                variant="outlined"
                size="small"
                sx={{ width: "60%" }}
                required
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{ height: "40px" }}
            onClick={handleSubmit(onSubmit)}
          >
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
