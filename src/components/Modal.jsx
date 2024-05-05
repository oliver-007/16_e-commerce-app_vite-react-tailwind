import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../RTK/slices/cartSlice";
import { useEffect, useRef } from "react";

const Modal = ({ text, setShowModal, currentProduct, showModal }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  // -------- HANDLE REMOVE PRODUCT FROM CART --------
  const handleRemoveProduct = () => {
    dispatch(removeFromCart(currentProduct?.id));
    setShowModal(false);
  };

  //   ------- CLOSING MODAL FUNC CLICKING ANYWHERE OUTSIDE MAIN DIV ---------
  useEffect(() => {
    const handleModalClose = (e) => {
      !modalRef.current.contains(e.target) && setShowModal(false);
    };

    window.addEventListener("mousedown", handleModalClose, { passive: true });

    return () => {
      window.removeEventListener("mousedown", handleModalClose);
    };
  }, []);

  return createPortal(
    <div
      className={`bg-black bg-opacity-70 fixed inset-0 flex justify-center items-center z-30 duration-500  ${
        showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }  `}
    >
      {/* ------ MODAL DIV ------ */}
      <div
        ref={modalRef}
        className="bg-white text-slate-60  p-5 mx-2 rounded-md space-y-10 text-center "
      >
        <p>
          {text} <br />
          <span className="font-semibold">"{currentProduct?.title}"</span>{" "}
          <br />
          from cart !
        </p>

        {/* ------ BUTTONS ------ */}
        <div className=" flex justify-around items-center ">
          <button
            onClick={() => setShowModal(false)}
            className="btn"
            type="button"
          >
            cancel
          </button>
          <button onClick={handleRemoveProduct} className="btn" type="button">
            accept
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
