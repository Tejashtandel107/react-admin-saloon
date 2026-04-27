import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import httpService from "../common/http.service";
import { toast } from "react-toastify";

const fetchServicesApi = async (params = {}) => {
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});

    const queryString = new URLSearchParams(cleanParams).toString();
    const url = queryString ? `/services?${queryString}` : "/services";

    const response = await httpService.get(url);
    const apiData = response.data;

    if (apiData?.services?.data && Array.isArray(apiData.services.data)) {
        return {
            data: apiData.services.data,
            pagination: apiData.services.pagination || null,
        };
    }

    if (apiData?.services && Array.isArray(apiData.services)) {
        return { data: apiData.services, pagination: null };
    }

    if (apiData?.data && Array.isArray(apiData.data)) {
        return { data: apiData.data, pagination: apiData.pagination || null };
    }

    if (Array.isArray(apiData)) {
        return { data: apiData, pagination: null };
    }

    return { data: [], pagination: null };
};

const fetchServiceByIdApi = async (id) => {
    const response = await httpService.get(`/services/${id}`);
    return response.data?.service || response.data;
};

const createServiceApi = async (data) => {
    const res = await httpService.post("/services", {}, data);
    return res.data;
};

const updateServiceApi = async ({ id, ...data }) => {
    const response = await httpService.put(`/services/${id}`, {}, data);
    return response.data?.service;
};

const deleteServiceApi = async (id) => {
    const response = await httpService.delete(`/services/${id}`);
    return response.data;
};

// ─── HOOKS ─────────────────────────────────────────────────────

export const useServices = (filters) => {
    return useQuery({
        queryKey: ["services", filters],
        queryFn: () => fetchServicesApi(filters),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export const useService = (id) => {
    return useQuery({
        queryKey: ["service", id],
        queryFn: () => fetchServiceByIdApi(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createServiceApi,
        onSuccess: () => {
            toast.success("Service created successfully");
            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (error) => {
            toast.error(error.message || "Service Create failed ❌");
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateServiceApi,
        onSuccess: (updatedData, variables) => {
            toast.success("Service updated successfully!");

            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.setQueryData(["service", variables.id], updatedData);
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update service");
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteServiceApi,
        onSuccess: () => {
            toast.success("Service deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete service");
        },
    });
};