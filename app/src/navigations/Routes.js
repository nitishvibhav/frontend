import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { getUser } from '../../utils';

const Routes = () => {
  console.log(getUser())
  return (
    <NavigationContainer>
      {getUser ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
