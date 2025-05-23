// const TableOperations = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.6rem;
// `;

function TableOperations({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
      {children}
    </div>
  );
}

export default TableOperations;
