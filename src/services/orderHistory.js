import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/myProfile";

export const fetchOrderHistory = async () => {
  try {
    // Retrieve the token (e.g., from localStorage, Redux, or a login API)
    const token = localStorage.getItem("authToken"); // Adjust based on how you store the token

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_BASE_URL}/order-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error.response?.data || error.message);
    throw error;
  }
};