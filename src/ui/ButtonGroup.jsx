function ButtonGroup({ children }) {
  return (
    <div style={{ display: "flex", gap: "1.2rem", justifyContent: "flex-end" }}>
      {children}
    </div>
  );
}

export default ButtonGroup;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1.2rem;
//   justify-content: flex-end;
// `;
