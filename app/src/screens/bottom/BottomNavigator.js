import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Booking from './Booking';
import RoomType from './RoomType';
import Home from './Home';
import Profile from './Profile';
import imagePath from '../../assets/images/imagePath';
import {useNavigation} from '@react-navigation/native';
import BookingStepOne from '../stepper/BookingStepOne';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const navigation = useNavigation();
  return (
    <Bottom.Navigator >
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
        name="stepone"
        component={BookingStepOne}
        options={{
          headerShown: true,
          title: "Booking Info",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={imagePath.backButton} 
                style={{width: 20, height: 20, marginLeft: 16}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? imagePath.bottomAddFocus : imagePath.bottomAdd}
              style={{width: 24, height: 24}}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />
      <Bottom.Screen
        name="RoomType"
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
