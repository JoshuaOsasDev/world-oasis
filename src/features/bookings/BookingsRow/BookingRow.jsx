import styles from "./BookingRow.module.css";
import { format, isToday } from "date-fns";

import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table/Table";

import { formatCurrency } from "../../../utils/helpers";
import { formatDistanceFromNow } from "../../../utils/helpers";
import { useSearchParams } from "react-router-dom";

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
    </Table.Row>
  );
}

export default BookingRow;
