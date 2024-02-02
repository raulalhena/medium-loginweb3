import { ToastMessage } from "./toastMessage";

export interface SnackbarMessageProps {
  message: ToastMessage;
  open: boolean;
  handleClose: () => void;
}

