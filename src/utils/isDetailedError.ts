import { AxiosError, isAxiosError } from "axios";
import { type DetailedError } from "@/apis/baseInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDetailedError = (
  error: unknown,
): error is AxiosError<DetailedError> => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    "detail" in error.response.data
  );
};

export default isDetailedError;
