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
import {useDispatch, useSelector} from 'react-redux';
import { getRoomsDetails} from '../../redux/rooms/action';
import FacilityBadge from '../../components/FacilityBadge';


const AvailableBooking = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {rooms} = useSelector(state => state.roomReducer);
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    dispatch(getRoomsDetails());
  }, [dispatch]);

  useEffect(() => {
    if (rooms && rooms.result) {
      const filteredRooms = rooms.result.filter(
        room => room.roomStatus === 'BOOKED' 
      );
      setBookedRooms(filteredRooms);
    }
  }, [rooms]);

  console.log(bookedRooms, 'booked rooms data');
  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Room </Text>
          </View>
          <View style={{width: '35%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Type</Text>
          </View>
          <View style={{width: '40%', alignItems: 'center'}}>
            <Text style={styles.headingtext}>Facilities</Text>
          </View>
        </View>
        <View style={styles.line} />
        {bookedRooms.map(item => (
          <View key={item._id}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text style={{color: 'purple', fontWeight: '800'}}>
                  {item.roomNumber}
                </Text>
              </View>
              <View style={{width: '35%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500',fontSize:12}}>
                  {item.roomCategory}
                </Text>
              </View>
              <View style={{width: '40%', flexDirection: 'row', flexWrap: 'wrap', alignSelf:'flex-end', alignItems:'flex-end'}}>
                {item.facilities.map(facility => (
                  <FacilityBadge key={facility} facility={facility} />
                ))}
              </View>
            </View>
            <View style={styles.line} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AvailableBooking;

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
