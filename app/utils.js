import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'lodash';
import {updateToken} from './request';

// Utility to get array from object
const getArr = (obj, ltr) => get(obj, ltr) || [];

// Fetch and parse user data from AsyncStorage
const getUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('result');
    const result = storedUser != null ? JSON.parse(storedUser) : null;
    if (result && result.token) {
      await AsyncStorage.setItem('token', result.token);
      return result;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Get access token from AsyncStorage
const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Update access token by getting the current user token and calling updateToken
const updateAccessToken = async () => {
  try {
    const user = await getUser();
    const token = get(user, 'token');
    if (token) {
      updateToken(token);
    }
  } catch (error) {
    console.error('Error updating access token:', error);
  }
};

// Store user data in AsyncStorage
const setUser = async (data) => {
  try {
    await AsyncStorage.setItem('result', JSON.stringify(data));
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

export {getArr, getAccessToken, getUser, updateAccessToken, setUser};
