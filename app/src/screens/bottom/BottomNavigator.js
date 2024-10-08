import {TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Booking from './Booking';
import Payment from './Payment';
import Home from './Home';
import Profile from './Profile';
import imagePath from '../../assets/images/imagePath';
import {useNavigation} from '@react-navigation/native';
import BookingStepOne from '../stepper/BookingStepOne';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const navigation = useNavigation();
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
          headerShown: true,
          title:"Booking Details",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={imagePath.backButton}
                style={{width: 18, height: 18, marginLeft: 16}}
              />
            </TouchableOpacity>
          ),
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
          title: 'Booking Info',
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
        name="Payment"
        component={Payment}
        options={{
          title: 'Payment',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={imagePath.backButton}
                style={{width: 18, height: 18, marginLeft: 16}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ledgerbill")}
              style={{
                marginRight: 16,
                backgroundColor: 'gray',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
              }}>
              <Text style={{color:'white'}}>+ Add</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? imagePath.bottomRoomFocus : imagePath.bottomRoom
              }
              style={{
                width: 24,
                height: 24,
                tintColor: 'orange',
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
