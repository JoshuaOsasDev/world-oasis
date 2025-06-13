import styles from "./BookingDetail.module.css";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row/Row";
import Heading from "../../ui/Heading/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBooking } from "./useBookings";
import { HiArrowDownOnSquare } from "react-icons/hi2";

// const HeadingGroup = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
// `;

function BookingDetail() {
  const { bookingid } = useParams();
  const navigate = useNavigate();

  const { booking = {}, isLoading } = useGetBooking(bookingid);
  console.log(booking, "booking");
  // const booking = {};

  const status = booking.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <div className={styles.headingGroup}>
          <Heading as="1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checking/${bookingid}`)}
          >
            check in
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
