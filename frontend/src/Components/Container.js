import React, { useState } from "react";
import CorousalCard from "./CorousalCard";
import TrailerVideo from "./TrailerVideo";
const Container = () => {
  let initialDataArr = data.slice(0, 5);
  const [displayArray, setDisplayArray] = useState(initialDataArr);
  const [ei, setEi] = useState(5);
  const [si, setSi] = useState(data.length - 1);
  const handleLeft = () => {
    const newDataArr = displayArray.slice(1);
    newDataArr.push(data[ei]);

    ei === data.length - 1 ? setEi(0) : setEi(ei + 1);
    setDisplayArray(newDataArr);
  };

  const handleRight = () => {
    const newDataArr = displayArray.slice(0, 4);
    newDataArr.unshift(data[si]);
    si === 0 ? setSi(data.length - 1) : setSi(si - 1);
    setDisplayArray(newDataArr);
  };
  return (
    <div className="">
      <TrailerVideo />
      <button onClick={handleLeft}>{"<"}</button>
      <button onClick={handleRight}>{">"}</button>
      <div className="flex">
        {displayArray.map((element, index) => (
          <CorousalCard key={index} element={element} />
        ))}
      </div>
    </div>
  );
};

const data = [
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723020508/john_wick_e3oht3.jpg",
    name: "John Wick",
    type: "Action",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024450/A_quiet_place_m3psva.jpg",
    name: "A Quiet Place",
    type: "Horror",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024599/dp3_ibu4qs.jpg",
    name: "Deadpool 3",
    type: "Comedy",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024790/kalki_doweun.avif",
    name: "Kalki",
    type: "Hindi",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025142/dg1rywn-55b55e96-d9f6-4d8f-8b05-a9bb6df05f7b.jpg_lpih0y.jpg",
    name: "Spider Man",
    type: "Animated",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025220/the-peaky-blinders-shelby-family-yzbar888h96t7ekn_aomrs9.jpg",
    name: "Peaky Blinders",
    type: "Web Series",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025356/professor-money-heist-1yegj3ptnd8g5noc_fkfu23.jpg",
    name: "Money Heist",
    type: "Crime",
  },
];

export default Container;
