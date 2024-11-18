import axios from 'axios';

const API_BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTicketsAndUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
