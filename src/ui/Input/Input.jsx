import styles from "./Input.module.css";
function Input({ placeholder, type, id, defaultValue }) {
  return (
    <input
      className={styles.input}
      id={id}
      placeholder={placeholder}
      type={type}
      defaultValue={defaultValue}
    />
  );
}

export default Input;
