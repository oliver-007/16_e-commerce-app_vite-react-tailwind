import { CiCircleRemove } from "react-icons/ci";

const CartProductCard = ({
  singleCartProduct,
  setShowModal,
  setCurrentProduct,
}) => {
  const handleRemove = () => {
    setShowModal(true);
    setCurrentProduct(singleCartProduct);
  };

  return (
    <div className=" flex items-center gap-x-3 ring-1 ring-slate-400 ring-offset-2 rounded-md ">
      {/* ----- IMG DIV ----- */}
      <div className="flex justify-center items-center ">
        <img
          className="w-[50px] h-[50px]   rounded-md "
          src={singleCartProduct?.thumbnail}
          alt={singleCartProduct?.title}
        />
      </div>

      {/* ------- INFO + BTN DIV ------ */}
      <div className=" flex justify-between w-full px-2 ">
        {/* ----- INFO ----- */}
        <div className="text-sm   ">
          <p className=""> {singleCartProduct?.title} </p>
          <p>
            {" "}
            price : ${" "}
            <span className=" font-semibold ">
              {" "}
              {singleCartProduct?.price}{" "}
            </span>{" "}
          </p>
        </div>

        {/* ------- BTN ----- */}

        <button
          onClick={handleRemove}
          type="button"
          className="bg-rose-200 rounded-md dark:bg-rose-400 dark:text-zinc-900 "
        >
          <CiCircleRemove />
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
