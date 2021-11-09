import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";

const Star = ({ item, index }) => {
  const [rate, setRate] = useState(item.rate || 0);

  return (
    <StarRatingComponent
      starCount={5}
      value={rate}
      starColor={"#ffe552"}
      emptyStarColor={"#a9acb4"}
      name="rate"
      onStarClick={(value) => setRate(value)}
      className={
        item.items?.length === index + 1
          ? "w-100 py-3 d-flex justify-content-center my-0 star-size"
          : "w-100 py-3 border-bottom d-flex justify-content-center my-0 star-size"
      }
    />
  );
};

export default Star;
