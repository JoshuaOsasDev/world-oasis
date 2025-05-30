import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import styles from "./Pagination.module.css";
function Pagination() {
  return (
    <div className={styles.styledPagination}>
      <p>
        show <span>1</span> <span>to</span> <span>10</span> <span>of</span>{" "}
        <span>22</span> result
      </p>
      <div className={styles.buttons}>
        <button className={styles.paginationButton}>
          <HiChevronLeft /> Previous
        </button>

        <button className={styles.paginationButton}>
          Next <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
