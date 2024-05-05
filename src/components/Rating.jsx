import { IoMdStarOutline, IoMdStarHalf, IoMdStar } from "react-icons/io";

const Rating = ({ ratingValue }) => {
  const rating = Array.from({ length: 5 }, (_, index) => {
    const fullStar = ratingValue >= index + 1;
    const halfStar = ratingValue >= index + 0.5 && !fullStar;

    const icons = fullStar ? (
      <IoMdStar />
    ) : halfStar ? (
      <IoMdStarHalf />
    ) : (
      <IoMdStarOutline />
    );

    return <span key={index}> {icons} </span>;
  });

  return <div className="flex text-xs  "> {rating} </div>;
};

export default Rating;
