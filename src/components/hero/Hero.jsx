import './Hero.css'; // Import the CSS file for styling
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <>
      <section className="relative bg-cover bg-center h-screen flex flex-col lg:flex-row hero" id="hero">
        <div className="absolute inset-0 opacity-50"></div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-16 flex items-center flex-col lg:flex-row w-full">

          {/* Left Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 hero-left wow fadeInUp">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-yellow-500">Khaja Sansar</span> Revolutionizing Office Meals
            </h1>
            <p className="text-lg sm:text-xl text-gray-500">
              Simplify your lunch breaks with our curated meal subscriptions. Enjoy timely, affordable, and healthy meals tailored to your preferences.
            </p>

            <div className="space-x-4 space-y-2 mt-6">
            
              <a
                href="#menu"
                className="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
              >
                Learn More
              </a>
              <a
                href="/menus"
                className="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Go to menus</span>
                <FaArrowRight />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="hero-right w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="hero-right-child relative">
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/916/886/non_2x/fast-food-3d-model-free-png.png"
                alt="Delicious Food"
                className="hero-img w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
