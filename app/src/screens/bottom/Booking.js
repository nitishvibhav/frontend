import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBookingDetails,
  deleteBookingDetails,
} from '../../redux/booking/action';
import CustomDataTable from '../../components/CustomDataTable';

const Booking = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {booking} = useSelector(state => state.bookingReducer);

  useEffect(() => {
    dispatch(getBookingDetails());
  }, [dispatch]);

  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    if (booking.result) {
      setBookingData(booking.result);
    }
  }, [booking]);

  const bookingColumns = [
    {label: 'Customer', field: 'fullName', numeric: false},
    {label: 'Status', field: 'status', numeric: false},
    {label: 'Check-in', field: 'checkIn', numeric: false},
    {label: 'Check-out', field: 'checkOut', numeric: false},
  ];

  const handleEdit = () => {};

  const handleRowPress = row => {
    navigation.navigate('RoomDetails', {item: row});
  };

  const handleDelete = (row, rowIndex) => {
    dispatch(deleteBookingDetails(row._id));
    Alert.alert("data has been deleted succesfully")
    dispatch(getBookingDetails());
  };

  const getCellStyle = (field, value, row) => {
    if (field === 'status') {
      return {
        color:
          value === 'CHECK-IN'
            ? 'green'
            : value === 'PENDING'
            ? 'orange'
            : 'red',
      };
    }
    return {};
  };

  return (
    <ScrollView>
      <CustomDataTable
        columns={bookingColumns}
        data={bookingData}
        title="Booking Data"
        onRowPress={handleRowPress}
        onEdit={handleEdit}
        onDelete={(row, rowIndex) => handleDelete(row, rowIndex)}
        getCellStyle={getCellStyle}
      />
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  topContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerText: {
    width: '25%',
    alignItems: 'flex-start',
    color: 'black',
    fontWeight: '800',
    fontSize: 13,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 12,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 15,
  },
});
