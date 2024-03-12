import { toast } from "react-toastify";
import ErrorToast from "@components/ErrorToast";

export const toastError = (props: Parameters<typeof ErrorToast>[number]) => {
  toast(<ErrorToast {...props} />);
};
