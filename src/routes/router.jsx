import { createBrowserRouter } from "react-router-dom";
import Products from "../components/Products";
import Details from "../components/Details";
import Cart from "../components/Cart";
import Error from "../components/Error";
import RootLayout from "../layout/RootLayout";
import About from "../components/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "details",
        element: <Details />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
