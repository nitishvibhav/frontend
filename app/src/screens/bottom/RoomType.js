import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import AddRoomBooking from '../room/AvailableBooking'
import AllRoomBooking from '../room/AllRoomBooking'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AvailableBooking from '../room/AvailableBooking';
import ConfirmedBooking from '../room/ConfirmedBooking';

const Tab = createMaterialTopTabNavigator();



const RoomType = () => {
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="All Room" component={AllRoomBooking} />
      <Tab.Screen name="Available Room" component={AvailableBooking} />
      <Tab.Screen name="Confirmed Room" component={ConfirmedBooking} />
    </Tab.Navigator>
  )
}

export default RoomType

const styles = StyleSheet.create({})