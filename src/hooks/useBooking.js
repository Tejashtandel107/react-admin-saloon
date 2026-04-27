import { useQuery } from "@tanstack/react-query";
import httpService from "../common/http.service";

const fetchBookingsApi = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `/bookings?${queryString}` : "/bookings";

  const response = await httpService.get(url);
  const apiData = response.data;

  // Correctly extract from API structure
  const bookings = apiData?.data?.bookings || [];
  const pagination = apiData?.data?.pagination || null;

  return { data: bookings, pagination };
};

export const useBookings = (filters) => {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => fetchBookingsApi(filters),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};