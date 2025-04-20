import React from 'react';
import './Plan.css';

const plans = [
    {
        name: 'Daily Plan',
        description: 'Perfect for individuals who need a one-time meal.',

    },
    {
        name: 'Weekly Plan',
        description: 'Ideal for busy people who want hassle-free weekly meals.',
    },
    {
        name: 'Corporate Plan',
        description: 'Custom meal solutions for companies and teams.',
    },
];

const Plan = ({changePlan}) => {
    return (
        <div className="plan-container">
            <h2 className="plan-title">Our Plans</h2>
            <div className="plan-cards">
                {plans.map((plan, index) => (
                    <div key={index} className="plan-card">
                        <h3>{plan.name}</h3>
                        <p>{plan.description}</p>
                        <button className='primary-btn' onClick={() => changePlan(index)}>{plan.name}</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plan;
