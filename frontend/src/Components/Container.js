import React, { useEffect, useState } from "react";
import CorousalCard from "./CorousalCard";
import TrailerVideo from "./TrailerVideo";
const Container = () => {
  let initialDataArr = data.slice(0, 5);
  const [displayArray, setDisplayArray] = useState(initialDataArr);
  const [ei, setEi] = useState(5);
  const [si, setSi] = useState(data.length - 1);
  const [trailerUrl, setTrailerUrl] = useState(initialDataArr[2].videoUrl);

  const handleLeft = () => {
    const newDataArr = displayArray.slice(1);
    newDataArr.push(data[ei]);
    setEi(ei === data.length - 1 ? 0 : ei + 1);
    setDisplayArray(newDataArr);
  };

  const handleRight = () => {
    const newDataArr = displayArray.slice(0, 4);
    newDataArr.unshift(data[si]);
    setSi(si === 0 ? data.length - 1 : si - 1);
    setDisplayArray(newDataArr);
  };

  useEffect(() => {
    setTrailerUrl(displayArray[2].videoUrl);
  }, [displayArray]);

  return (
    <div className="absolute bg-black">
      <div className="relative z-10 ">
        <TrailerVideo key={trailerUrl} trailerUrl={trailerUrl} />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 -mb-16">
        <div className="flex">
          {displayArray.map((element, index) => (
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
  );
};

const data = [
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723020508/john_wick_e3oht3.jpg",
    name: "John Wick",
    type: "Action",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723021037/Y2meta.app-John_Wick__Chapter_4_2023_Movie_Official_Trailer_Keanu_Reeves_Donnie_Yen_Bill_Skarsg%C3%A5rd_spzhh4.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024450/A_quiet_place_m3psva.jpg",
    name: "A Quiet Place",
    type: "Horror",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099859/Y2meta.app-A_Quiet_Place__Day_One___Final_Trailer_2024_Movie_-_Lupita_Nyong_o_Joseph_Quinn_euhrdm.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024599/dp3_ibu4qs.jpg",
    name: "Deadpool 3",
    type: "Comedy",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099937/Y2meta.app-Deadpool_Wolverine___Nice___In_Theaters_July_26_chjv5l.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723024790/kalki_doweun.avif",
    name: "Kalki",
    type: "Hindi",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723099976/Y2meta.app-Kalki_2898_AD_-_Blockbuster_Promo___Telugu___Prabhas_Amitabh_Kamal_Haasan_Deepika_Nag_Ashwin_ubyydh.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025142/dg1rywn-55b55e96-d9f6-4d8f-8b05-a9bb6df05f7b.jpg_lpih0y.jpg",
    name: "Spider Man",
    type: "Animated",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100011/Y2meta.app-SPIDER-MAN__ACROSS_THE_SPIDER-VERSE_-_Official_Trailer_HD_j6pmen.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025220/the-peaky-blinders-shelby-family-yzbar888h96t7ekn_aomrs9.jpg",
    name: "Peaky Blinders",
    type: "Web Series",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100207/Peaky_Blinders_Season_6_Official_Trailer___Netflix_India_vhhkxb.mp4",
  },
  {
    img: "https://res.cloudinary.com/dor9r1mfu/image/upload/v1723025356/professor-money-heist-1yegj3ptnd8g5noc_fkfu23.jpg",
    name: "Money Heist",
    type: "Crime",
    videoUrl:
      "https://res.cloudinary.com/dor9r1mfu/video/upload/v1723100244/Money_Heist___Series_Trailer___Netflix_j4mekj.mp4",
  },
];

export default Container;
