import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row/Row";
import Heading from "../../ui/Heading/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";

import { useParams } from "react-router-dom";
import { useGetBooking } from "../bookings/useBookings";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { updateBooking } from "../../services/apiBookings";
import { id } from "date-fns/locale";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [takesBreakfast, setTakesBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { bookingid } = useParams();

  const { booking = {}, isLoading } = useGetBooking(bookingid);
  const { settings, isLoading: isLoadingCheckin } = useSettings();
  //

  const { checkin, isCheckin } = useCheckin();
  useEffect(() => {
    return setConfirmPaid(booking?.isPaid ?? false);
  }, [setConfirmPaid, booking.isPaid]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    // checkin(booking.id);
    if (!confirmPaid) return;
    takesBreakfast
      ? checkin({
          bookingid,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        })
      : checkin({ bookingid });
  }
  if (isLoading || isLoadingCheckin) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={takesBreakfast}
            onChange={() => {
              setTakesBreakfast((add) => !add), setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {`${
            !takesBreakfast
              ? formatCurrency(totalPrice)
              : formatCurrency(optionalBreakfastPrice + totalPrice) +
                " " +
                `(${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`
          }`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckin} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
