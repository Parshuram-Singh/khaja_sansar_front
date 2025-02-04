import React, { useState } from 'react';
import Hero from '../../components/hero/Hero';

const HomePage = () => {
  const [selectedDates, setSelectedDates] = useState({}); // Stores selected dates per plan

  const plans = [
    {
      title: "Weekly Plan",
      description: "Perfect for short-term access and flexibility.",
      price: "रु 800",
      features: ["7 Days Access", "Basic Support", "Limited Features"],
    },
    {
      title: "Monthly Plan",
      description: "Ideal for regular users seeking more value.",
      price: "रु 2400",
      features: ["30 Days Access", "Priority Support", "Full Features"],
    },
    {
      title: "Corporate Plan",
      description: "Best for businesses with team access needs.",
      price: "रु 8000",
      features: ["Team Access", "Dedicated Support", "Custom Features"],
    },
  ];

  const handleDateChange = (planTitle, date) => {
    setSelectedDates((prev) => ({
      ...prev,
      [planTitle]: date,
    }));
  };

  const handleSubscribe = (planTitle) => {
    const selectedDate = selectedDates[planTitle];
    if (!selectedDate) {
      alert(`Please select a date for the ${planTitle}.`);
      return;
    }
    alert(`You subscribed to the ${planTitle} starting from ${selectedDate}.`);
  };

  return (
    <main className="bg-gray-50"> {/* Softer background for the main content */}
      <Hero />

      <section>
        <div className="bg-white text-gray-800 py-12"> {/* Lighter background for the section */}
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
              Subscription Plans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 p-8 border border-gray-200"
                >
                  <h3 className="text-2xl font-semibold text-blue-500 mb-4">{plan.title}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p> {/* Softer text color */}
                  <div className="text-3xl font-bold text-blue-500 mb-6">{plan.price}</div>
                  <ul className="text-gray-500 space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-yellow-500 mr-2">✔</span> {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Date Picker */}
                  <label className="block text-gray-600 mb-2">Select Start Date:</label>
                  <input
                    type="date"
                    className="w-full py-2 px-3 rounded-lg mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleDateChange(plan.title, e.target.value)}
                    min={new Date().toISOString().split('T')[0]}  // Prevent past dates
                    aria-label={`Select start date for ${plan.title}`}
                  />

                  <button
                    onClick={() => handleSubscribe(plan.title)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='bg-gray-700 text-white py-6'>
        <div className="container mx-auto text-center ">
          <p className="text-sm text-gray-400">meal product sections......</p>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
