import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading/Heading";
import Row from "../ui/Row/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
