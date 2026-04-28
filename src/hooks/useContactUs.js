import { useQuery } from "@tanstack/react-query";
import httpService from "../common/http.service";

// Fetch Contacts
const fetchContactsApi = async (page,limit) => {
  const response = await httpService.get(
    `/contact-us?page=${page}&limit=${limit}`
  );

  return response.data?.data || {};
};

export const useContacts = (page,limit) => {
  return useQuery({
    queryKey: ["contacts", page, limit],
    queryFn: () =>
      fetchContactsApi(page, limit),
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
  });
};