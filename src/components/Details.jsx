import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../RTK/slices/cartSlice";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import ScrollToTop from "./ScrollToTop";

const Details = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  // console.log(selectedProduct, "selected product ");

  const dispatch = useDispatch();
  const location = useLocation();

  // console.log(location, "use location from details component");

  useEffect(() => {
    setSelectedProduct(location.state);
  }, [location.state]);

  // ------- HANDLE ADD TO CART FUNC  ------
  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  return (
    <div className="px-2 py-5 space-y-5 dark:bg-zinc-900 dark:text-slate-200 duration-500 ">
      {/* -------- IMAGES + INFO DIV -------- */}
      <div className=" bg-slate-200 p-2 rounded-md grid grid-cols-1 sm:grid sm:grid-cols-3 gap-y-5 sm:gap-x-5 dark:bg-zinc-600 dark:text-slate-200 duration-500 ">
        {/* ------- IMAGES ------- */}
        <div className="bg-orange-200 dark:bg-zinc-600 duration-500 rounded-md space-y-3 flex flex-col ">
          <p className="font-semibold text-lg text-center capitalize px-2 ">
            {" "}
            {selectedProduct?.title}{" "}
          </p>
          {selectedProduct?.images?.map((singleImg, index) => (
            <img
              key={index}
              className=" "
              src={singleImg}
              alt={selectedProduct?.title}
            />
          ))}
        </div>

        {/* -------- INFO ------- */}
        <div className=" bg-white sm:col-span-2 rounded-md capitalize p-2 space-y-3 sm:p-5 dark:bg-zinc-900 dark:text-slate-200 duration-500 ">
          <p>
            {" "}
            name :{" "}
            <span className="font-semibold  ">
              {" "}
              {selectedProduct?.title}{" "}
            </span>{" "}
          </p>
          <p> brand : {selectedProduct?.brand} </p>
          <p> category : {selectedProduct?.category}</p>
          <p className="font-semibold"> price : $ {selectedProduct?.price} </p>
          <Rating ratingValue={selectedProduct?.rating} />
          <p> stock : {selectedProduct?.stock} </p>
          <p className=" tracking-wide">
            {" "}
            Description : <br /> {selectedProduct?.description}{" "}
          </p>
        </div>
      </div>

      {/* ------- ADD TO CART + BACK BUTTONS ------ */}
      <div className=" flex justify-around ">
        <button className="btn" type="button">
          <Link to="/">go home</Link>
        </button>

        <button onClick={handleAddToCart} className="btn " type="button">
          add to cart
        </button>
      </div>

      {/* --------- SCROLL TO TOP -------- */}
      <ScrollToTop />
    </div>
  );
};

export default Details;
