import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null); // Message state
  const [isError, setIsError] = useState(false); // Error state for styling
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset message before login attempt
    setIsError(false);
    
    try {
      const data = await loginUser(formData);
      console.log("Login successful:", data);
      localStorage.setItem("authToken", data.token);
      setMessage("Login successful! Redirecting...");
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in local storage
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page
      }, 1500); // Delay to show the success message
    } catch (error) {
      console.error("Login failed:", error.message);
      setMessage("Login failed. Please check your credentials.");
      setIsError(true);
    }
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Sign in to your account
        </h2>

        {/* Display success/error message */}
        {message && (
          <div className={`text-center p-3 mb-4 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input 
                id="email"
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to our platform?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={goToRegisterPage} 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
