import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import styles from "./Pagination.module.css";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constance";
import { useEffect } from "react";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE) || 1;

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };
  console.log(pageCount, "pagecount", currentPage);
  useEffect(() => {
    if (currentPage === pageCount && count === null) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [currentPage, pageCount, count, searchParams, setSearchParams]);
  if (pageCount <= 1) return;

  console.log(currentPage, pageCount, count, "pagescount");

  return (
    <div className={styles.styledPagination}>
      <p>
        show <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> <span>to</span>{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        <span>of</span> <span>{count}</span> result
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.paginationButton}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <span>
            {" "}
            <HiChevronLeft />{" "}
          </span>{" "}
          <span> Previous</span>
        </button>

        <button
          className={styles.paginationButton}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span> Next</span>{" "}
          <span>
            {" "}
            <HiChevronRight />{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
