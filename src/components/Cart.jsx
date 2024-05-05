import { useSelector } from "react-redux";
import CartProductCard from "./CartProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Cart = () => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useSelector((state) => state.cart);
  // console.log(cart, "cart component");

  useEffect(() => {
    const priceList = cart.map((singleCartProduct) => singleCartProduct.price);
    const total = priceList.reduce(
      (accumulator, currValue) => accumulator + currValue,
      0
    );

    setTotalPrice(total);
  }, [cart]);

  return (
    <div className=" mt-2 p-4 sm:px-[50px] space-y-10 sm:flex sm:justify-around sm:gap-x-[80px] dark:bg-zinc-900 dark:text-slate-200 duration-500 ">
      {/* ------- PRODUCT CARD ------- */}
      <div className="space-y-4 sm:flex-1 ">
        {cart.length > 0 ? (
          cart.map((singleCartProduct) => (
            <CartProductCard
              key={singleCartProduct?.id}
              singleCartProduct={singleCartProduct}
              setShowModal={setShowModal}
              setCurrentProduct={setCurrentProduct}
            />
          ))
        ) : (
          <div className="uppercase space-y-5 text-slate-600 dark:text-slate-200 duration-500 tracking-widest text-center ">
            <p>empty cart</p>
          </div>
        )}
      </div>

      {/* ------- SUMMARY ------ */}
      <div className="space-y-2 ">
        <p className="uppercase font-semibold text-lg tracking-wider">
          {" "}
          summary{" "}
        </p>

        {/* ------ PRICE + COUNT DIV ----- */}
        <div className="capitalize space-y-4  ">
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-zinc-600 py-1 px-2 rounded-md ">
            <p className="">product count : </p>
            <p className=" col-span-2  flex justify-end items-center font-semibold">
              {cart.length}
            </p>
          </div>
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-zinc-600 px-2 rounded-md py-1 ">
            <p className="">total price :</p>
            <p className=" col-span-2  flex justify-end items-center font-semibold">
              $ {totalPrice}
            </p>
          </div>

          {/* ------- BACK BUTTON ------- */}
          <div>
            <button className="btn mt-5 " type="button">
              {" "}
              <Link to="/"> go home </Link>{" "}
            </button>
          </div>
        </div>
      </div>

      {/* -------- MODAL ------- */}
      {showModal && (
        <Modal
          text="you are trying to remove "
          setShowModal={setShowModal}
          currentProduct={currentProduct}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Cart;
