import styles from "./CabinRow.module.css";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { HiPencil, HiDocumentDuplicate, HiTrash } from "react-icons/hi";
import CreateCabinForm from "./CreateCabinForm";
import { useInView } from "react-intersection-observer";
import { useCreateCabin, useDeleteCabins } from "./useCabins";
import Modal from "../../ui/Modal/Modal";
import ConfirmDelete from "../../ui/ComfirmDelete/ConfirmDelete";
import Table from "../../ui/Table/Table";
import Menus from "../../ui/Menu/Menus";

function CabinRow({ cabin }) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });

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

  const handleDuplicate = () => {
    const duplicateCabin = {
      name: `${name} copy`,
      maxCapacity,
      regularPrice,
      discount,
      discription,
      image,
    };
    createCabin(duplicateCabin);
  };

  return (
    <Table.Row>
      <div ref={ref}>
        {inView && (
          <img
            src={image}
            alt={name}
            onLoad={() => setLoaded(true)}
            className={`${styles.tableRowimg} ${
              loaded ? styles.fadeIn : styles.blur
            }`}
          />
        )}
      </div>

      <div className={styles.cabin}>{name}</div>
      <div>Fit up to {maxCapacity} guests</div>
      <div className={styles.price}>{formatCurrency(regularPrice)}</div>
      <div className={styles.discount}>{formatCurrency(discount)}</div>

      <div className={styles.actions}>
        <Modal>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Menus.Button
              icon={<HiDocumentDuplicate />}
              onClick={handleDuplicate}
              disabled={isDisabled}
            >
              Duplicate
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDelete}
              onConfirm={() => cabinDelete(cabinId)}
            />
          </Modal.Window>
        </Modal>

        {/* Menu Toggle and List */}
      </div>
    </Table.Row>
  );
}

export default CabinRow;
