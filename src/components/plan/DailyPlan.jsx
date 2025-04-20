import React from 'react';
import PropTypes from 'prop-types';

const DailyPlan = ({ price = '₹150', description = 'Perfect for individuals who need a one-time meal', features = [
  '1 Meal Included',
  'Free Delivery',
  '24/7 Support'
], buttonText = 'Subscribe Now' }) => {
  return (
    <div className="plan-card">
      <h3>Daily Plan</h3>
      <p>{description}</p>
      <span className="plan-price">{price}</span>
      
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      
      <button className="plan-button">{buttonText}</button>
    </div>
  );
};

DailyPlan.propTypes = {
  price: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string
};

export default DailyPlan;