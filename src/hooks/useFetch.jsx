import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, option) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, option);
        res?.data?.products && setAllProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedData();
  }, [url]);

  return { isLoading, allProducts };
};

export default useFetch;
