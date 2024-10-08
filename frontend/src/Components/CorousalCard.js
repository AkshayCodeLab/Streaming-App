import React from "react";

const CorousalCard = ({ element, index }) => {
  const { img, name, type } = element;

  return (
    <div
      className={`relative w-1/5 h-50 shadow-xl ${index === 0 ? "" : "ml-2"}`}
    >
      <img src={img} alt={name} className="w-full h-full object-cover" />
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-white text-2xl transition duration-100 hover:text-xl ${
          index === 2 ? "" : "bg-black bg-opacity-60"
        } hover:bg-opacity-0`}
      >
        <h2 className="font-bold">{name}</h2>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default CorousalCard;
