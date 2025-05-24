import Spinner from "../../ui/Spinner/Spinner";
import CabinRow from "./CabinRow";
import { useCallCabin } from "./useCabins";
import Table from "../../ui/Table/Table";
import Menus from "../../ui/Menu/Menus";
import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { isLoading, cabins = [] } = useCallCabin();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("discount") || "all";
  // console.log(filterValue);

  let filterCabin = cabins;

  if (filterValue === "all") filterCabin = cabins;

  if (filterValue === "no-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);

  //SORT

  const sortValue = searchParams.get("sortby") || "name-asc";

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortCabin = filterCabin.slice().sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  console.log(sortCabin);
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table colomn=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filterCabin}
          data={sortCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
