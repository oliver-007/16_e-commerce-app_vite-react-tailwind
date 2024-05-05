import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getProductsSlice = createApi({
  reducerPath: "getProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit) => {
        return {
          url: "products",
          params: { limit },
        };
      },
    }),
    searchProduct: builder.query({
      query: (searchInput) => {
        return {
          url: `products/search?q=${searchInput}`,
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductQuery } = getProductsSlice;
