import { Modal, Box, Typography } from "@mui/material";

import { Task } from "../../../modules/apiClient/tasks/common";

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
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {props.task.description}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries, but also
          the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Typography>
      </Box>
    </Modal>
  );
};

export default EditModal;
