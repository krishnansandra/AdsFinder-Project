import React from "react";
import { useParams } from "react-router-dom";

const Showimage = () => {
  // Use the useParams hook to get the route parameters
  const { id } = useParams();

  return (
    <div>
      <img src={item.Image} alt="Ad" />

    </div>
  );
};

export default Showimage;
