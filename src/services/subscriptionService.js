import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/subscriptions';

export const getAllSubscriptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error.response || error.message);
    throw error; // Let the caller handle the error
  }
};

export const createSubscription = async (newSubscription) => {
  try {
    console.log('Sending subscription data:', newSubscription);
    const response = await axios.post(`${API_BASE_URL}/subscribe`, newSubscription);
    return response.data; // Return the full response data
  } catch (error) {
    console.error('Error creating subscription:', error.response || error.message);
    throw error; // Let the caller handle the error
  }
};




