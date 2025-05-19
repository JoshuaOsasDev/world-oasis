import styles from "./Row.module.css";
function Row({ children, type = "vertical" }) {
  return <div className={`${styles.row} ${styles[type]}`}>{children}</div>;
}

// Row.defaultProps = { type: "vertical" };

export default Row;
