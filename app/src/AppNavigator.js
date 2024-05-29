import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import HomePage from './screens/HomePage';
import RoomDetails from './screens/RoomDetails';
import RoomBooking from './screens/RoomBooking';
import MainScreen from './screens/MainScreen';
import AllBooking from './screens/booking/AllBooking';
import {Image, TouchableOpacity, Text, View, Linking} from 'react-native';
import Checkout from './screens/Checkout';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  const phoneNumber = '8210023654'; // Replace with the actual phone number

  const handlCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: true, title: 'Booking Details'}}
        />

        <Stack.Screen
          name="RoomDetails"
          component={RoomDetails}
          options={{
            headerShown: true,
            title: 'Booking Details',
            headerRight: () => (
              <TouchableOpacity style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}} onPress={()=> handlCall()}>
                <Image
                  source={require('../assets/images/telephone-call.png')}
                  style={{height: 30, width: 30,marginRight:10, tintColor:'blue'}}
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
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false, title: 'Book Your Room'}}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true, title: 'Checkout'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
