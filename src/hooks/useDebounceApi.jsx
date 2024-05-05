import { useEffect, useState } from "react";
import { useSearchProductQuery } from "../RTK/slices/getProductsApiSlice";

const useDebounceApi = (inputValue) => {
  const [debounceInput, setDebounceInput] = useState(inputValue);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebounceInput(inputValue);
    }, 700);

    return () => {
      clearTimeout(debounceTime);
    };
  }, [inputValue]);

  return debounceInput;
};

export default useDebounceApi;
