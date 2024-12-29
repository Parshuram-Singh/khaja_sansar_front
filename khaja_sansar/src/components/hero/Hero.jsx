import React from 'react';
import './Hero.css'; // Import the CSS file for styling

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Flexible Meal Subscriptions</h1>
        <p className="hero-subtitle">
          Simplify your mealtime with Khaja Sansar's customizable subscription plans. Choose between weekly or monthly options and enjoy a variety of freshly prepared meals delivered to your doorstep.
        </p>
        <ul className="hero-list">
          <li>Weekly and Monthly Plans</li>
          <li>Healthy and Delicious Meals</li>
          <li>Convenient Delivery Options</li>
        </ul>
        <button className="hero-button">Subscribe Now</button>
      </div>
    </section>
  );
};

export default Hero;
