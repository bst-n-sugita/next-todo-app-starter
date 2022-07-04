import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface taskFormValues {
  title: string;
  description: string;
}

interface TaskFormProps {
  onSubmit: SubmitHandler<taskFormValues>;
}

const TaskForm: React.VFC<TaskFormProps> = (props) => {
  const taskSchema = yup.object({
    title: yup
      .string()
      .max(20, "20文字以内にしてください")
      .required("入力必須です"),
    description: yup
      .string()
      .max(20, "20文字以内にしてください")
      .required("入力必須です"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<taskFormValues>({
    resolver: yupResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Container maxWidth="sm">
      <Stack direction="row" spacing={1}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="title"
              label="タイトル"
              variant="outlined"
              size="small"
              sx={{ width: "40%" }}
              required
              error={"title" in errors}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="description"
              label="内容"
              variant="outlined"
              size="small"
              sx={{ width: "60%" }}
              required
              error={"description" in errors}
              helperText={errors.description?.message}
            />
          )}
        />
        <Button
          variant="contained"
          sx={{ height: "40px" }}
          onClick={handleSubmit(props.onSubmit)}
        >
          作成
        </Button>
      </Stack>
    </Container>
  );
};

export default TaskForm;
