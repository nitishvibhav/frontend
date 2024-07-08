import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/user/action';
import {getUser} from '../../utils';

const Routes = () => {
  const {user} = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        console.log('User data from AsyncStorage:', userData); // Check userData
        if (userData) {
          dispatch(setUser(userData)); // Dispatch action to set user data in Redux store
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user && user.token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
