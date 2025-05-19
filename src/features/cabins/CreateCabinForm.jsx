// import styled from "styled-components";

import Input from "../../ui/Input/Input";
import Form from "../../ui/Form/Form";
// import Button from "../../ui/Button";
import FileInput from "../../ui/Input/FileInput";
import Textarea from "../../ui/Textarea";
import styles from "./CreateCabinForm.module.css";
import Button from "../../ui/Button/Button";
import { useForm } from "react-hook-form";
import FormError from "./FormError";
import { useCreateCabin } from "./useCabins";
function CreateCabinForm({ cabin = {}, onClose }) {
  const { id: editId, ...extraValue } = cabin;
  // console.log(editId, extraValue, "cabin extra");
  const selectedCabin = Boolean(editId);

  const {
    register,
    handleSubmit,

    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: selectedCabin ? { ...extraValue } : {},
  });
  const { isDisabled, isEdit, editCabin, createCabin } = useCreateCabin();
  // console.log(editCabin, editId);
  const isWorking = isDisabled || isEdit;
  const onSubmit = function (data) {
    // console.log(data.image[0].name);
    // mutate(data);
    if (selectedCabin) {
      editCabin(
        { newCabin: data, id: cabin.id },
        { onSuccess: () => onClose?.() }
      );
    } else {
      createCabin(data, { onSuccess: () => onClose?.() });
    }
  };

  const onError = function (errors) {
    console.log(errors);
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "default"}
    >
      <div className={styles.formRow}>
        <label htmlFor="name" className={styles.label}>
          Cabin name
        </label>
        <input
          type="text"
          placeholder="text"
          id="name"
          {...register("name", { required: "name is required" })}
        />
        {errors && <FormError>{errors?.name?.message}</FormError>}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="maxCapacity" className={styles.label}>
          Max capacity
        </label>
        <input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Max capacity is required ",
          })}
        />
        {errors && <FormError>{errors?.maxCapacity?.message}</FormError>}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="discount" className={styles.label}>
          Price
        </label>
        <input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "regular price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "regular price is less than one",
            },
          })}
        />
        {errors && <FormError>{errors?.regularPrice?.message}</FormError>}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="discount" className={styles.label}>
          Discount
        </label>
        <input
          type="number"
          id="discount"
          {...register("discount", {
            required: "dicount is required",
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount is greater than regular prices",
          })}
          defaultValue={0}
        />
        {errors && <FormError>{errors?.discount?.message}</FormError>}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="description">Description for website</label>
        <textarea
          id="discription"
          type="number"
          {...register("discription", {
            required: "description is required",
          })}
        ></textarea>
        {errors && <FormError>{errors?.discription?.message}</FormError>}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="image">Cabin photo</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...(selectedCabin
            ? register("image")
            : register("image", { required: "image is required" }))}
        />

        {errors && <FormError>{errors?.image?.message}</FormError>}
        {/* <FileInput id="image" accept="image/*" /> */}
      </div>

      <div className={styles.formRow}>
        <div></div>
        <div className={styles.formRowHasButton}>
          <Button variation="secondary" type="reset" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {selectedCabin ? "Edit cabin" : "Create cabin"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateCabinForm;

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// function CreateCabinForm() {
//   return (
//     <Form>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input type="text" id="name" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input type="number" id="discount" defaultValue={0} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea type="number" id="description" defaultValue="" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button>Edit cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
