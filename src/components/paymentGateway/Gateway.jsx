import { useState, useEffect, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const Gateway = ({ onClose, price, subscriptionId }) => {
  const [formData, setFormData] = useState({
    amount: price || '',
    phone: '',
    name: '',
    email: '',
    subscriptionId: subscriptionId || '',
  });
  console.log('Form Data:', formData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const user = localStorage.getItem('user');
      const userId = user ? JSON.parse(user)._id : null;
  
      if (!userId) {
        throw new Error('User not logged in. Please log in to proceed.');
      }
  
      const payload = {
        amount: Number(formData.amount) * 100, // Convert NPR to paisa
        phone: formData.phone.trim(),
        name: formData.name.trim() || 'User',
        email: formData.email.trim() || 'user@example.com',
        subscriptionId: formData.subscriptionId,
        userId, // Add userId to payload
      };

      console.log('Payload to send:', payload);
  
      const response = await axios.post(
        'http://localhost:3000/api/payment/initiate-payment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
  
      if (response.data.success && response.data.paymentUrl) {
        setPaymentInitiated(true);
        window.location.href = response.data.paymentUrl;
      } else {
        setError(response.data.message || 'Failed to initiate payment');
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          'An error occurred while initiating payment'
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = useCallback(
    async (pidx) => {
      setLoading(true);
      setError(null);
  
      try {
       
  
  
        const response = await axios.post(
          'http://localhost:3000/api/verify-payment',
          { pidx },
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            timeout: 10000,
          }
        );
  
        if (response.data.success) {
          alert(
            `✅ Payment successful! Transaction ID: ${response.data.data.transaction_id}`
          );
          onClose(false);
        } else {
          setError(`❌ Payment verification failed: ${response.data.status}`);
        }
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.message ||
            'An error occurred while verifying payment'
        );
      } finally {
        setLoading(false);
      }
    },
    [onClose]
  );
  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pidx = searchParams.get('pidx');
    if (pidx && paymentInitiated) {
      verifyPayment(pidx);
    }
  }, [paymentInitiated, verifyPayment]);

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors"
          aria-label="Close payment modal"
          disabled={loading}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Khalti Payment
        </h2>

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          {/* Amount (Read-only) */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (NPR)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-describedby="amount-readonly"
            />
            <span id="amount-readonly" className="sr-only">
              This field is read-only
            </span>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>

          {/* Optional: Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>

          {/* Optional: Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="text-red-500 text-sm p-2 bg-red-50 rounded"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-purple-600 text-white rounded-md transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
            }`}
          >
            {loading ? 'Processing...' : 'Pay with Khalti'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Gateway;