const About = () => {
  const featuresArray = [
    "react-router v6.23",
    "redux-toolkit ",
    "RTK Query",
    "shopping cart",
    " dynamic pagination",
    "image-slider",
    "modal",
    "scroll to top button",
    "search functionality ",
    "search-autocomplete",
    "debounce-api call",
    "theme-toggler",
    "dynamic star-rating",
    "custom hooks",
    "react-icons",
    "API integration",
    "respnsive design",
  ];

  return (
    <div className="dark:text-slate-200 dark:bg-zinc-900 duration-500 m-2 ">
      <p className="text-center tracking-widest text-slate-700 dark:text-slate-200  uppercase mb-5 font-bold duration-500 shadow-lg shadow-slate-500 py-2  ">
        About
      </p>
      <p className="py-4 ml-3">
        PROJECT name : <br />{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200 duration-500 capitalize tracking-widest">
          {" "}
          E-commerce App with React{" "}
        </span>{" "}
      </p>
      <p className="text-slate-700 dark:text-slate-200 duration-500 font-semibold capitalize mb-3 ml-3  ">
        {" "}
        highlighted features :
      </p>

      {featuresArray.map((singleFeature, index) => {
        return (
          <div
            className=" text-slate-700 tracking-widest capitalize dark:text-slate-200 duration-500 px-5 ml-3 "
            key={index}
          >
            <ul className=" list-disc  ">
              <li>
                <p> {singleFeature} </p>
              </li>
            </ul>
          </div>
        );
      })}

      <div className="mt-10 ml-5 ">
        <p className=" text-slate-500 text-xs dark:text-slate-400 duration-500 ">
          DISCLAIMER : <br />
          <span className="">
            API used in this application are provided by{" "}
            <i className="lowercase text-sky-500">
              <a href="https://dummyjson.com/" target="_blank">
                dummyjson.com
              </a>
            </i>
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
