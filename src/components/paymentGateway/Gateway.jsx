import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const Gateway = ({ onClose, price }) => {
  const [formData, setFormData] = useState({
    amount: price || '',
    phone: '',
    itemName: '',
    name: '',
    email: '',
  });

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
      const payload = {
        amount: Number(formData.amount) * 100, // NPR to paisa
        phone: formData.phone,
        itemName: formData.itemName,
        name: formData.name || 'User',
        email: formData.email || 'user@example.com',
      };

      const response = await axios.post('http://localhost:3000/api/payment/initiate-payment', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setPaymentInitiated(true);
        window.location.href = response.data.paymentUrl;
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pidx = searchParams.get('pidx');
    if (pidx && paymentInitiated) {
      verifyPayment(pidx);
    }
  }, [paymentInitiated]);

  const verifyPayment = async (pidx) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/verify-payment',
        { pidx },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert('✅ Payment successful! Transaction ID: ' + response.data.data.transaction_id);
        onClose(false);
      } else {
        setError('❌ Payment verification failed: ' + response.data.status);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to verify payment');
    } finally {
      setLoading(false);
      setPaymentInitiated(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          aria-label="Close"
          disabled={loading}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Khalti Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount (Read-only) */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (NPR)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="10"
              value={formData.amount}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              pattern="[9][7-8][0-9]{8}"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
              Purpose
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              required
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Payment purpose"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>

          {/* Optional: Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
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

          {error && <div className="text-red-500 text-sm">{error}</div>}

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
