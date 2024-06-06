import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = {
  base: 'http://97.74.86.231:3001/api/v1/en/',
};

const accessToken = AsyncStorage.getItem("token")

const headers = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${accessToken}`,
    
  },
};

const axiosFormDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${accessToken}`,
  },
};

const updateToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    headers.headers.Authorization = `Bearer ${token}`;
    headers.headers.token = token;
    axiosFormDataConfig.headers.Authorization = `Bearer ${token}`;
    axiosFormDataConfig.headers.token = token;
    console.log(token, 'Updated token in headers');
  } catch (error) {
    console.error('Error updating token:', error);
  }
};

// Call updateToken initially to set headers
updateToken();

function getConfig(header = {}) {
  // To add custom header for some requests
  const config = {...headers};
  config.headers = {...config.headers, ...header};
  console.log(config.headers, 'headers under the function');
  return config;
}

const request = {
  get: async (path, header = {}) =>
    axios.get(url.base + path, getConfig(header)),
  delete: async (path, header = {}) =>
    axios.delete(url.base + path, getConfig(header)),
  post: async (path, data, header = {}) =>
    axios.post(url.base + path, data, getConfig(header)),
  put: async (path, data, header = {}) =>
    axios.put(url.base + path, data, getConfig(header)),
  patch: async (path, data, header = {}) =>
    axios.patch(url.base + path, data, getConfig(header)),
  putFormData: async (path, data) =>
    axios.put(url.base + path, data, axiosFormDataConfig),
};

export {request, updateToken, getConfig};
