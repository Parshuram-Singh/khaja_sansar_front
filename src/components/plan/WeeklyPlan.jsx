import React, { useEffect, useState, useCallback } from "react";
import "./Plan.css";
import useMenus from "../../hooks/useMenus";
import { toast } from "react-toastify";

const WeeklyPlan = ({ setSelectedMenu, selectedMenu, subscribeItems }) => {
  const { menus } = useMenus();
  const [selectedDays, setSelectedDays] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [newMenus, setNewMenus] = useState([]);

  // Load selected products from local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedProducts"));
    if (!data || data.length === 0) {
      toast.warning("Please select the menu items first.");
      return;
    }
    console.log("Loaded menu data:", data);
    setNewMenus(data.map((item) => ({ ...item, price: Number(item.price) })));
  }, [menus]);

  // Handle day selection/deselection
  const handleDaySelect = (rawDay) => {
    const day = rawDay.trim(); // Ensure no extra spaces
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Handle assigning a food item to a selected day
  const handleFoodSelection = useCallback(
    (day, item, itemPrice) => {
      setFoodItems((prev) => {
        const previousItem = prev[day];
        const updated = {
          ...prev,
          [day]: item,
        };

        const previousDetails = previousItem
          ? newMenus.find((menu) => menu.name === previousItem)
          : null;
        const previousPrice = previousDetails
          ? Number(previousDetails.price)
          : 0;
        const newPrice = Number(selectedMenu.price) - previousPrice + itemPrice;

        // Use a useEffect to update the selectedMenu after rendering
        // Use a flag to update only when necessary to avoid multiple updates
        setSelectedMenu((prevSelected) => ({
          ...prevSelected,
          price: newPrice,
          orderDetails: updateOrderDetails(updated),
        }));

        return updated;
      });
    },
    [newMenus, selectedMenu, setSelectedMenu]
  );

  // Remove selected food item from a day
  const removeSelectedItems = useCallback(
    (day, itemToRemove) => {
      setFoodItems((prev) => {
        const updated = { ...prev };
        delete updated[day];

        const itemDetails = newMenus.find((menu) => menu.name === itemToRemove);
        const itemPrice = itemDetails ? Number(itemDetails.price) : 0;

        // Defer the update of selectedMenu to avoid updating during render
        setSelectedMenu((prevSelected) => {
          const newPrice = Math.max(0, Number(prevSelected.price) - itemPrice);
          return {
            ...prevSelected,
            price: newPrice,
            orderDetails: updateOrderDetails(updated),
          };
        });

        return updated;
      });
    },
    [newMenus, setSelectedMenu]
  );

  // Update orderDetails for summary
  const updateOrderDetails = (updatedFoodItems) => {
    return selectedDays.map((day) => ({
      day,
      items: updatedFoodItems[day] ? [updatedFoodItems[day]] : [],
    }));
  };

  // Handle delivery time input
  const handleDeliveryTimeChange = (e) => {
    const time = e.target.value;
    setSelectedMenu((prev) => ({
      ...prev,
      time,
    }));
  };

  return (
    <div className="weekly-plan">
      <h2>Weekly Plan</h2>
      <p>
        <strong>Price:</strong> ₹{selectedMenu.price}
      </p>
      <p>
        <strong>Meals per Day:</strong> 3
      </p>
      <p>
        <strong>Duration:</strong> 7 days
      </p>

      <div className="delivery-settings">
        <div className="delivery-day">
          <h4>Select Delivery Days</h4>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((rawDay) => {
            const day = rawDay.trim();
            return (
              <div key={day}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelect(day)}
                  />
                  {day}
                </label>

                {selectedDays.includes(day) && (
                  <div className="food-items">
                    <h4>Food Item for {day}</h4>
                    <select
                      onChange={(e) => {
                        const selectedItem = e.target.value;
                        const itemDetails = newMenus.find(
                          (menu) => menu.name === selectedItem
                        );
                        const itemPrice = itemDetails
                          ? Number(itemDetails.price)
                          : 0;
                        handleFoodSelection(day, selectedItem, itemPrice);
                      }}
                      value={foodItems[day] || ""}
                    >
                      <option value="" disabled>
                        Select a food item
                      </option>
                      {newMenus.map((menuItem, index) => (
                        <option key={index} value={menuItem.name}>
                          {menuItem.name} (₹{menuItem.price})
                        </option>
                      ))}
                    </select>

                    <div>
                      <strong>Selected item for {day}:</strong>
                      {foodItems[day] ? (
                        <ul>
                          <li
                            onClick={() =>
                              removeSelectedItems(day, foodItems[day])
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {foodItems[day]} (₹
                            {newMenus.find(
                              (menu) => menu.name === foodItems[day]
                            )?.price || 0}
                            ) - Click to remove
                          </li>
                        </ul>
                      ) : (
                        <p>No item selected</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="delivery-time">
          <h4>Select Delivery Time</h4>
          <input
            type="time"
            value={selectedMenu.time || ""}
            onChange={handleDeliveryTimeChange}
          />
        </div>
      </div>

      <button className="subscribe-btn" onClick={subscribeItems}>
        Subscribe
      </button>
    </div>
  );
};

export default WeeklyPlan;
