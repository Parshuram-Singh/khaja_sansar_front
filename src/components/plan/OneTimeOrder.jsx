import { useState, useEffect } from "react";
import useMenus from "../../hooks/useMenus";
import { toast } from "react-toastify";

const OneTimeOrder = ({ setSelectedMenu, selectedMenu, subscribeItems }) => {
  const { menus } = useMenus();
  const [selectedItems, setSelectedItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  // Calculate total price of selected items
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Handle item selection/deselection
  const handleItemToggle = (item) => {
    setSelectedItems((prev) => {
      if (prev.some((selected) => selected.name === item.name)) {
        return prev.filter((selected) => selected.name !== item.name);
      } else {
        return [...prev, item];
      }
    });
  };

  // Update selectedMenu state when local state changes
  useEffect(() => {
    setSelectedMenu({
      ...selectedMenu,
      price: totalPrice,
      time: deliveryTime,
      deliveryAddress,
      startDate: deliveryDate,
      endDate: deliveryDate,
      orderDetails: deliveryDate && selectedItems.length > 0 
        ? [{ day: deliveryDate, items: selectedItems.map((item) => item.name) }]
        : [],
      type: "one-time-order",
    });
  }, [selectedItems, deliveryDate, deliveryTime, deliveryAddress, setSelectedMenu, totalPrice]);

  const handleSubscribe = () => {
    if (isSubmitting) return; // Prevent multiple submissions
    if (selectedItems.length === 0) {
      toast.warning("Please select at least one food item.");
      return;
    }
    if (!deliveryTime) {
      toast.warning("Please select a delivery time.");
      return;
    }
    if (!deliveryAddress) {
      toast.warning("Please provide a delivery address.");
      return;
    }

    setIsSubmitting(true);
    subscribeItems();
  };

  // Reset isSubmitting after subscription attempt (success or failure)
  useEffect(() => {
    if (isSubmitting) {
      // Reset after a delay to allow SubscriptionPage to handle the API call
      const timer = setTimeout(() => setIsSubmitting(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">One-Time Order</h2>
      <p className="text-gray-600 mb-6">Perfect for individuals who need a one-time meal</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Food Item Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Food Items</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-md p-3">
              {menus.map((menu) => (
                <label key={menu.name} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    checked={selectedItems.some((item) => item.name === menu.name)}
                    onChange={() => handleItemToggle(menu)}
                  />
                  <span className="text-gray-700">{menu.name} (₹{menu.price})</span>
                </label>
              ))}
              {menus.length === 0 && (
                <p className="text-gray-500">No menu items available</p>
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">Delivery Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="text-gray-600">Delivery Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600">Delivery Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address"
                />
              </div>
            </div>
          </div>

          {/* Order Button */}
          <button
            className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
              selectedItems.length === 0 || !deliveryDate || !deliveryTime || !deliveryAddress || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSubscribe}
            disabled={selectedItems.length === 0 || !deliveryDate || !deliveryTime || !deliveryAddress || isSubmitting}
          >
            Order Now
          </button>
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 p-4 rounded-lg sticky top-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Selected Items</p>
                <ul className="text-base font-medium text-gray-800">
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                      <li key={item.name}>
                        {item.name} (₹{item.price})
                      </li>
                    ))
                  ) : (
                    <li>No items selected</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Date</p>
                <p className="text-base font-medium text-gray-800">
                  {deliveryDate || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p className="text-base font-medium text-gray-800">
                  {deliveryTime || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-base font-medium text-gray-800">
                  {deliveryAddress || "Not selected"}
                </p>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-xl font-semibold text-gray-800">₹{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimeOrder;