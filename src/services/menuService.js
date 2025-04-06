import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/menus';

// Fetch all menus
export const getMenus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);  
        return response.data.menus;  // Returning the menus data
    } catch (error) {
        console.error('Error fetching menus:', error);  // Error logging
        throw new Error(error.response ? error.response.data.message : 'Error fetching menus');  // Throwing custom error
    }
};

// Create a new menu
export const createMenu = async (menuData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, menuData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Returning the created menu data
    } catch (error) {
      console.error('Error creating menu:', error);
      throw new Error(error.response ? error.response.data.message : 'Error creating menu');
    }
  };
  

// Delete a menu item
export const deleteMenu = async (menuId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${menuId}`);
        return response.data;  // Returning the deletion success message
    } catch (error) {
        console.error('Error deleting menu:', error);  // Error logging
        throw new Error(error.response ? error.response.data.message : 'Error deleting menu');  // Throwing custom error
    }
};

// Update an existing menu
export const updateMenu = async (menuId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${menuId}`, updatedData);
        return response.data;  // Returning the updated menu data
    } catch (error) {
        console.error('Error updating menu:', error);  // Error logging
        throw new Error(error.response ? error.response.data.message : 'Error updating menu');  // Throwing custom error
    }
};
