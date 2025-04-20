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
        <div className="mb-8">
          <div className="px-6 py-4 rounded-t-xl">
            <h2 className="text-3xl font-bold text-gray-600">
              Subscription Management
            </h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-600 mx-auto">
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

        {/* Subscription Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl border border-gray-200">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-xl">
              <h3 className="text-xl font-semibold text-white">Subscriptions</h3>
            </div>
            <div className="p-6">
              {subscriptions.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
                    >
                      <div className="space-y-4">
                        {/* User ID */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            User ID
                          </p>
                          <p className="text-sm text-gray-900 font-medium">
                            {sub.userId}
                          </p>
                        </div>

                        {/* Payment Status */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Payment Status
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              sub.paymentStatus === 'Paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {sub.paymentStatus}
                          </span>
                        </div>

                        {/* Price */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Price
                          </p>
                          <p className="text-sm text-gray-900">
                            ${sub.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Delivery Time */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Delivery Time
                          </p>
                          <p className="text-sm text-gray-900">
                            {sub.deliveryTime}
                          </p>
                        </div>

                        {/* Selected Plan */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Selected Plan
                          </p>
                          <p className="text-sm text-gray-900">
                            {sub.selectedPlan}
                          </p>
                        </div>

                        {/* Order Details */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Order Details
                          </p>
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
                            <span className="text-xs text-gray-500">
                              No order details
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 text-gray-500 text-sm">
                  No subscriptions found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionManagement;