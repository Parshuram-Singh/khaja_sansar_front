import { useEffect, useState } from "react";
import useMenus from "../../hooks/useMenus";
import { toast } from "react-toastify";

const WeeklyPlan = ({ setSelectedMenu, selectedMenu, subscribeItems }) => {
  const { menus } = useMenus();
  const [selectedDays, setSelectedDays] = useState([]);
  const [foodItems, setFoodItems] = useState({}); // { day: [item1, item2, ...] }
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total price based on all selected items across all days
  const totalPrice = Object.values(foodItems).reduce((sum, items) => {
    return sum + items.reduce((itemSum, item) => itemSum + (item.price || 0), 0);
  }, 0);

  // Update selectedMenu state
  useEffect(() => {
    const orderDetails = selectedDays.map((day) => ({
      day,
      items: foodItems[day]?.map((item) => item.name) || [],
    })).filter((detail) => detail.items.length > 0);

    setSelectedMenu({
      ...selectedMenu,
      price: totalPrice,
      time: deliveryTime,
      deliveryAddress,
      startDate,
      endDate,
      orderDetails,
      type: "weekly",
    });
  }, [foodItems, selectedDays, deliveryTime, deliveryAddress, startDate, endDate, setSelectedMenu, totalPrice]);

  const handleDaySelect = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    // Clear food items for deselected day
    if (selectedDays.includes(day)) {
      setFoodItems((prev) => {
        const updated = { ...prev };
        delete updated[day];
        return updated;
      });
    }
  };

  const handleFoodSelection = (day, item) => {
    setFoodItems((prev) => {
      const currentItems = prev[day] || [];
      if (currentItems.some((i) => i.name === item.name)) {
        // Remove item if already selected
        return {
          ...prev,
          [day]: currentItems.filter((i) => i.name !== item.name),
        };
      } else {
        // Add item
        return {
          ...prev,
          [day]: [...currentItems, item],
        };
      }
    });
  };

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // Automatically set endDate to 7 days later
    const start = new Date(selectedStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const formattedEndDate = end.toISOString().split("T")[0];
    setEndDate(formattedEndDate);
  };

  const handleSubscribe = () => {
    if (isSubmitting) return;
    if (!deliveryAddress) {
      toast.warning("Please provide a delivery address.");
      return;
    }
    if (!startDate) {
      toast.warning("Please select a start date.");
      return;
    }
    if (selectedDays.length === 0) {
      toast.warning("Please select at least one delivery day.");
      return;
    }
    if (Object.keys(foodItems).length === 0) {
      toast.warning("Please select at least one food item.");
      return;
    }

    setIsSubmitting(true);
    subscribeItems();
  };

  // Reset isSubmitting after subscription attempt
  useEffect(() => {
    if (isSubmitting) {
      const timer = setTimeout(() => setIsSubmitting(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Price</p>
          <p className="text-xl font-semibold text-gray-800">₹{totalPrice}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Meals per Day</p>
          <p className="text-xl font-semibold text-gray-800">3</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Duration</p>
          <p className="text-xl font-semibold text-gray-800">7 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Delivery Days</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <div key={day} className="bg-gray-50 rounded-lg p-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDaySelect(day)}
                    />
                    <span className="text-gray-700">{day}</span>
                  </label>

                  {selectedDays.includes(day) && (
                    <div className="mt-3 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Food Items for {day}</h4>
                      <div className="space-y-1 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                        {menus.map((menu) => (
                          <label key={menu.name} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              checked={foodItems[day]?.some((item) => item.name === menu.name) || false}
                              onChange={() => handleFoodSelection(day, menu)}
                            />
                            <span className="text-gray-700">{menu.name} (₹{menu.price})</span>
                          </label>
                        ))}
                        {menus.length === 0 && (
                          <p className="text-gray-500">No menu items available</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">Delivery Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={deliveryAddress}
                  onChange={handleDeliveryAddressChange}
                  placeholder="Enter delivery address"
                />
              </div>
              <div>
                <label className="text-gray-600">Delivery Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={deliveryTime}
                  onChange={handleDeliveryTimeChange}
                />
              </div>
              <div>
                <label className="text-gray-600">Start Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="text-gray-600">End Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={endDate}
                  disabled
                />
              </div>
            </div>
          </div>

          <button
            className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
              selectedDays.length === 0 || Object.keys(foodItems).length === 0 || !deliveryAddress || !startDate || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSubscribe}
            disabled={selectedDays.length === 0 || Object.keys(foodItems).length === 0 || !deliveryAddress || !startDate || isSubmitting}
          >
            Subscribe Now
          </button>
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 p-4 rounded-lg sticky top-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Selected Days & Items</p>
                <ul className="text-base font-medium text-gray-800">
                  {selectedDays.length > 0 ? (
                    selectedDays.map((day) => (
                      <li key={day}>
                        <span className="font-semibold">{day}:</span>{" "}
                        {foodItems[day]?.length > 0
                          ? foodItems[day].map((item) => `${item.name} (₹${item.price})`).join(", ")
                          : "No items selected"}
                      </li>
                    ))
                  ) : (
                    <li>No days selected</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-base font-medium text-gray-800">
                  {deliveryAddress || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p className="text-base font-medium text-gray-800">
                  {deliveryTime || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="text-base font-medium text-gray-800">
                  {startDate || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="text-base font-medium text-gray-800">
                  {endDate || "Not selected"}
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

export default WeeklyPlan;