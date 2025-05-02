import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchBlogDataFromAPI() {
  try {
    const response = await axios.get(`${API_URL}/api/blog/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}