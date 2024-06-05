import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Booking from './Booking';
import RoomType from './RoomType';
import Home from './Home';
import Profile from './Profile';
import imagePath from '../../assets/images/imagePath';
import AddBooking from '../booking/AddBooking';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator screenOptions={{tabBarShowLabel:false}}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? imagePath.bottomHomeFocus : imagePath.bottomHome
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />
      <Bottom.Screen
        name="Booking"
        component={Booking}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? imagePath.bottomBookingFocus : imagePath.bottomBooking
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />
      <Bottom.Screen
      name="Add Booking"
      component={AddBooking}
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Image
            source={
              focused ? imagePath.bottomAddFocus : imagePath.bottomAdd
            }
            style={{
              width: 24,
              height: 24,
            }}
          />
        ),
        tabBarActiveTintColor: 'black',
      }}
    />
      <Bottom.Screen
        name="Room"
        component={RoomType}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? imagePath.bottomRoomFocus : imagePath.bottomRoom
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? imagePath.bottomProfileFocus : imagePath.bottomProfile
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
