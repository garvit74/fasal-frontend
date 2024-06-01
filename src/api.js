import axios from "axios";

const API_BASE_URL = "https://yourapi.com";

export const signUpUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
    });
    // Assume the token is in the response data and named 'token'
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    console.error("Error during sign up:", error.response || error.message);
    throw error; // Rethrow to handle it in the calling component
  }
};

export const signInUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, {
      email,
      password,
    });
    // Assume the token is in the response data and named 'token'
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  } catch (error) {
    console.error("Error during sign in:", error.response || error.message);
    throw error; // Rethrow to handle it in the calling component
  }
};
