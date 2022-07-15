import { Modal, Box } from "@mui/material";
import { SubmitHandler } from "react-hook-form";

import { Task } from "../../../modules/apiClient/tasks/common";
import { updateTask } from "../../../modules/apiClient/tasks/updateTask";
import TaskForm, { taskFormValues } from "../../molecules/taskForm";

interface EditModalProps {
  task: Task;
  open: boolean;
  handleClose: () => void;
}

const EditModal: React.VFC<EditModalProps> = ({ task, open, handleClose }) => {
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

  const onSubmit: SubmitHandler<taskFormValues> = async ({
    title,
    description,
  }) => {
    try {
      const params = {
        taskId: task.id,
        name: title,
        description: description,
      };
      await updateTask(params);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <TaskForm task={task} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default EditModal;
