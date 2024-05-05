import { GiTireIronCross } from "react-icons/gi";
import { CgMenuMotion } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useSearchProductQuery } from "../RTK/slices/getProductsApiSlice";
import useDebounceApi from "../hooks/useDebounceApi";

const Navbar = ({ handleToggleTheme, currentTheme }) => {
  const [inputValue, setInputValue] = useState("");
  const debounceInput = useDebounceApi(inputValue);
  const [selectedOption, setSelectedOption] = useState({});
  // console.log(selectedOption, "selected option");

  const [showMenuItem, setShowMenuItem] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { isLocked, setIsLocked } = useBodyScrollLock();
  const cart = useSelector((state) => state.cart);
  const { data, status } = useSearchProductQuery(debounceInput);

  // console.log(data, "get searched product from query");

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // --------- SEARCH EFFECT  --------
  useEffect(() => {
    setInputValue("");
    setShowSearch(false);
  }, [selectedOption]);

  // -------- HANDLE SELECT SEARCH RESULT OPTION  --------
  const handleSelectSearchResult = (getSelectedProduct) => {
    // console.log(getSelectedProduct, "get selected product ");
    setSelectedOption(getSelectedProduct);
    navigate("/details", { state: getSelectedProduct });
  };
  // ------ CLOSE MENU CLICKING ANYWHERE OUTSIDE MENU DIV -----
  useEffect(() => {
    const handleMenuClose = (e) => {
      !menuRef?.current?.contains(e.target) && setShowMenuItem(false);
    };

    document.addEventListener("mousedown", handleMenuClose, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleMenuClose);
    };
  }, [menuRef]);

  // -------- CLOSE SEARCH CLICKING ANYWHERE OUTSIDE SEARCH DIV ---------
  useEffect(() => {
    const handleSearchClose = (e) => {
      !searchRef?.current?.contains(e.target) && setShowSearch(false);
    };

    document.addEventListener("mousedown", handleSearchClose, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleSearchClose);
    };
  }, [searchRef]);

  // ---------- BLOCK SCROLLING WHILE MENU / SEARCH OPEN ---------
  useEffect(() => {
    showMenuItem || showSearch ? setIsLocked(true) : setIsLocked(false);
  }, [showMenuItem, showSearch]);

  return (
    <nav className="sticky top-0 z-10 ">
      <div className=" dark:bg-zinc-900 dark:bg-opacity-90 dark:text-slate-200 duration-500 px-4 py-2 flex justify-between items-center bg-purple-200 sm:hidden bg-opacity-90  ">
        <div className="flex justify-center items-center font-extrabold text-xl uppercase">
          <NavLink to="/">logo</NavLink>
        </div>

        {/* --------- RESPONSIVE NAV ICONS   --------- */}
        <div className="flex gap-x-5 items-center ">
          {/* --------- RESPONSIVE THEME BTN ------- */}

          <div className="flex items-center justify-center">
            {currentTheme === "light" ? (
              <button onClick={handleToggleTheme} type="button">
                {" "}
                <BsMoonStarsFill />{" "}
              </button>
            ) : (
              <button onClick={handleToggleTheme} type="button">
                {" "}
                <BsSunFill />{" "}
              </button>
            )}
          </div>

          {/* ----------- RESPONSIVE CART ICON ----------- */}
          <div className="flex  pr-3 py-1 items-center justify-center relative cursor-pointer ">
            <NavLink to="cart">
              <BsCart4 size={20} />
              <div
                className={` size-1 rounded-full absolute right-0 top-0 bg-slate-800 text-[10px] font-bold text-yellow-200 p-2 flex items-center justify-center dark:text-zinc-900 dark:bg-yellow-300 ${
                  cart.length > 0 ? "block" : "hidden"
                } `}
              >
                {cart.length > 0 && cart.length}
              </div>
            </NavLink>
          </div>

          {/* ----------- RESPONSIVE SEARCH ICON  ----------- */}
          <IoSearch onClick={() => setShowSearch(true)} />
          {/* ------- RESPONSIVE MENU ICON ------- */}
          <CgMenuMotion
            className={showMenuItem ? "opacity-0" : "opacity-100"}
            onClick={() => setShowMenuItem(true)}
          />
        </div>
      </div>

      {/* --------- RESPONSIVE SEARCH DIV --------- */}
      <div
        className={`${
          showSearch ? "translate-y-0" : "-translate-y-full"
        } ease-in-out duration-500 fixed right-0 top-0 w-full  `}
      >
        <div className="bg-black bg-opacity-70 h-screen ">
          <div
            ref={searchRef}
            className="flex flex-col justify-center items-center py-6 gap-y-3 bg-cyan-300 dark:bg-zinc-700 dark:text-slate-200 "
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.trim())}
              type="text"
              placeholder="search ...."
              autoFocus
              className="ring-1 ring-slate-300 outline-none  px-3 py-1 w-[200px] duration-150 placeholder:text-slate-400 rounded-full text-slate-600 "
            />
            {/* -------- SEARCH RESULT OPTIONS DIV -------- */}
            {status === "fulfilled" && debounceInput && (
              <div className=" dark:text-zinc-900 ">
                {data?.products.map((singleProduct, index) => {
                  return (
                    <div
                      key={singleProduct?.id}
                      onClick={() => handleSelectSearchResult(singleProduct)}
                      className={`${
                        index % 2 !== 0 ? "bg-slate-300" : "bg-slate-200"
                      } py-1 px-5 cursor-pointer `}
                    >
                      {" "}
                      <p> {singleProduct?.title} </p>{" "}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------- RESPONSIVE MENU DIV ------- */}
      <div
        className={`ease-in-out duration-500 inset-0 fixed ${
          showMenuItem
            ? "translate-x-0 opacity-100 "
            : "translate-x-full opacity-0 "
        }   `}
      >
        <div className={`bg-black bg-opacity-50 h-screen flex justify-end `}>
          <div
            ref={menuRef}
            className="w-2/3 p-2 rounded-l-md bg-white bg-opacity-90  dark:bg-zinc-900 dark:text-slate-200  "
          >
            <div className=" p-1 mb-3">
              <GiTireIronCross
                className=" ring-1 ring-slate-400 text-slate-800 dark:text-slate-200 size-5 p-1 rounded-sm "
                onClick={() => setShowMenuItem(false)}
              />
            </div>
            <div className="pl-5">
              <div className="mt-10 uppercase  tracking-widest flex flex-col gap-y-5 ">
                <NavLink
                  onClick={() => setShowMenuItem(false)}
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold " : ""
                  }
                >
                  {" "}
                  home{" "}
                </NavLink>
                <NavLink
                  onClick={() => setShowMenuItem(false)}
                  to="about"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : ""
                  }
                >
                  {" "}
                  about{" "}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- LARGE SCREEN MENU NAV -------- */}
      <div className="hidden sm:block ">
        <div className="flex bg-green-200 justify-around py-2 dark:bg-zinc-900 dark:text-slate-200 duration-500 ">
          {/* --------- LOGO -------- */}
          <div className="flex justify-center items-center font-extrabold text-xl uppercase ">
            <NavLink to="/">logo</NavLink>
          </div>

          {/* -------- SEARCH INPUT FIELD -------- */}
          <div className="flex flex-col justify-center items-center gap-x-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.trim())}
              type="text"
              placeholder="search ...."
              className="ring-1 ring-slate-300 outline-none  px-3 py-1 w-[200px] focus:w-[225px] duration-150 placeholder:text-slate-400 rounded-full text-slate-600 "
            />

            {/* -------- SEARCH RESULT OPTIONS DIV -------- */}
            {status === "fulfilled" && debounceInput && (
              <div className=" dark:text-zinc-900 fixed top-[50px] ">
                {data?.products.map((singleProduct, index) => {
                  return (
                    <div
                      key={singleProduct?.id}
                      onClick={() => handleSelectSearchResult(singleProduct)}
                      className={`${
                        index % 2 !== 0 ? "bg-slate-300" : "bg-slate-200"
                      } py-1 px-5 cursor-pointer `}
                    >
                      {" "}
                      <p> {singleProduct?.title} </p>{" "}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* ------ MENU ITEMS  ----- */}
          <div className="flex justify-center items-center">
            <div className=" uppercase text-sm flex gap-6 ">
              <NavLink
                className={({ isActive }) =>
                  `pt-2 pb-1 ${isActive ? "border-b border-orange-400 " : ""} `
                }
                to="/"
              >
                home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `pt-2 pb-1  ${isActive ? "border-b border-orange-400 " : ""} `
                }
                to="about"
              >
                {" "}
                about{" "}
              </NavLink>
            </div>
          </div>

          {/* --------- CART ICON --------- */}
          <div className="flex  pr-4 items-center justify-center relative cursor-pointer ">
            <NavLink to="cart">
              <BsCart4 size={25} />
              <div
                className={` size-3 rounded-full absolute right-0 top-0 bg-slate-800 text-[10px] font-bold text-yellow-200 dark:text-zinc-900 dark:bg-yellow-300 p-2 flex items-center justify-center ${
                  cart.length > 0 ? "block" : "hidden"
                } `}
              >
                {cart.length > 0 && cart.length}
              </div>
            </NavLink>
          </div>

          {/* --------- LARGE SCREEN THEME BTN ------- */}

          <div className="flex justify-center items-center">
            {currentTheme === "light" ? (
              <button onClick={handleToggleTheme} type="button">
                {" "}
                <BsMoonStarsFill />{" "}
              </button>
            ) : (
              <button onClick={handleToggleTheme} type="button">
                {" "}
                <BsSunFill />{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
