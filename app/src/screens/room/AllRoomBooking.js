import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';

import {getRooms} from '../../redux/rooms/action';

const AllRoomBooking = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {roomsState, rooms} = useSelector(state => state.roomReducer);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  console.log(rooms, 'rooms data');

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Room </Text>
          </View>
          <View style={{width: '20%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Type</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Status</Text>
          </View>
          <View style={{width: '20%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Rent</Text>
          </View>

          <View style={{width: '20%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Details</Text>
          </View>
        </View>
        <View style={styles.line} />
        {rooms?.result?.map(item => (
          <View key={item._id}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <View style={{width: '15%', alignItems: 'flex-start'}}>
                <Text style={{color: 'purple', fontWeight: '800'}}>
                  {item.roomNumber}
                </Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.roomCategory}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: item.roomStatus == 'Vacant' ? 'orange' : 'green',
                    fontWeight: '800',
                  }}>
                  {item.roomStatus}
                </Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.description}
                </Text>
              </View>

              <View
                style={{
                  width: '20%',
                  alignItems: 'flex-start',
                  borderRadius: 6,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      item.roomStatus == 'Vacant' ? 'orange' : 'green',
                    width: '70%',
                    height: 32,
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    item.roomStatus == 'Vacant'
                      ? navigation.navigate('Booking', {screen: 'Add booking'})
                      : navigation.navigate('RoomDetails')
                  }>
                  <Image
                    source={
                      item.roomStatus == 'Vacant'
                        ? require('../../../assets/images/add-group.png')
                        : require('../../../assets/images/view.png')
                    }
                    style={{height: 16, width: 16, tintColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.line} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllRoomBooking;

const styles = StyleSheet.create({
  topContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingBottom: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
  },
  headingtext: {
    color: 'black',
    fontWeight: '800',
  },
});
