import { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";

const ImgSlider = ({ allProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  // console.log(allProducts, "all prod");
  // console.log(allCategories, " unique all cat");

  // -=---------- FILTER UNIQUE CATEGORY FORM ALL PRODUCTG CATEGORY ------------
  useEffect(() => {
    const categoryArray = allProducts.map((singleProduct) => {
      const category = singleProduct.category;
      return category;
    });

    // The Set constructor creates a Set from the iterable provided (the original array in this case). Spreading this Set using the ... operator into a new array ([]) creates an array containing only the unique elements.
    const uniqueCategoryArray = [...new Set(categoryArray)]; // ******** IMPORTANT **********

    setAllCategories(uniqueCategoryArray);
  }, [allProducts]);

  //   ------ HANDLE PREVIOUS FUNC -------
  const handlePrevious = () => {
    currentIndex === 0
      ? setCurrentIndex(allCategories?.length - 1)
      : setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  //   ------ HANDLE NEXT FUNC -------
  const handleNext = () => {
    currentIndex === allCategories?.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="ring-1 ring-slate-400 ring-offset-2 w-full bg-purple-200 h-[150px] relative sm:h-[400px] ">
      <div className="flex h-full overflow-hidden  ">
        {/* {allProducts?.map((singleProduct) => (
          <img
            key={singleProduct.id}
            className={`object-fill size-full duration-500 shrink-0 grow-0  `}
            style={{ translate: `${-100 * currentIndex}%` }} // *********** MAIN LOGIC TO REMEMBER *********** IMPORTANT
            src={singleProduct.thumbnail}
            alt={singleProduct?.title}
          />
        ))} */}

        {/* --------- CATEGORY SLIDER --------- */}
        {allCategories?.map((singleCategory, index) => (
          <div
            key={index}
            className=" size-full duration-500 shrink-0 grow-0  "
            style={{ translate: `${-100 * currentIndex}%` }}
          >
            <div
              className={`flex justify-center items-center h-full uppercase tracking-widest sm:text-3xl text-slate-600 ${
                index % 2 !== 0 ? "bg-sky-300" : "bg-orange-300"
              } `}
            >
              {singleCategory}{" "}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevious}
        className="absolute bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-20 top-0 text-white hover:bg-opacity-60 duration-200 w-[30px] sm:w-[60px]  sm:text-3xl "
        type="button"
      >
        {" "}
        <MdKeyboardDoubleArrowLeft />{" "}
      </button>
      <button
        onClick={handleNext}
        className="absolute bottom-0 right-0 bg-black text-white top-0 bg-opacity-20 hover:bg-opacity-60 duration-200 w-[30px] flex items-center justify-center sm:w-[60px] sm:text-3xl "
        type="button"
      >
        {" "}
        <MdKeyboardDoubleArrowRight />{" "}
      </button>

      {/* --------- CIRCLE BUTTON DIV  --------- */}
      <div className="flex gap-x-1 sm:gap-x-3 absolute bottom-2 w-full justify-center ">
        {allCategories?.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={` size-2 sm:size-4 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-zinc-600" : "bg-slate-100"
            } `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImgSlider;
