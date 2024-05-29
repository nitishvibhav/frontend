import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AllBooking = () => {

  const navigation = useNavigation()
  const data = [
    {
      id: '1',
      name: 'Abhishek Aryan',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Pending',
    },
    {
      id: '2',
      name: 'Sameer Chaudhary',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Booked',
    },
    {
      id: '3',
      name: 'Bibek Kundu',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Booked',
    },
    {
      id: '4',
      name: 'Sounak Kumar',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Booked',
    },
    {
      id: '5',
      name: 'Jane',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Pending',
    },
    {
      id: '6',
      name: 'Doe',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Booked',
    },
    {
      id: '7',
      name: 'John',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Pending',
    },
    {
      id: '8',
      name: 'Abhishek Aryan',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Pending',
    },
    {
      id: '9',
      name: 'Sameer Chaudhary',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Booked',
    },
    {
      id: '10',
      name: 'Bibek Kundu',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Booked',
    },
    {
      id: '11',
      name: 'Sounak Kumar',
      date: '12-04-2024',
      payment: 'Paid',
      status: 'Booked',
    },
    {
      id: '12',
      name: 'Jane',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Pending',
    },
    {
      id: '13',
      name: 'Doe',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Booked',
    },
    {
      id: '14',
      name: 'John',
      date: '12-04-2024',
      payment: 'Due',
      status: 'Pending',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.topContainer2}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Customer</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Booking Status
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Arrived Date
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Details</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />

        {data.map(item => (
          <View key={item.id}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical:4}}>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.name}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: item.status == 'Pending' ? 'orange' : 'green',
                    fontWeight: '800',
                  }}>
                  {item.status}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.date}
                </Text>
              </View>

              <View style={{width: '25%', alignItems: 'center'}}>
              <TouchableOpacity
              style={{
                backgroundColor: item.status=="Pending"? 'orange':'green',
                width: '55%',
                height: 32,
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('RoomDetails')
              }>
              <Image
                source={
                  item.status == 'Pending'
                    ? require('../../../assets/images/view.png')
                    : require('../../../assets/images/view.png')
                }
                style={{height: 16, width: 16, tintColor: 'white'}}
              />
            </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                marginVertical: 5,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllBooking;

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
  },
  topContainer2: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingBottom: 20,
  },
});
