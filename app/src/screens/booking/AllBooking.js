import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { getBookingDetails} from '../../redux/booking/action';
import {useDispatch, useSelector} from 'react-redux';

const AllBooking = () => {
  const navigation = useNavigation();
  const [bookingData, setBookingData] = useState([]);
  const dispatch = useDispatch();
  const {booking} = useSelector(state => state.bookingReducer);

  useEffect(() => {
    dispatch(getBookingDetails());
  }, []);
  console.log(booking, 'dataBooking');
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

        {booking?.result?.map(item => (
          <View key={item._id}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  {item.fullName}
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
                    backgroundColor:
                      item.status == 'Pending' ? 'orange' : 'green',
                    width: '55%',
                    height: 32,
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('RoomDetails')}>
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
