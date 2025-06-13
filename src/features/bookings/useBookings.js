import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking, getBookings } from "../../services/apiBookings";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constance";
import { useEffect } from "react";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // SORTBY
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Page
  const pageFromParams = Number(searchParams.get("page")) || 1;

  // Get page count first
  const { data: countData } = useQuery({
    queryKey: ["bookings", filter, "count-check"],
    queryFn: () => getBookings({ filter, page: 1 }),
    staleTime: 10 * 1000, // prevent redundant api/automatic refecting when called
  });

  const totalCount = countData?.count ?? 0;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  // Redirect to page=1 if current page is invalid
  useEffect(() => {
    if (pageFromParams > pageCount && pageCount > 0) {
      searchParams.set("page", "1");
      setSearchParams(searchParams, { replace: true });
    }
  }, [pageFromParams, pageCount, searchParams, setSearchParams]);

  const validPage =
    pageFromParams > pageCount && pageCount > 0 ? 1 : pageFromParams;

  // Main data fetch
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, validPage],
    queryFn: () => getBookings({ filter, sortBy, page: validPage }),
    enabled: pageCount > 0, // prevent query from running beforw data is called
  });

  // Prefetch other filters
  const allFilterValues = [
    "all",
    "unconfirmed",
    "checked-in",
    "checked-out",
    "cancelled",
  ];

  const allSortOptions = [
    { field: "startDate", direction: "asc" },
    { field: "startDate", direction: "desc" },
    { field: "totalPrice", direction: "asc" },
    { field: "totalPrice", direction: "desc" },
    { field: "created_at", direction: "asc" },
    { field: "created_at", direction: "desc" },
  ];

  // Prefecth filter
  const filtersToPrefetch = allFilterValues.filter(
    (val) => val !== filterValue
  );

  filtersToPrefetch.forEach((value) => {
    const prefetchFilter =
      value === "all" ? null : { field: "status", value, method: "eq" };

    queryClient.prefetchQuery({
      queryKey: ["bookings", prefetchFilter, sortBy, 1],
      queryFn: () => getBookings({ filter: prefetchFilter, sortBy, page: 1 }),
    });
  });

  //Prefect sortBy
  const sortsToPrefetch = allSortOptions.filter(
    (s) => !(s.field === sortBy.field && s.direction === sortBy.direction)
  );

  sortsToPrefetch.forEach((sortOption) => {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortOption, validPage],
      queryFn: () =>
        getBookings({ filter, sortBy: sortOption, page: validPage }),
    });
  });

  // Prefetch next page
  if (validPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, validPage + 1],
      queryFn: () => getBookings({ filter, sortBy, page: validPage + 1 }),
    });
  }

  return { data, isLoading };
}

export function useGetBooking(id) {
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { booking, isLoading, error };
}
