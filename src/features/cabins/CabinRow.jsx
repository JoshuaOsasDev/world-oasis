import styles from "./CabinRow.module.css";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { HiPencil, HiDocumentDuplicate, HiTrash } from "react-icons/hi";

import CreateCabinForm from "./CreateCabinForm";
import { useInView } from "react-intersection-observer";
import { useCreateCabin, useDeleteCabins } from "./useCabins";
import Modal from "../../ui/Modal/Modal";
import ConfirmDelete from "../../ui/ComfirmDelete/ConfirmDelete";

// import styled from "styled-components";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

function CabinRow({ cabin }) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px",
  });

  const { isDelete, cabinDelete } = useDeleteCabins();
  const { createCabin, isDisabled } = useCreateCabin();
  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    discription,
  } = cabin;

  const handleDuplicate = function () {
    const duplicateCabin = {
      name: `${name} copy`,
      maxCapacity,
      regularPrice,
      discount,
      discription,
      image,
    };

    createCabin(duplicateCabin);

    // const duplicateCopy = JSON.parse(JSON.stringify(createCabin));

    console.log(discount);
  };
  return (
    <>
      <div className={styles.tableRow} ref={ref}>
        {inView && (
          <img
            src={image}
            alt={name}
            onLoad={() => setLoaded(true)}
            className={`${loaded ? styles.fadeIn : styles.blur}`}
          />
        )}

        <div className={styles.cabin}>{name}</div>
        <div>fit up to {maxCapacity} guests</div>
        <div className={styles.price}>{formatCurrency(regularPrice)}</div>
        <div className={styles.discount}>{formatCurrency(discount)}</div>
        <div>
          <button onClick={() => handleDuplicate()} disabled={isDisabled}>
            <HiDocumentDuplicate />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <span>
                <button>
                  <HiPencil />
                </button>
              </span>
            </Modal.Open>

            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDelete}
                onConfirm={() => cabinDelete(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </>
  );
}

// () => cabinDelete(cabinId)
export default CabinRow;
