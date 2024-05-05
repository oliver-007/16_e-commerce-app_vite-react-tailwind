import { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({ allProducts, setProductsForCurrentPage }) => {
  const [productPerPage, setProductPerPage] = useState(14);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const pageCount = Math.ceil(allProducts?.length / productPerPage);

  //   console.log(currentPageNum, "curr page num");
  //   console.log(allProducts, "all products");
  const pageArray = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  //   console.log(pageArray, "page array");

  useEffect(() => {
    const lastProductIndex = productPerPage * currentPageNum;
    const firstProductIndex = lastProductIndex - productPerPage;

    const currentPageProducts = allProducts.slice(
      firstProductIndex,
      lastProductIndex
    );
    setProductsForCurrentPage(currentPageProducts);

    // console.log(firstProductIndex, "1st indeex");
    // console.log(lastProductIndex, "last indeex");
    // console.log(currentPageProducts, "products on current page");
  }, [currentPageNum]);

  return (
    <div className="flex flex-wrap gap-3">
      {" "}
      <button
        onClick={() => setCurrentPageNum((prevNum) => prevNum - 1)}
        className={`btn ${currentPageNum === 1 ? "hidden" : "block"} `}
        type="button"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      {pageArray.length > 0 &&
        pageArray.map((singlePageNum, index) => (
          <button
            onClick={() => setCurrentPageNum(singlePageNum)}
            key={index}
            className={`btn ${
              currentPageNum === singlePageNum
                ? "bg-slate-400 dark:bg-white text-white dark:text-zinc-900 dark:ring-zinc-900  ring-offset-2"
                : "text-slate-600"
            } `}
            type="button"
          >
            {" "}
            {singlePageNum}{" "}
          </button>
        ))}{" "}
      <button
        onClick={() => setCurrentPageNum((prevNum) => prevNum + 1)}
        className={`btn ${
          currentPageNum === pageArray.length ? "hidden" : "block"
        } `}
        type="button"
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
