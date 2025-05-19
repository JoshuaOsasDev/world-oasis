import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useSettings = function () {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, settings };
};
