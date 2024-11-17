import { useState, useEffect } from "react";

const Carousel = (props) => {
  const [activeBullet, setActiveBullet] = useState(1);
  const [isManualInteraction, setIsManualInteraction] = useState(false);

  // Handle bullet click
  const handleBulletClick = (index) => {
    setActiveBullet(index);
    setIsManualInteraction(true);
  };

  // Automatically change active bullet every 3 seconds
  useEffect(() => {
    const autoSlide = () => {
      // Cycle through bullets based on the total number of items
      setActiveBullet((prevActiveBullet) => {
        return prevActiveBullet === props.carouselData.length
          ? 1
          : prevActiveBullet + 1;
      });
    };

    if (isManualInteraction) {
      // If manual interaction happens, reset the interaction flag after 3 seconds
      const resetManualInteraction = setTimeout(() => {
        setIsManualInteraction(false);
      }, 3000);

      // Clean up the timeout when the effect is re-run or component unmounts
      return () => clearTimeout(resetManualInteraction);
    }

    // Set an interval to automatically change the active bullet every 3 seconds
    const interval = setInterval(autoSlide, 3000);

    // Cleanup the interval on component unmount or when the effect runs again
    return () => clearInterval(interval);
  }, [isManualInteraction, props.carouselData.length]);

  return (
    <div className="carousel absolute w-full sm:w-[55%] sm:top-0 left-0 sm:left-[45%] bg-opacity-80 rounded-2xl p-6 sm:p-8 transition-all duration-800 ease-in-out">
      {/* Images Wrapper */}
      <div className="images-wrapper grid grid-cols-1 grid-rows-1 gap-6">
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
        <div className="text-wrap max-h-[2.2rem] overflow-hidden mb-[2.5rem]">
          <div
            className="text-group flex flex-col text-center transition-transform duration-500"
            style={{
              transform: `translateY(${-(activeBullet - 1) * 2.2}rem)`,
            }}
          >
            {/* Dynamically render text */}
            {props.carouselData.map((item, index) => (
              <h2
                key={index}
                className="text-[1.6rem] font-semibold leading-[2.2rem] text-black"
              >
                {item.text}
              </h2>
            ))}
          </div>
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
  );
};

export default Carousel;
