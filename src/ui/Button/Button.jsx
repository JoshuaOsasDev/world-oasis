import styles from "./Button.module.css";
function Button({
  children,
  onClick,
  size = "small",
  variation = "primary",
  type = "",
  disabled,
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[size]} ${styles[variation]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
