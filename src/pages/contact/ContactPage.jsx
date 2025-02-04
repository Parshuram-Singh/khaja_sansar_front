import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscriptionIssue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '', subscriptionIssue: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">We’re Here to Help You!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Got a question? Need help with your subscription, billing, or delivery? We’re here for you!
        </p>
        <p className="text-sm text-gray-500 mt-2">Choose a category or fill out the form to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Categories Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all duration-300 border-l-4 border-blue-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plans</h2>
            <p className="text-gray-600 mb-4">
              Learn more about our subscription options, pricing in NPR, and features.
            </p>
            <ul className="text-gray-700 mb-4">
              <li>Basic Plan: 500 NPR/month</li>
              <li>Standard Plan: 1,000 NPR/month</li>
              <li>Premium Plan: 2,000 NPR/month</li>
            </ul>
            <a href="#plans" className="text-blue-500 font-semibold hover:text-blue-600">View Plans →</a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all duration-300 border-l-4 border-yellow-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Support</h2>
            <p className="text-gray-600 mb-4">Need help with billing, delivery preferences, or other subscription issues?</p>
            <a href="#support" className="text-yellow-500 font-semibold hover:text-yellow-600">Get Support →</a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all duration-300 border-l-4 border-green-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Issues</h2>
            <p className="text-gray-600 mb-4">Facing issues with delivery? Let us know, and we'll assist you.</p>
            <a href="#delivery-issues" className="text-green-500 font-semibold hover:text-green-600">Contact Delivery Support →</a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all duration-300 border-l-4 border-purple-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Support</h2>
            <p className="text-gray-600 mb-4">Having trouble with our app or website? Our tech team is here to help.</p>
            <a href="#technical-support" className="text-purple-500 font-semibold hover:text-purple-600">Join Our Support Forum →</a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">General Inquiry</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subscriptionIssue" className="block text-gray-700 text-sm font-semibold mb-2">Subscription Issue (Optional)</label>
              <select
                id="subscriptionIssue"
                name="subscriptionIssue"
                value={formData.subscriptionIssue}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an Issue</option>
                <option value="billing">Billing Issue</option>
                <option value="delivery">Delivery Issue</option>
                <option value="plan">Subscription Plan Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
