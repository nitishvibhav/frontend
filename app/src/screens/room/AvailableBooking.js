import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AvailableBooking = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      roomtype: 'Double',
      roomno: 102,
      rent: '$1200',
      status: 'Available',
    },
    {
      id: '2',
      roomtype: 'Single',
      roomno: 103,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '3',
      roomtype: 'Deluxe',
      roomno: 304,
      rent: '$1500',
      status: 'Booked',
    },
    {
      id: '4',
      roomtype: 'Double',
      roomno: 202,
      rent: '$1200',
      status: 'Available',
    },
    {
      id: '5',
      roomtype: 'Single',
      roomno: 203,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '6',
      roomtype: 'Deluxe',
      roomno: 404,
      rent: '$1500',
      status: 'Booked',
    },
    {
      id: '7',
      roomtype: 'Double',
      roomno: 102,
      rent: '$1200',
      status: 'Available',
    },
    {
      id: '8',
      roomtype: 'Single',
      roomno: 103,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '9',
      roomtype: 'Deluxe',
      roomno: 304,
      rent: '$1500',
      status: 'Booked',
    },
    {
      id: '10',
      roomtype: 'Double',
      roomno: 202,
      rent: '$1200',
      status: 'Available',
    },
    {
      id: '11',
      roomtype: 'Single',
      roomno: 203,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '12',
      roomtype: 'Deluxe',
      roomno: 404,
      rent: '$1500',
      status: 'Booked',
    },
    {
      id: '13',
      roomtype: 'Single',
      roomno: 203,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '14',
      roomtype: 'Deluxe',
      roomno: 404,
      rent: '$1500',
      status: 'Booked',
    },
    {
      id: '15',
      roomtype: 'Single',
      roomno: 203,
      rent: '$1000',
      status: 'Available',
    },
    {
      id: '16',
      roomtype: 'Deluxe',
      roomno: 404,
      rent: '$1500',
      status: 'Booked',
    },
  ];

  const bookedRooms = data.filter(item => item.status === 'Available');
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

          <View style={{width: '20%', alignItems: 'center'}}>
            <Text style={styles.headingtext}>Details</Text>
          </View>
        </View>
        <View style={styles.line} />
        {bookedRooms.map(item => (
          <View key={item.id}>
            <View style={{flexDirection: 'row', alignItems: 'center',paddingVertical:4}}>
              <View style={{width: '15%', alignItems: 'flex-start'}}>
                <Text style={{color: 'purple', fontWeight: '800'}}>
                  {item.roomno}
                </Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.roomtype}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: 'orange',
                    fontWeight: '800',
                  }}>
                  {item.status}
                </Text>
              </View>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.rent}
                </Text>
              </View>

              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  borderRadius: 6,
                  
                }}>
                <TouchableOpacity
                style={{backgroundColor:'orange', width:'70%', height:32, borderRadius:3, alignItems:'center', justifyContent:'center'}}
                  onPress={() => navigation.navigate('Add Booking')}>
                  <Image
                    source={require('../../../assets/images/add-group.png')}
                    style={{height: 16, width: 16, tintColor:'white',}}
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
