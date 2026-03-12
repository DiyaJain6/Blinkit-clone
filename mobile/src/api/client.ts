import axios from 'axios';
import Constants from 'expo-constants';

// Get the computer's IP address automatically for Expo development
const hostUri = Constants.expoConfig?.hostUri;
const ip = hostUri ? hostUri.split(':')[0] : 'localhost';

const BASE_URL = `http://${ip}:5000/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
