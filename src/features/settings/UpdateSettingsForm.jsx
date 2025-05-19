// import { Form } from "react-hook-form";
import styles from "./UpdateSettingForm.module.css";

import Form from "../../ui/Form/Form";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import { useUpdateSettings } from "./useUpdateSettings";
import Spinner from "../../ui/Spinner/Spinner";
function UpdateSettingsForm() {
  const { register } = useForm();
  const { isLoading, settings = {} } = useSettings();
  const { mutate } = useUpdateSettings();
  const {
    minBookingLenght,
    breakfastPrice,
    maxBookingLength,
    maxGuestPerRoom,
  } = settings;

  const handleUpdate = function (e, field) {
    const { value } = e.target;
    if (!value) return;
    mutate({ [field]: value });
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <div className={styles.formRow}>
        <label htmlFor="minBookingLenght">Minimum nights/bookings</label>
        <input
          type="number"
          id="minBookingLenght"
          defaultValue={minBookingLenght}
          onBlur={(e) => handleUpdate(e, "minBookingLenght")}
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="maxBookingLength">Maximum nights/bookings</label>
        <input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="maxGuestPerRoom">Maximum guests/bookings</label>
        <input
          type="number"
          id="maxGuestPerRoom"
          defaultValue={maxGuestPerRoom}
          onBlur={(e) => handleUpdate(e, "maxGuestPerRoom")}
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="breakfastPrice">Breakfast price</label>
        <input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            onBlur: (e) => handleUpdate(e, "breakfastPrice"),
          })}
          // onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;

// <Form>
//   <FormRow label="Minimum nights/booking">
//     <Input type="number" id="min-nights" />
//   </FormRow>
//   <FormRow label="Maximum nights/booking">
//     <Input type="number" id="max-nights" />
//   </FormRow>
//   <FormRow label="Maximum guests/booking">
//     <Input type="number" id="max-guests" />
//   </FormRow>
//   <FormRow label="Breakfast price">
//     <Input type="number" id="breakfast-price" />
//   </FormRow>
// </Form>
