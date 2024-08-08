import React from "react";

const TrailerVideo = ({ trailerUrl }) => {
  return (
    <div className="relative">
      <video controls className="h-50">
        <source src={trailerUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default TrailerVideo;
