import toast from "react-hot-toast";
import {
  createEditCabin,
  deleteCabin,
  getCabin,
} from "../../services/apiCabins";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useDeleteCabins() {
  const queryClient = useQueryClient();

  const { isLoading: isDelete, mutate: cabinDelete } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("cabin deleted succesfully");
    },
  });
  return { isDelete, cabinDelete };
}

export function useCallCabin() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, cabins };
}

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDisabled, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created succesfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isEdit, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited succesfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDisabled, isEdit, editCabin, createCabin };
}
