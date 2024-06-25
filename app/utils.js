
import { updateToken } from "./request";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetch and parse user data from AsyncStorage
const getUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
 console.log(getUser(), "getUser under utills")

 const logUser = async () => {
  const user = await getUser();
  console.log(user, "getUser under utils");
};

logUser();
// Fetch access token from AsyncStorage
const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Update access token in request headers
const updateAccessToken = async () => {
  try {
    const token = await getAccessToken();
    if (token) {
      updateToken(token);
    }
  } catch (error) {
    console.error('Error updating access token:', error);
  }
};

// Store user data in AsyncStorage as JSON string
const setUser = async (data) => {
  try {
    const userData = JSON.stringify(data);
    await AsyncStorage.setItem("user", userData);
    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
    }
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

export {
  getAccessToken,
  getUser,
  updateAccessToken,
  setUser,
  logUser
};
