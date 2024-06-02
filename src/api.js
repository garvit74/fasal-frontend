import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const signUpUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
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
    const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, {
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


export const addMovieToList = async (movie, listId, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/lists/${listId}/add-movie`, movie, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding movie to list:", error.response || error.message);
    throw error;
  }
};


export const createList = async (listData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/lists`, listData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new list:", error.response || error.message);
    throw error;
  }
};


export const getallLists = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/lists/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching list details:", error.response || error.message);
    throw error;
  }
};


export const getListdetails = async (listId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/lists/${listId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching list details:", error.response || error.message);
    throw error;
  }
};



export const toggleListPublic = async (listId, isPublic, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/lists/${listId}/public`, {
      isPublic
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating list public status:", error.response || error.message);
    throw error;
  }
};


export const deleteList = async (listId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/lists/${listId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting list:", error.response || error.message);
    throw error;
  }
};



