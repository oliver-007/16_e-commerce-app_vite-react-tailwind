import { useState } from "react";
// import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ImgSlider from "./ImgSlider";
import { useGetProductsQuery } from "../RTK/slices/getProductsApiSlice";
import ScrollToTop from "./ScrollToTop";

const Products = () => {
  // ---------- FETCHING DATA USING RTK QUERY -----------
  const { data, isLoading, isError } = useGetProductsQuery(100);
  // console.log(data, "product api rtk");

  const [productsForCurrentPage, setProductsForCurrentPage] = useState([]);

  // -------- FETCHING DATA USING CUSTOM HOOKS ------- ***** OPTIONAL
  // const { allProducts, isLoading } = useFetch(
  //   "https://dummyjson.com/products",
  //   {
  //     params: { limit: 100 },
  //   }
  // );

  return (
    <div className="dark:bg-zinc-900 dark:text-slate-200 duration-500 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen uppercase text-xl sm:text-3xl  tracking-widest ">
          {" "}
          loading ....
        </div>
      ) : (
        <div className="p-3 sm:p-10 space-y-5 ">
          {/*--------- IMG SLIDER --------- */}
          <ImgSlider allProducts={data?.products} />
          <div className="flex flex-col gap-y-5 sm:grid sm:grid-cols-3 sm:gap-[50px] ">
            {productsForCurrentPage?.length > 0 &&
              productsForCurrentPage.map((singleProduct) => (
                <ProductCard
                  key={singleProduct.id}
                  singleProduct={singleProduct}
                />
              ))}
          </div>

          {/* --------- SCROLL TO TOP BUTTON -------- */}
          <ScrollToTop />

          <div className=" my-10 pt-5 flex justify-center items-center ">
            {/* -------- PAGINATION ------- */}
            <Pagination
              allProducts={data?.products}
              setProductsForCurrentPage={setProductsForCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
