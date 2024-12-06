import React, { useState } from "react";

const ImageCarousel = ({ images, otherImageStyle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full mx-auto">
      {images.length > 1 && (
        <button
          className="flex items-center justify-center w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-lg bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
          onClick={prevPost}
        >
          &#10094;
        </button>
      )}

      <div className="relative w-full h-full">
        <div className="w-full h-full flex justify-center items-center">
          <a
            className="w-full h-full flex justify-center items-center hover:opacity-80 duration-200"
            href={images[currentIndex].mediaURL || images[currentIndex]}
            target="_blank"
          >
            <img
              className={`max-w-full max-h-full object-contain ${otherImageStyle}`}
              src={images[currentIndex].mediaURL || images[currentIndex]}
              alt={`Post ${currentIndex}`}
            />
          </a>
        </div>
      </div>

      {images.length > 1 && (
        <button
          className="flex items-center justify-center w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-lg bg-black bg-opacity-50  rounded-full hover:bg-opacity-75 focus:outline-none z-10"
          onClick={nextPost}
        >
          &#10095;
        </button>
      )}

      <div className="absolute top-3 right-3 bg-grey_bg text-white py-1 px-3 rounded-full text-sm flex justify-center gap-1 ">
        <p>{currentIndex + 1}</p>
        <p>/</p>
        <p>{images.length}</p>
      </div>
    </div>
  );
};

export default ImageCarousel;
