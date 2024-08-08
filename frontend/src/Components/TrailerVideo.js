import React from "react";

const TrailerVideo = ({ trailerUrl }) => {
  return (
    <div className="relative overflow-hidden h-1/5 w-full">
      <video controls className="w-full h-full object-cover object-top">
        <source src={trailerUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default TrailerVideo;
