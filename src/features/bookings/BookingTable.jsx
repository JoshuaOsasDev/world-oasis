import BookingRow from "./BookingsRow/BookingRow";
import Table from "../../ui/Table/Table";
import Menus from "../../ui/Menu/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner/Spinner";
import { useGetBookings } from "./useBookings";
function BookingTable() {
  const { data: bookings = [], isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;
  console.log(bookings);
  if (!bookings.length) return <Empty resource="bookings" />;

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
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
