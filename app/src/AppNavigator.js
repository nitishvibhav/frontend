import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import RoomDetails from './screens/RoomDetails';
import RoomBooking from './screens/RoomBooking';
import MainScreen from './screens/MainScreen';
import AllBooking from './screens/booking/AllBooking';
import {Image, TouchableOpacity, Linking} from 'react-native';
import Checkout from './screens/Checkout';
import {getUser} from '../utils';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppNavigator = () => {
  const phoneNumber = '8210023654'; // Replace with the actual phone number
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
    console.log("user info",getUser)
  };

  const MainStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown: false, title: 'Book Your Room'}}
      />
     
      <Stack.Screen
        name="RoomDetails"
        component={RoomDetails}
        options={{
          headerShown: true,
          title: 'Booking Details',
          headerRight: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleCall}>
              <Image
                source={require('../assets/images/telephone-call.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 10,
                  tintColor: 'blue',
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RoomBooking"
        component={RoomBooking}
        options={{headerShown: true, title: 'Book Your Room'}}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: true, title: 'Checkout'}}
      />
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {getUser ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
