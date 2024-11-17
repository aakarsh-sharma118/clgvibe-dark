import { useState } from "react";

const Carousel = (props) => {
  const [activeBullet, setActiveBullet] = useState(1);

  // Handle bullet click
  const handleBulletClick = (index) => {
    setActiveBullet(index);
  };

  return (
    <div className="absolute w-full sm:w-[55%] md:w-[50%] top-0 left-0 sm:left-[45%] bg-opacity-80 rounded-2xl p-6 sm:p-8 transition-all duration-800 ease-in-out">
      {/* Images Wrapper */}
      <div className="grid gap-6">
        {/* Dynamically render images */}
        {props.carouselData.map((item, index) => (
          <img
            key={index}
            src={item.image}
            className={`image w-full transition-opacity duration-300 transform ${
              activeBullet === index + 1
                ? "opacity-100 transform-none translate-y-[-50px]"
                : "opacity-0"
            }`}
            alt={`carousel-${index}`}
          />
        ))}
      </div>

      {/* Text Slider */}
      <div className="text-slider flex flex-col items-center justify-center mt-6">
        <div className="text-wrap mb-6">
          <div
            className="text-group text-center transition-transform duration-500"
            style={{
              transform: `translateY(${-(activeBullet - 1) * 2.2}rem)`,
            }}
          >
            {/* Dynamically render text */}
            {props.carouselData.map((item, index) => (
              <h2 key={index} className="text-lg font-semibold">
                {item.text}
              </h2>
            ))}
          </div>
        </div>

        {/* Bullets */}
        <div className="bullets flex justify-center items-center space-x-2">
          {props.carouselData.map((_, index) => (
            <span
              key={index}
              className={`block w-[0.5rem] h-[0.5rem] rounded-full  cursor-pointer transition-all duration-300 ${
                activeBullet === index + 1
                  ? "w-[1.1rem] bg-black rounded-full"
                  : "bg-gray-300"
              }`}
              onClick={() => handleBulletClick(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
