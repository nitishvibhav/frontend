import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RoomCard = () => {
  return (
    <View style={{width:'50%',padding:10, backgroundColor:'green', margin:10}}>
      <Text style={{color:'white'}}>Room No. 101</Text>
      <Text style={{color:'white'}}>Deluxe</Text>
      <Text style={{color:'white'}}>Status: Booked</Text>
      <Text style={{color:'white'}}>Rent :32$</Text>
    </View>
  )
}

export default RoomCard

const styles = StyleSheet.create({})