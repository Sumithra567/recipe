import React from "react";

function Recipe({ name, image }) {
  const placeholder = "https://via.placeholder.com/300x200?text=No+Image";
  return (
    <div className="card">
      <img src={image || placeholder} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default Recipe;
