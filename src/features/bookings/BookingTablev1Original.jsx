// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getBookings } from "../../services/apiBookings";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { PAGE_SIZE } from "../../utils/constance";
// import { useEffect } from "react";

// export function useGetBookings() {
//   const queryClient = useQueryClient();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   console.log("hello world");

//   const filterValue = searchParams.get("status") || "all";
//   const filter =
//     filterValue === "all"
//       ? null
//       : { field: "status", value: filterValue, method: "eq" };

//   const pageFromParams = Number(searchParams.get("page")) || 1;

//   // Get page count first
//   const { data: countData } = useQuery({
//     queryKey: ["bookings", filter, "count-check"],
//     queryFn: () => getBookings({ filter, page: 1 }),
//     staleTime: 10 * 1000,
//   });

//   const totalCount = countData?.count ?? 0;
//   const pageCount = Math.ceil(totalCount / PAGE_SIZE);

//   // Redirect to page=1 if current page is invalid
//   useEffect(() => {
//     if (pageFromParams > pageCount && pageCount > 0) {
//       searchParams.set("page", "1");
//       setSearchParams(searchParams, { replace: true });
//     }
//   }, [pageFromParams, pageCount, searchParams, setSearchParams]);

//   const validPage =
//     pageFromParams > pageCount && pageCount > 0 ? 1 : pageFromParams;

//   // Main data fetch
//   const { data, isLoading } = useQuery({
//     queryKey: ["bookings", filter, validPage],
//     queryFn: () => getBookings({ filter, page: validPage }),
//     enabled: pageCount > 0,
//   });

//   // Prefetch other filters
//   const allFilterValues = [
//     "all",
//     "unconfirmed",
//     "checked-in",
//     "checked-out",
//     "cancelled",
//   ];

//   const filtersToPrefetch = allFilterValues.filter(
//     (val) => val !== filterValue
//   );

//   filtersToPrefetch.forEach((value) => {
//     const prefetchFilter =
//       value === "all" ? null : { field: "status", value, method: "eq" };

//     queryClient.prefetchQuery({
//       queryKey: ["bookings", prefetchFilter, 1],
//       queryFn: () => getBookings({ filter: prefetchFilter, page: 1 }),
//     });
//   });

//   // Prefetch next page
//   if (validPage < pageCount) {
//     queryClient.prefetchQuery({
//       queryKey: ["bookings", filter, validPage + 1],
//       queryFn: () => getBookings({ filter, page: validPage + 1 }),
//     });
//   }

//   return { data, isLoading };
// }
