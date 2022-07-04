import { Modal, Box } from "@mui/material";
import { SubmitHandler } from "react-hook-form";

import { Task } from "../../../modules/apiClient/tasks/common";
import { updateTask } from "../../../modules/apiClient/tasks/updateTask";
import TaskForm, { taskFormValues } from "../../molecules/taskForm";

interface EditModalProps {
  task: Task;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const EditModal: React.VFC<EditModalProps> = (props) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit: SubmitHandler<taskFormValues> = async (formValues) => {
    try {
      const params = {
        taskId: props.task.id,
        name: formValues.title,
        description: formValues.description,
      };
      await updateTask(params);
      props.handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <TaskForm task={props.task} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default EditModal;
