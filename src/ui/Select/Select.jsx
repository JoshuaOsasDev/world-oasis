import { useSearchParams } from "react-router-dom";
import styles from "./Select.module.css";

function Select({ value, options, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    searchParams.set(value, e.target.value);
    setSearchParams(searchParams) || "";
  };
  return (
    <select
      {...props}
      value={options[0].value}
      onChange={handleChange}
      className={`${styles.select} ${
        props.type === "white" ? styles.white : ""
      }`}
    >
      {options[0].map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
export default Select;

// const StyledSelect = styled.select`
//   font-size: 1.4rem;
//   padding: 0.8rem 1.2rem;
//   border: 1px solid
//     ${(props) =>
//       props.type === "white"
//         ? "var(--color-grey-100)"
//         : "var(--color-grey-300)"};
//   border-radius: var(--border-radius-sm);
//   background-color: var(--color-grey-0);
//   font-weight: 500;
//   box-shadow: var(--shadow-sm);
// `;
