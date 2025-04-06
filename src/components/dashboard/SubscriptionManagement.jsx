import { useState, useEffect } from 'react';
import { getAllSubscriptions } from '../../services/subscriptionService';

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getAllSubscriptions();
        console.log('Fetched subscriptions:', data);

        // Check if subscriptions data is found
        if (data && data.message === 'Subscriptions found!') {
          setSubscriptions(data.data); // Assuming 'data' holds the actual subscription list
        } else {
          setError('No valid subscriptions found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch subscriptions');
      }
    };

    fetchSubscriptions();
  }, []);

  console.log('Subscriptions in state:', subscriptions);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Subscription Management</h2>
      <p className="text-center mb-4 text-lg text-gray-600">Manage the subscriptions and their details for users.</p>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Subscription List */}
      <div className="overflow-x-auto">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Subscriptions</h3>
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Product ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Product Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Price</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Dietary Preference</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Delivery Schedule</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Delivery Time</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Plan</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">{sub.productId}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">{sub.productName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">${sub.price}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">{sub.dietaryPreference}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">{sub.deliverySchedule.join(', ')}</td> {/* Adjust for array */}
                  <td className="py-3 px-4 text-sm text-gray-700 border-r">{sub.deliveryTime}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{sub.selectedPlan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center text-gray-600">No subscriptions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionManagement;
