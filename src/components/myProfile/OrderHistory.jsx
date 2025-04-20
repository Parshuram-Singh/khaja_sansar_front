import { useState, useEffect } from 'react';
import { fetchOrderHistory } from '../../services/orderHistory';
import moment from 'moment';

const OrderHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrderHistory();
        if (response.success) {
          setPayments(response.payments);
        } else {
          setError(response.message || 'Failed to fetch order history');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center text-red-400 bg-white p-6 rounded-xl shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow-lg">
          No order history found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Order History</h1>
        <div className="space-y-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Purchase Order ID</p>
                  <p className="text-lg font-medium text-gray-800">{payment.purchaseOrderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium text-gray-800">{payment.purchaseOrderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="text-lg font-medium text-gray-800">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-lg font-medium text-gray-800">
                    Rs. {(payment.amount / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-medium text-gray-800">
                    {moment(payment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                </div>
              </div>

              {/* Subscription Details */}
              {payment.subscription && (
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="text-base font-medium text-gray-800">{payment.subscription.selectedPlan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Time</p>
                      <p className="text-base font-medium text-gray-800">{payment.subscription.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-base font-medium text-gray-800">Rs. {payment.subscription.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subscribed On</p>
                      <p className="text-base font-medium text-gray-800">
                        {moment(payment.subscription.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </p>
                    </div>
                  </div>
                  {payment.subscription.orderDetails && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Order Details</p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        {payment.subscription.orderDetails.map((detail, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <p className="text-base font-medium text-gray-800">Day: {detail.day}</p>
                            <ul className="mt-2 space-y-1">
                              {detail.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="text-sm text-gray-600 flex items-center"
                                >
                                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
