import React from "react";

export default function ResultImage({ ImageURL }) {
  return (
    <div className="image-container">
      <img src={ImageURL} alt=" " />
    </div>
  );
}
