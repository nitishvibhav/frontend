import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = {
  // base: "http://localhost:3001/api/v1/en/",
  // base: "http://97.74.86.231:3001/api/v1/en/",
  base : "http://192.168.1.4:3001/api/v1/en/"
};


const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

const getHeaders = async (isFormData = false) => {
  const token = await getAccessToken();
  return {
    "Content-Type": isFormData ? "multipart/form-data" : "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    'Authorization': token,
  };
};

const getConfig = async (header = {}, isFormData = false) => {
  const headers = await getHeaders(isFormData);
  return {
    headers: {
      ...headers,
      ...header,
    },
  };
};

const request = {
  get: async (path, header = {}) => axios.get(url.base + path, await getConfig(header)),
  delete: async (path, header = {}) => axios.delete(url.base + path, await getConfig(header)),
  post: async (path, data, header = {}) => axios.post(url.base + path, data, await getConfig(header)),
  patch: async (path, data, header = {}) => axios.patch(url.base + path, data, await getConfig(header)),
  put: async (path, data, header = {}) => axios.put(url.base + path, data, await getConfig(header)),
  putFormData: async (path, data) => axios.put(url.base + path, data, await getConfig({}, true)),
  postFormData: async (path, data) => axios.post(url.base + path, data, await getConfig({}, true)),
};

export { request, getAccessToken };
