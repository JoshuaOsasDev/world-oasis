import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdated } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
      toast.success("Settings updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isUpdated };
}
