import { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get('pidx');

  useEffect(() => {
    if (pidx) {
      axios.post('http://localhost:3000/api/verify-payment', { pidx }).then(res => {
        if (res.data.success) {
          alert('✅ Payment Successful');
        } else {
          alert('❌ Payment Failed');
        }
      });
    }
  }, [pidx]);

  return <div className="text-center mt-10 text-xl font-bold">Verifying Payment...</div>;
};

export default PaymentSuccess;
