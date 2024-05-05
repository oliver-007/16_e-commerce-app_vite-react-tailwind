import errorPng from "../assets/error.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <img src={errorPng} alt="error png" />
      <Link to="/">
        <button className="btn" type="button">
          {" "}
          go home{" "}
        </button>
      </Link>
    </div>
  );
};

export default Error;
