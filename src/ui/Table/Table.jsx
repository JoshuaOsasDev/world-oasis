import { createContext, useContext } from "react";
import styles from "./Table.module.css";

const TableContext = createContext();
function Table({ children, colomn }) {
  return (
    <TableContext.Provider value={{ colomn }}>
      <div role="table" className={styles.styledTable}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { colomn } = useContext(TableContext);

  return (
    <div
      role="row"
      className={styles.styledHeader}
      style={{ gridTemplateColumns: colomn }}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { colomn } = useContext(TableContext);

  return (
    <div
      role="row"
      className={styles.styledRow}
      style={{ gridTemplateColumns: colomn }}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  // console.log(render);
  if (!data.length)
    return <p className={styles.empty}>No data at the moment</p>;
  return <section className={styles.styledBody}>{data.map(render)}</section>;
}

(Table.Header = Header), (Table.Row = Row), (Table.Body = Body);

export default Table;

// import styled from "styled-components";

// const StyledTable = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: 2.4rem;
//   align-items: center;
//   transition: none;
// `;

// const StyledHeader = styled(CommonRow)`
//   padding: 1.6rem 2.4rem;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;

// const StyledRow = styled(CommonRow)`
//   padding: 1.2rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;
