import Button from "../../ui/Button/Button";
import Modal from "../../ui/Modal/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

// function AddCabins() {
//   const [isOpenCabin, setIsOpenCabin] = useState(false);
//   console.log(isOpenCabin, "isOpen");
//   return (
//     <div>
//       <Button onClick={() => setIsOpenCabin((show) => !show)}>
//         {isOpenCabin === true ? "Hide From" : "Add From"}
//       </Button>

//       {isOpenCabin && (
//         <Modal onClose={() => setIsOpenCabin(false)}>
//           <CreateCabinForm onClose={() => setIsOpenCabin(false)} />{" "}
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabins() {
  return (
    <Modal>
      <Modal.Open opens="form-open">
        <div>
          <Button>Add form cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="form-open">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabins;
