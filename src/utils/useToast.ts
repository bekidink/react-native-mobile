// useToast.ts
import { useToast } from "react-native-toast-notifications";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    toast.show(message, {
      type,
      placement: "top",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  return { showToast };
};

export default useCustomToast;
