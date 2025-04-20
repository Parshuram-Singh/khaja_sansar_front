import { useState } from 'react';
import Plan from '../../components/plan/Plan';
import DailyPlan from '../../components/plan/DailyPlan';
import WeeklyPlan from '../../components/plan/WeeklyPlan';
import CorporatePlan from '../../components/plan/CorporatePlan';
import Gateway from '../../components/paymentGateway/Gateway';
import { createSubscription } from '../../services/subscriptionService';
import { toast } from 'react-toastify';

const SubscriptionPage = () => {
  const [plan, setPlan] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState({
    price: 0,
    time: '',
    orderDetails: [],
  });
  const [showGateway, setShowGateway] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null); // New state for subscription ID

  const subscribeItems = async () => {
    // Basic validation
    if (!selectedMenu.time) {
      toast.warning('Please select a delivery time.');
      return;
    }

    if (plan === 1) {
      // Weekly Plan
      if (!selectedMenu.orderDetails || selectedMenu.orderDetails.length === 0) {
        toast.warning('Please select at least one delivery day and food item.');
        return;
      }

      const hasEmptyItem = selectedMenu.orderDetails.some(
        (detail) => detail.items.length === 0
      );
      if (hasEmptyItem) {
        toast.warning('Each selected day must have a food item.');
        return;
      }
    }

    // Validation passed
    const data = {
      userId: JSON.parse(localStorage.getItem('user'))._id,
      paymentStatus: 'pending',
      price: selectedMenu.price,
      deliveryTime: selectedMenu.time,
      selectedPlan: plan === 0 ? 'Daily' : plan === 1 ? 'Weekly' : 'Corporate',
      orderDetails: selectedMenu.orderDetails,
    };

    try {
      const response = await createSubscription(data);
      console.log('Subscription ID:', response.data._id);
      setSubscriptionId(response.data._id); // Save subscription ID
      setShowGateway(true); // Show payment gateway
    } catch (err) {
      console.error('Error creating subscription:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Handle Gateway close
  const handleGatewayClose = (paymentSuccess = false) => {
    setShowGateway(false);
    if (paymentSuccess) {
      toast.success('Subscription and payment completed successfully!');
    }
  };

  return (
    <>
      <Plan changePlan={setPlan} />

      {plan === 0 ? (
        <DailyPlan />
      ) : plan === 1 ? (
        <WeeklyPlan
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          subscribeItems={subscribeItems}
        />
      ) : (
        <CorporatePlan />
      )}

      {showGateway && (
        <Gateway
          onClose={handleGatewayClose}
          price={selectedMenu.price}
          subscriptionId={subscriptionId} // Pass subscription ID to Gateway
        />
      )}
    </>
  );
};

export default SubscriptionPage;
