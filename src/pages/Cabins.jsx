import Heading from "../ui/Heading/Heading";
import Row from "../ui/Row/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOperation from "../features/cabins/CabinTableOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="1">All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <Row>
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
