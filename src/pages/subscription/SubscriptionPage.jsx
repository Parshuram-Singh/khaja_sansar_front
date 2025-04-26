import { useState } from "react";
import Plan from "../../components/plan/Plan";
import OneTimeOrder from "../../components/plan/OneTimeOrder";
import WeeklyPlan from "../../components/plan/WeeklyPlan";
import CorporatePlan from "../../components/plan/CorporatePlan";
import Gateway from "../../components/paymentGateway/Gateway";
import { createSubscription } from "../../services/subscriptionService";
import { toast } from "react-toastify";

const SubscriptionPage = () => {
  const [plan, setPlan] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState({
    price: 0,
    time: "",
    orderDetails: [],
  });
  const [showGateway, setShowGateway] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const subscribeItems = async () => {
    if (!selectedMenu.time) {
      toast.warning("Please select a delivery time.");
      return;
    }

    if (plan === 1) {
      if (selectedMenu.orderDetails.length === 0) {
        toast.warning("Please select at least one delivery day and food item.");
        return;
      }

      const hasEmptyItem = selectedMenu.orderDetails.some(
        (detail) => detail.items.length === 0
      );
      if (hasEmptyItem) {
        toast.warning("Each selected day must have a food item.");
        return;
      }
    }

    const data = {
      userId: JSON.parse(localStorage.getItem("user"))._id,
      paymentStatus: "pending",
      price: selectedMenu.price,
      deliveryTime: selectedMenu.time,
      orderDetails: selectedMenu.orderDetails,
      type: plan === 0 ? "one-time-order" : plan === 1 ? "weekly" : "corporate",
      deliveryAddress: selectedMenu.deliveryAddress,
      startDate: selectedMenu.startDate,
      endDate: selectedMenu.endDate,
    };

    try {
      const response = await createSubscription(data);
      console.log("Subscription response:", response);
      setSubscriptionId(response.data._id);
      setShowGateway(true);
    } catch (err) {
      console.error("Error creating subscription:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGatewayClose = (paymentSuccess = false) => {
    setShowGateway(false);
    if (paymentSuccess) {
      toast.success("Subscription and payment completed successfully!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Plan changePlan={setPlan} />

      {plan === 0 ? (
        <OneTimeOrder
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          subscribeItems={subscribeItems}
        />
      ) : plan === 1 ? (
        <WeeklyPlan
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          subscribeItems={subscribeItems}
        />
      ) : (
        <CorporatePlan
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          subscribeItems={subscribeItems}
        />
      )}

      {showGateway && (
        <Gateway
          onClose={handleGatewayClose}
          price={selectedMenu.price}
          subscriptionId={subscriptionId}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
