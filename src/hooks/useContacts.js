import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../common/http.service";
import { toast } from "react-toastify";

// Fetch single contact (first item)
const fetchContactApi = async () => {
  const response = await httpService.get("/contact");
  const apiData = response.data;
  return apiData?.data?.[0] || null;
};

// Create or update contact
const updateContactApi = async (data) => {
  // Make sure the payload is sent correctly
  const response = await httpService.post("/contact",{}, data);
  return response.data?.data || response.data;
};

// ─── HOOKS ─────────────────────────────────────────────────────

// Fetch contact hook
export const useContact = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: fetchContactApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Create/update contact hook
export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContactApi,
    onSuccess: () => {
      toast.success("Contact saved successfully!");
      queryClient.invalidateQueries(["contact"]);
    },
    onError: (err) => {
      console.log(err);
      const errors = err.response?.data?.error;
      if (Array.isArray(errors)) {
        errors.forEach((e) => toast.error(e));
      } else {
        toast.error(err.response?.data?.message || err.message || "Failed to save contact ❌");
      }
    },
  });
};