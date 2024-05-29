import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Booking from './Booking';
import RoomType from './RoomType';
import Home from './Home';
import Profile from './Profile';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../../../assets/images/dashboard.png')
                  : require('../../../assets/images/dashboard1.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          tabBarActiveTintColor:'black'
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
                focused
                  ? require('../../../assets/images/calendar1.png')
                  : require('../../../assets/images/calendaroutline.png')
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          tabBarActiveTintColor:'black'
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
                focused
                  ? require('../../../assets/images/bedfill.png')
                  : require('../../../assets/images/bed.png')
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          tabBarActiveTintColor:'black'
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
                focused
                  ? require('../../../assets/images/profile-user.png')
                  : require('../../../assets/images/user.png')
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          tabBarActiveTintColor:'black'
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
