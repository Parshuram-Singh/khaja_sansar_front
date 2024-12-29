import React from 'react';
import './Hero.css'; // Import the CSS file for styling
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <section class="relative bg-cover bg-center h-screen flex flex-col lg:flex-row hero" id="hero">
        <div class="absolute inset-0 opacity-50"></div>

        <div class="relative z-10 max-w-screen-xl mx-auto px-4 py-16 flex items-center flex-col lg:flex-row w-full">

          <div class="w-full lg:w-1/2 text-center lg:text-left space-y-6 hero-left wow fadeInUp">
            <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight mb-4">
              <span class="text-yellow-500">Tasty Food</span> Welcome to The Culinary Haven
            </h1>
            <p class="text-lg sm:text-xl text-gray-500">
              Savor the best dishes crafted with love and passion for your tastebuds. From fresh ingredients
              to expert chefs, we bring you an unforgettable dining experience.
            </p>

            <div class="space-x-4 space-y-2 mt-6">

              <a href="#menu"
                class="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 inline-block">
                Watch Video <i class="fas fa-play"></i>
              </a>
              <a
                href="#menu"
                className="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Start subscription</span>
                <FaArrowRight />
              </a>
            </div>
          </div>


          <div class="hero-right w-full lg:w-1/2 mt-8 lg:mt-0">
            <div class="hero-right-child relative">
              <img src="https://static.vecteezy.com/system/resources/previews/010/916/886/non_2x/fast-food-3d-model-free-png.png"
                alt="Dish 1" class="hero-img w-full object-contain" />
            </div>
          </div>
        </div>

      </section>

    </>
  );
};

export default Hero;
