import BookingRow from "./BookingsRow/BookingRow";
import Table from "../../ui/Table/Table";
import Menus from "../../ui/Menu/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner/Spinner";
import { useGetBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination/Pagination";
function BookingTable() {
  const { data: bookings = [], isLoading } = useGetBookings();

  const [searchParams] = useSearchParams();
  const bookingValue = searchParams.get("status") || "all";
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  // console.log(sortValue);
  // console.log(bookingValue);

  //filter
  let bookingFilter = bookings;

  if (bookingValue === "unconfirmed") {
    bookingFilter = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );
  }

  if (bookingValue === "checked-in") {
    bookingFilter = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  }

  if (bookingValue === "checked-out") {
    bookingFilter = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  }

  //sort

  const [field, direction] = sortValue.split("-");
  console.log(field);

  const modifier = direction === "asc" ? -1 : 1;
  const bookingSort = bookingFilter.sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });
  // console.log(bookingSort);

  if (!bookings.length) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table colomn="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={bookingFilter}
          data={bookingSort}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
