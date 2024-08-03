import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByHotelIdBooking } from '../../redux/Booking1/action';
import { useNavigation } from '@react-navigation/native';

const Booking = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.loginReducer);
  const [ledgerData, setLedgerData] = useState([]);

  useEffect(() => {
    const fetchLedgerData = async () => {
      const response = await dispatch(getByHotelIdBooking(user.result.username));
      if (response.value && response.value.data && response.value.data.result) {
        const upcomingBookings = filterUpcomingBookings(response.value.data.result);
        setLedgerData(upcomingBookings);
      }
    };

    fetchLedgerData();
  }, [dispatch, user.result.username]);

  const filterUpcomingBookings = (bookings) => {
    const today = new Date();
    return bookings.filter((booking) => {
      const checkOutDate = new Date(booking.checkOut);
      return checkOutDate > today;
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'check-in':
        return { color: 'green' };
      case 'reserved':
        return { color: 'orange' };
      case 'pending':
        return { color: 'red' };
      default:
        return { color: 'black' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Full Name</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Check-In</Text>
        <Text style={styles.headerText}>Check-Out</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ledgerData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('RoomDetails', { item })}
          >
            <View style={styles.row}>
              <Text style={styles.methodText}>{item.fullName}</Text>
              <View style={styles.amountContainer}>
                <Text style={[styles.amountText, getStatusColor(item.status)]}>
                  {item.status}
                </Text>
              </View>
              <Text style={styles.dateText}>{item.checkIn}</Text>
              <Text style={styles.dateText}>{item.checkOut}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 11, // Changed size to 11
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  methodText: {
    flex: 1,
    color: 'purple',
    fontWeight: '500',
    fontSize: 11, // Changed size to 11
    textAlign: 'left',
    marginLeft: 5,
  },
  amountContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light cyan background
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  amountText: {
    fontWeight: '600',
    fontSize: 11, // Changed size to 11
  },
  dateText: {
    flex: 1,
    color: 'black',
    fontWeight: '600',
    fontSize: 10, // Changed size to 11
    textAlign: 'center',
    marginRight: 5,
  },
});
