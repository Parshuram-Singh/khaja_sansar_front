import React, { useState } from 'react';

const SubscriptionPage = () => {
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [deliverySchedule, setDeliverySchedule] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(''); // State for tracking the selected plan

  const handleDietaryChange = (e) => setDietaryPreference(e.target.value);
  const handleScheduleChange = (e) => {
    const value = e.target.value;
    setDeliverySchedule((prevSchedule) =>
      prevSchedule.includes(value)
        ? prevSchedule.filter((day) => day !== value)
        : [...prevSchedule, value]
    );
  };

  const handlePlanSelection = (plan) => setSelectedPlan(plan); // Handler for plan selection

  return (
    <main>
      <section>
        <div className="bg-gray-50 text-gray-800 py-12"> {/* Softer background for overall layout */}
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-4xl font-extrabold text-blue-500 mb-8">Subscription Plans</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Weekly Plan */}
              <div className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 p-8 text-center border border-gray-300">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Weekly Plan</h3>
                <p className="text-gray-600 mb-6">500 NPR/month</p>
                <button
                  onClick={() => handlePlanSelection('Weekly Plan')}
                  className={`w-full ${
                    selectedPlan === 'Weekly Plan' ? 'bg-blue-600' : 'bg-blue-500'
                  } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300`}
                >
                  {selectedPlan === 'Weekly Plan' ? 'Selected' : 'Select'}
                </button>
              </div>

              {/* Monthly Plan */}
              <div className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 p-8 text-center border border-gray-300">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Monthly Plan</h3>
                <p className="text-gray-600 mb-6">1,000 NPR/month</p>
                <button
                  onClick={() => handlePlanSelection('Monthly Plan')}
                  className={`w-full ${
                    selectedPlan === 'Monthly Plan' ? 'bg-blue-600' : 'bg-blue-500'
                  } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300`}
                >
                  {selectedPlan === 'Monthly Plan' ? 'Selected' : 'Select'}
                </button>
              </div>

              {/* Corporate Plan */}
              <div className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 p-8 text-center border border-gray-300">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Corporate Plan</h3>
                <p className="text-gray-600 mb-6">Contact for pricing</p>
                <button
                  onClick={() => handlePlanSelection('Corporate Plan')}
                  className={`w-full ${
                    selectedPlan === 'Corporate Plan' ? 'bg-blue-600' : 'bg-blue-500'
                  } hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300`}
                >
                  {selectedPlan === 'Corporate Plan' ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>

            <div className="flex mt-8">
              {/* Form Section (Left side) */}
              <div className="bg-white rounded-xl p-6 w-2/3 mr-8 shadow-lg border border-gray-300">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Customize Your Meal</h2>

                {/* Dietary Preference */}
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">Choose your dietary preference:</label>
                  <select
                    value={dietaryPreference}
                    onChange={handleDietaryChange}
                    className="w-full py-2 px-3 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Nepali">Nepali</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>

                {/* Delivery Schedule */}
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">Choose your delivery days:</label>
                  <div className="flex flex-wrap gap-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <label key={day} className="flex items-center space-x-2 text-gray-600">
                        <input
                          type="checkbox"
                          value={day}
                          onChange={handleScheduleChange}
                          className="form-checkbox text-blue-500"
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">Choose delivery time:</label>
                  <input
                    type="time"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-32 py-2 px-3 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Summary Section (Right side) */}
              <div className="bg-white rounded-xl p-6 w-1/3 shadow-lg border border-gray-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Summary</h3>
                <p className="text-gray-600"><strong>Selected Plan:</strong> {selectedPlan || 'None selected'}</p>
                <p className="text-gray-600"><strong>Dietary Preference:</strong> {dietaryPreference || 'None selected'}</p>
                <p className="text-gray-600"><strong>Delivery Days:</strong> {deliverySchedule.join(', ') || 'None selected'}</p>
                <p className="text-gray-600"><strong>Delivery Time:</strong> {deliveryTime || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubscriptionPage;