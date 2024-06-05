import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddBooking from '../booking/AddBooking';
import AllBooking from '../booking/AllBooking';


const Tab = createMaterialTopTabNavigator();

const Booking = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name="All Booking" component={AllBooking} />
      <Tab.Screen name="Add Booking" component={AddBooking} />
    </Tab.Navigator>
  );
};

export default Booking;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
});
