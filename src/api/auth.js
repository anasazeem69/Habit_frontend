import axios from 'axios';

const API_URL = 'http://192.168.1.12:5000/v1/auth';

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
}; 


