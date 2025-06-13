import styles from "./BookingRow.module.css";
import { format, isToday } from "date-fns";

import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table/Table";

import { formatCurrency } from "../../../utils/helpers";
import { formatDistanceFromNow } from "../../../utils/helpers";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import Spinner from "../../../ui/Spinner/Spinner";
import Menus from "../../../ui/Menu/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { useCheckout } from "../../check-in-out/useCheckin";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const guestName = guests?.fullName ?? "Unknown Guest";
  const email = guests?.email ?? "No email";
  const cabinName = cabins?.name ?? "Unknown Cabin";

  const navigate = useNavigate();

  const { checkout } = useCheckout();
  return (
    <Table.Row>
      <div className={styles.cabin}>{cabinName}</div>

      <div className={styles.stacked}>
        <span>{guestName}</span>
        <span>{email}</span>
      </div>

      <div className={styles.stacked}>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <div className={styles.amount}>{formatCurrency(totalPrice)}</div>
      <Menus.Toggle id={bookingId} />
      <Menus.List id={bookingId}>
        <Menus.Button
          icon={<HiEye />}
          onClick={() => navigate(`/booking/${bookingId}`)}
        >
          See Details
        </Menus.Button>

        {status === "unconfirmed" && (
          <Menus.Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checking/${bookingId}`)}
          >
            check in
          </Menus.Button>
        )}

        {status === "checked-in" && (
          <Menus.Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkout(bookingId);
            }}
          >
            check out
          </Menus.Button>
        )}
      </Menus.List>
    </Table.Row>
  );
}

export default BookingRow;
