// src/hooks/useFaq.js

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import httpService from "../common/http.service";
import { toast } from "react-toastify";

// Get FAQs sorted by sortOrder
const fetchFaqsApi = async () => {
  const response = await httpService.get("/faqs");
  return response.data?.data || [];
};

// Create
const createFaqApi = async (data) => {
  const response = await httpService.post("/faqs", {}, data);
  return response.data;
};

// Update
const updateFaqApi = async ({ id, data }) => {
  const response = await httpService.put(`/faqs/${id}`, {}, data);
  return response.data;
};

// Delete
const deleteFaqApi = async (id) => {
  const response = await httpService.delete(`/faqs/${id}`);
  return response.data;
};

export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqsApi,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFaqApi,
    onSuccess: () => {
      toast.success("FAQ created successfully");
      queryClient.invalidateQueries(["faqs"]);
      queryClient.invalidateQueries(["dashboardStats"]);
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFaqApi,
    onSuccess: () => {
      toast.success("FAQ updated successfully");
      queryClient.invalidateQueries(["faqs"]);
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaqApi,
    onSuccess: () => {
      toast.success("FAQ deleted successfully");
      queryClient.invalidateQueries(["faqs"]);
      queryClient.invalidateQueries(["dashboardStats"]);
    },
  });
};