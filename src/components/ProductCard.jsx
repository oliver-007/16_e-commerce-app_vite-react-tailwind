import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ singleProduct }) => {
  // console.log(singleProduct, "single product");

  const navigate = useNavigate();

  const handleSelect = () => {
    navigate("/details", { state: singleProduct });
  };

  return (
    <div
      onClick={handleSelect}
      className="ring-1 ring-slate-300 ring-offset-2 shadow-lg shadow-zinc-500 dark:shadow-slate-400 dark:text-zinc-900 dark:ring-zinc-900 rounded-md grid grid-cols-3 sm:max-h-[600px] gap-2 p-3  sm:flex sm:flex-col cursor-pointer "
    >
      <div className=" flex items-center justify-center sm:items-start sm:h-1/2 ">
        <img
          className="rounded-md size-full  "
          src={singleProduct.thumbnail}
          alt={singleProduct.title}
        />
      </div>
      <div className="col-span-2 bg-slate-100 flex items-center justify-center flex-col gap-y-1 rounded-md sm:h-1/2  px-5 sm:items-start sm:gap-y-4 ">
        <h3 className="font-semibold text-sm sm:text-xl capitalize ">
          {singleProduct.title}
        </h3>
        <Rating ratingValue={singleProduct.rating} />
        <p className="text-sm font-semibold ">
          {" "}
          price : $ {singleProduct.price}{" "}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
