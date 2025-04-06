// services/profileService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/users'; // Adjust to your actual API URL

// Fetch current user's profile (assuming an endpoint like /profile or /:id)
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add auth token if required
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response || error.message);
    throw error;
  }
};


// Update user profile
export const updateUserProfile = async (userId, updatedData) => {
  try {
    console.log('Sending updated user data:', updatedData);
    const response = await axios.put(`${API_BASE_URL}/update/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add auth token if required
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response || error.message);
    throw error;
  }
};