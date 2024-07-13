import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomsDetails} from '../../redux/rooms/action';
import FacilityBadge from '../../components/FacilityBadge';

const AllRoomBooking = () => {
  const dispatch = useDispatch();
  const {rooms} = useSelector(state => state.roomReducer);

  useEffect(() => {
    dispatch(getRoomsDetails());
  }, [dispatch]);

  useEffect(() => {
    console.log('Rooms Data:', rooms);
    
  }, [rooms]);


  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Room </Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Type</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Status</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={styles.headingtext}>Facilities</Text>
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
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <Text style={{color: 'purple', fontWeight: '800'}}>
                  {item.roomNumber}
                </Text>
              </View>
              <View style={{width: '30%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 12}}>
                  {item.roomCategory}
                </Text>
              </View>
              <View
                style={{
                  width: '25%',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: item.roomStatus === 'VACANT' ? 'orange' : item.roomStatus === 'BOOKED' ? 'red' : 'green',
                    fontWeight: '800',
                    fontSize: 12,
                  }}>
                  {item.roomStatus}
                  {console.log(item.roomStatus)}
                </Text>
              </View>
              <View
                style={{width: '25%', flexDirection: 'row', flexWrap: 'wrap'}}>
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
    fontSize: 13,
  },
});
