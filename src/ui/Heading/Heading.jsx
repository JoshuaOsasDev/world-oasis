function Heading({ as = 1, children }) {
  const Tag = `h${as}`;
  return (
    <>
      <Tag>{children}</Tag>
    </>
  );
}

export default Heading;
