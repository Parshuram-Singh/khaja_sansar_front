// src/components/SubscriptionList.js
import { useState, useEffect } from 'react';
import { getAllSubscriptions } from '../services/subscriptionService'; // Assuming the service is already set up

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all subscriptions when the component mounts
    const fetchSubscriptions = async () => {
      try {
        const data = await getAllSubscriptions();
        setSubscriptions(data);
      } catch (err) {
        setError(err.message || "Failed to fetch subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="subscription-list">
      <h2>Subscription List</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions available</p>
      ) : (
        <ul>
          {subscriptions.map((subscription) => (
            <li key={subscription._id} className="subscription-item">
              <h3>{subscription.productName}</h3>
              <p>Price: {subscription.price}</p>
              <p>Dietary Preference: {subscription.dietaryPreference}</p>
              <p>Delivery Schedule: {subscription.deliverySchedule}</p>
              <p>Delivery Time: {subscription.deliveryTime}</p>
              <p>Plan: {subscription.selectedPlan}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionList;
