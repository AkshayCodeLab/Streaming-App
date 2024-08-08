import React, { useEffect, useState } from "react";
import CorousalCard from "./CorousalCard";
import TrailerVideo from "./TrailerVideo";
import { useSelector } from "react-redux";
const Container = () => {
  const data = useSelector((store) => store.content.homeContent);

  const [displayArray, setDisplayArray] = useState(data.slice(0, 5));

  useEffect(() => {
    setDisplayArray(data.slice(0, 5));
  }, [data]);

  const [ei, setEi] = useState(5);
  const [si, setSi] = useState(data.length === 0 ? 0 : data.length - 1);
  const [trailerUrl, setTrailerUrl] = useState(displayArray[2]?.videoUrl);

  const handleLeft = () => {
    const newDataArr = displayArray.slice(1);
    newDataArr.push(data[ei]);
    setEi(ei === data.length - 1 ? 0 : ei + 1);
    setDisplayArray(newDataArr);
  };

  const handleRight = () => {
    const newDataArr = [data[si], ...displayArray.slice(0, 4)];
    setSi(si === 0 ? data.length - 1 : si - 1);
    setDisplayArray(newDataArr);
  };

  useEffect(() => {
    setTrailerUrl(displayArray[2]?.videoUrl);
  }, [displayArray]);

  return data.length !== 0 ? (
    <div className="absolute bg-black">
      <div className="relative z-10 ">
        <TrailerVideo key={trailerUrl} trailerUrl={trailerUrl} />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 -mb-16">
        <div className="flex">
          {displayArray.length !== 0 &&
            displayArray.map((element, index) => (
              <CorousalCard key={index} element={element} index={index} />
            ))}
        </div>
        <div className="flex justify-between absolute inset-0 z-30">
          <button
            className="bg-black text-white flex justify-center items-center w-8 h-full opacity-50 hover:opacity-75"
            onClick={handleLeft}
          >
            {"<"}
          </button>
          <button
            className="bg-black text-white flex justify-center items-center w-8 h-full opacity-50 hover:opacity-75"
            onClick={handleRight}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Container;
