import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUtensils, FaRocket, FaLeaf, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { GiFlowerPot } from 'react-icons/gi';
import { createSubscription } from '../../services/subscriptionService';
import Gateway from '../../components/paymentGateway/Gateway';

const SubscriptionPage = () => {
  const { state } = useLocation();
  const { selectedProduct } = state || {};
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [deliverySchedule, setDeliverySchedule] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [getWayOpened, setGetWayOpened] = useState(false);

  const handleDietaryChange = (e) => setDietaryPreference(e.target.value);
  const handleScheduleChange = (e) => {
    const value = e.target.value;
    setDeliverySchedule((prevSchedule) =>
      prevSchedule.includes(value)
        ? prevSchedule.filter((day) => day !== value)
        : [...prevSchedule, value]
    );
  };
  const handlePlanSelection = (plan) => setSelectedPlan(plan);

  // Define plan prices
  const planPrices = {
    'Weekly Plan': 500,
    'Monthly Plan': 1000,
    'Corporate Plan': 0, // Assuming "Contact for pricing" means no fixed price
  };

  const khaltiPayment = (subscriptionData) => {
    setGetWayOpened(true);
    return true; // Return true to indicate payment initiation success
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedProduct) {
      setErrorMessage('Please select a product.');
      return;
    }
    if (!selectedPlan) {
      setErrorMessage('Please select a subscription plan.');
      return;
    }
    if (!dietaryPreference) {
      setErrorMessage('Please select a dietary preference.');
      return;
    }
    if (deliverySchedule.length === 0) {
      setErrorMessage('Please select at least one delivery day.');
      return;
    }
    if (!deliveryTime) {
      setErrorMessage('Please set a delivery time.');
      return;
    }

    const subscriptionData = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      price: planPrices[selectedPlan] || selectedProduct.price, // Use plan price or fallback to product price
      selectedPlan,
      dietaryPreference,
      deliverySchedule,
      deliveryTime,
    };

    setLoading(true);

    try {
      const isPaymentSuccess = khaltiPayment(subscriptionData);
      if (!isPaymentSuccess) {
        setErrorMessage('Payment initiation failed.');
        return;
      }
      const response = await createSubscription(subscriptionData);
      if (response.message === 'Subscription successful!') {
        setSuccessMessage('Subscription created successfully!');
        setDietaryPreference('');
        setDeliverySchedule([]);
        setDeliveryTime('');
        setSelectedPlan('');
      } else {
        setErrorMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {getWayOpened && (
        <Gateway
          onClose={setGetWayOpened}
          price={planPrices[selectedPlan] || selectedProduct?.price || 0} // Pass the price
        />
      )}
      <section>
        <div className="bg-gray-50 text-gray-800 py-12">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-4xl font-extrabold text-blue-500 mb-8">Subscription Plans</h2>

            {successMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Selected Product</h3>
              {selectedProduct ? (
                <>
                  <p className="text-gray-800 font-bold">Product ID: {selectedProduct._id}</p>
                  <p className="text-gray-800 font-bold text-xl">Product Name: {selectedProduct.name}</p>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                  <p className="text-gray-800 font-bold mt-2">Price: {selectedProduct.price}</p>
                </>
              ) : (
                <p className="text-gray-800 font-bold">
                  First, you need to select a product to subscribe to food.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

            <div className="flex mt-8 flex-col md:flex-row">
              <div className="bg-white rounded-xl p-6 w-full md:w-2/3 mr-0 md:mr-8 mb-8 md:mb-0 shadow-lg border border-gray-300">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">Customize Your Meal</h2>
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
                <div className="mb-6">
                  <label className="block text-gray-600 mb-2">Choose your delivery days:</label>
                  <div className="flex flex-wrap gap-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
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

              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-10 w-full md:w-1/3 shadow-2xl text-white min-h-[450px]">
                <h3 className="text-3xl font-bold mb-8 flex items-center space-x-3">
                  <GiFlowerPot className="text-4xl" />
                  <span>Summary</span>
                </h3>
                <div className="space-y-6 text-lg">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUtensils className="text-xl" />
                      <span className="font-semibold">Product Name:</span>
                    </span>
                    <span>{selectedProduct ? selectedProduct.name : 'No product selected'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaRocket className="text-xl" />
                      <span className="font-semibold">Selected Plan:</span>
                    </span>
                    <span>{selectedPlan || 'None selected'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaLeaf className="text-xl" />
                      <span className="font-semibold">Dietary Preference:</span>
                    </span>
                    <span>{dietaryPreference || 'None selected'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-xl" />
                      <span className="font-semibold">Delivery Days:</span>
                    </span>
                    <span>
                      {deliverySchedule.length > 0 ? deliverySchedule.join(', ') : 'None selected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaClock className="text-xl" />
                      <span className="font-semibold">Delivery Time:</span>
                    </span>
                    <span>{deliveryTime || 'Not set'}</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`mt-10 w-full ${
                    loading ? 'bg-gray-400' : 'bg-white'
                  } text-blue-600 font-bold py-3 rounded-lg transition duration-300 hover:bg-gray-100`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubscriptionPage;