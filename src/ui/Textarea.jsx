const Textareas = {
  padding: " 0.8rem 1.2rem",
  border: "1px solid var(--color-grey-300)",
  borderRadius: "5px",
  backgroundColor: "var(--color-grey-0)",
  boxShadow: "var(--shadow-sm)",
  width: "100%",
  height: "8rem",
};

function Textarea({ children }) {
  return <textarea style={Textareas}>{children}</textarea>;
}

export default Textarea;
