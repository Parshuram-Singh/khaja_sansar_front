//services/paymentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/payment';

export const initiatePayment = async (paymentData) => {
  try {
    console.log('Initiating payment with data:', paymentData);
    const response = await axios.post(`${API_BASE_URL}/initiate-payment`, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the full response (e.g., { success, paymentUrl, pidx })
  } catch (error) {
    console.error('Error initiating payment:', error.response || error.message);
    throw error; // Let the caller handle the error
  }
};

export const verifyPayment = async (pidx) => {
  try {
    console.log('Verifying payment with pidx:', pidx);
    const response = await axios.post(
      `${API_BASE_URL}/verify-payment`,
      { pidx },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Return the full response (e.g., { success, data, status })
  } catch (error) {
    console.error('Error verifying payment:', error.response || error.message);
    throw error; // Let the caller handle the error
  }
};

export const updateSubscriptionPayment = async (subscriptionId, paymentDetails) => {
  try {
    console.log('Updating subscription with payment details:', { subscriptionId, paymentDetails });
    const response = await axios.patch(
      `http://localhost:3000/api/subscriptions/${subscriptionId}/payment`,
      paymentDetails,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Return the updated subscription data
  } catch (error) {
    console.error('Error updating subscription payment:', error.response || error.message);
    throw error; // Let the caller handle the error
  }
};