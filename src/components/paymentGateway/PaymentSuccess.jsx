import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const [data, setData] = useState(null);
  const pidx = searchParams.get('pidx');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post('http://localhost:3000/api/payment/verify', { pidx });
        if (res.data.success) {
          setStatus('Payment Successful ✅');
          setData(res.data.data);
        } else {
          setStatus('Payment Failed ❌');
        }
      } catch (err) {
        setStatus('Error verifying payment ❌');
      }
    };

    if (pidx) verifyPayment();
    else setStatus('No payment ID found');
  }, [pidx]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md font-mono">
        <h1 className="text-center text-2xl font-bold mb-2">🧾 Payment Receipt</h1>
        <p className="text-center text-sm text-gray-600 mb-6">{status}</p>

        {data && (
          <>
            <div className="mb-4">
              <h2 className="font-semibold">Merchant Info</h2>
              <p>Khaja Sansar Pvt. Ltd.</p>
              <p>www.khajasansar.com</p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold">Customer Info</h2>
              <p><strong>Name:</strong> {data.user?.name || 'N/A'}</p>
              <p><strong>Phone:</strong> {data.user?.mobile || 'N/A'}</p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold">Payment Details</h2>
              <p><strong>Amount:</strong> NPR {data.amount / 100}</p>
              <p><strong>Payment Method:</strong> {data.payment_method}</p>
              <p><strong>Transaction ID:</strong> {data.transaction_id}</p>
              <p><strong>Status:</strong> {data.status}</p>
              <p><strong>Date:</strong> {new Date(data.created_on).toLocaleString()}</p>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
              Thank you for your payment! 🙏
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
