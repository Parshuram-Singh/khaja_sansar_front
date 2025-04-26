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
        if (data && data.message === 'Subscriptions found!') {
          setSubscriptions(data.data);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl border border-gray-200 mb-8">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-xl">
            <h2 className="text-3xl font-bold text-white text-center">
              Subscription Management
            </h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-center text-base text-gray-600 max-w-2xl mx-auto">
              Efficiently manage user subscriptions and their details with a clear and organized overview.
            </p>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-white border border-red-200 text-red-600 rounded-lg shadow-md text-center max-w-7xl mx-auto">
            {error}
          </div>
        )}
        {/* Subscription Table */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500">
            <h3 className="text-xl font-semibold text-white">Subscriptions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Delivery Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                    Selected Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="hover:bg-blue-50 transition-colors duration-200 divide-x divide-gray-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {sub.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            sub.paymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {sub.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${sub.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sub.deliveryTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sub.selectedPlan}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 align-top">
                        {sub.orderDetails && sub.orderDetails.length > 0 ? (
                          <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                            {sub.orderDetails.map((order, index) => (
                              <div
                                key={index}
                                className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-200 last:mb-0"
                              >
                                <p className="text-xs font-medium text-gray-800">
                                  Day: {order.day}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                  Items: {order.items.join(', ')}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">
                            No order details
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500 text-sm"
                    >
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubscriptionManagement;