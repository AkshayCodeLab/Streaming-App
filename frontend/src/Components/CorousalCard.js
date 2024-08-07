import React from "react";

const CorousalCard = ({ element }) => {
  const { img, name, type } = element;
  return (
    <div className="relative w-1/5 h-50 shadow-xl ml-2">
      <img src={img} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-2xl bg-black bg-opacity-50 hover:bg-opacity-0 transition duration-100 hover:text-xl">
        <h2 className="font-bold">{name}</h2>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default CorousalCard;
