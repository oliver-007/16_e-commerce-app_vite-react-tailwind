import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const RootLayout = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${currentTheme} dark:bg-zinc-600 `}>
      <Navbar
        handleToggleTheme={handleToggleTheme}
        currentTheme={currentTheme}
      />
      <Outlet />
      <div className=" mt-10 ">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
