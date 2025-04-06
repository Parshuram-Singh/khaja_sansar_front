import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [customerData, setCustomerData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedCustomer = localStorage.getItem('user');
    if (storedCustomer) {
      setCustomerData(JSON.parse(storedCustomer));
    }

    const sampleOrderHistory = [
      { id: "ORD001", date: "2025-03-10", items: "Pizza, Coke", total: 15.99, status: "Delivered" },
      { id: "ORD002", date: "2025-03-15", items: "Burger, Fries", total: 12.50, status: "Delivered" },
    ];
    setOrderHistory(sampleOrderHistory);

    const sampleSubscription = {
      plan: "Premium Monthly",
      status: "Active",
      startDate: "2025-03-08",
      endDate: "2025-04-08",
      benefits: ["Free Delivery", "10% Discount on Orders"],
    };
    setSubscription(sampleSubscription);
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setCustomerData(updatedData);
    localStorage.setItem('user', JSON.stringify(updatedData)); // Changed key to 'user' to match retrieval
  };

  const startEditing = () => {
    setIsEditing(true);
    setFormData({ ...customerData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    handleUpdateProfile(formData);
    setIsEditing(false);
  };

  if (!customerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">No profile data available in localStorage.</p>
      </div>
    );
  }

  const { role } = customerData; // Assuming role is part of customerData

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Settings Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {role === 'admin' ? 'Admin Dashboard' : role === 'restaurant' ? 'Restaurant Profile' : 'Customer Profile'}
          </h1>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              {role === 'restaurant' && (
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              )}
              <div className="md:col-span-2 flex justify-center gap-4 mt-4">
                <button
                  onClick={saveChanges}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="p-3 bg-gray-100 rounded-lg">{customerData.fullname || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="p-3 bg-gray-100 rounded-lg">{customerData.username || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="p-3 bg-gray-100 rounded-lg">{customerData.email || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="p-3 bg-gray-100 rounded-lg">{customerData.phone || 'N/A'}</p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="p-3 bg-gray-100 rounded-lg">{customerData.address || 'N/A'}</p>
              </div>
              {role === 'restaurant' && (
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                  <p className="p-3 bg-gray-100 rounded-lg">{customerData.restaurantName || 'N/A'}</p>
                </div>
              )}
              {customerData.createdAt && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Account Created</label>
                  <p className="p-3 bg-gray-100 rounded-lg">{new Date(customerData.createdAt).toLocaleDateString()}</p>
                </div>
              )}
              {customerData.isVerified !== undefined && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                  <p className={`p-3 bg-gray-100 rounded-lg ${customerData.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {customerData.isVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="p-3 bg-gray-100 rounded-lg capitalize">{role || 'N/A'}</p>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className="mt-6 text-center">
              <button
                onClick={startEditing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          )}
        </section>

        {/* Order History Section (Customer and Restaurant Only) */}
        {(role === 'customer' || role === 'restaurant') && (
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            {orderHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-200 text-gray-800 uppercase">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total ($)</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.items}</td>
                        <td className="p-3">{order.total}</td>
                        <td className={`p-3 ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No order history available.</p>
            )}
          </section>
        )}

        {/* Subscription Details Section (Customer Only) */}
        {role === 'customer' && (
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscription Details</h2>
            {subscription ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Plan</label>
                  <p className="p-3 bg-gray-100 rounded-lg">{subscription.plan}</p>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className={`p-3 bg-gray-100 rounded-lg font-semibold ${subscription.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {subscription.status}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <p className="p-3 bg-gray-100 rounded-lg">{subscription.startDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <p className="p-3 bg-gray-100 rounded-lg">{subscription.endDate}</p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Benefits</label>
                  <ul className="p-3 bg-gray-100 rounded-lg list-disc list-inside">
                    {subscription.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No subscription found.</p>
            )}
          </section>
        )}

        {/* Admin Dashboard Section */}
        {role === 'admin' && (
          <section className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Total Users</label>
                <p className="p-3 bg-gray-100 rounded-lg">Coming Soon</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Total Restaurants</label>
                <p className="p-3 bg-gray-100 rounded-lg">Coming Soon</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Pending Orders</label>
                <p className="p-3 bg-gray-100 rounded-lg">Coming Soon</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">System Status</label>
                <p className="p-3 bg-gray-100 rounded-lg text-green-600">Operational</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;