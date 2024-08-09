import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getByHotelIdBooking,
  getByIdBooking,
  updateBooking,
} from '../../redux/Booking1/action';
import {useNavigation} from '@react-navigation/native';
import {get} from 'lodash';
import {updateRoom} from '../../redux/room/action';

const paymentStatusData = ['PENDING', 'SUCCESS', 'PARTIALLY-PAID'];
const bookingStatusData = [
  'CHECK-IN',
  'CHECKED-OUT',
  'JUST-CHECKED-OUT',
  'PENDING',
  'RESERVED',
];

const UpdateBooking = ({route}) => {
  const {item} = route.params || {};
  const [paymentStatus, setPaymentStatus] = useState(item.paymentStatus);
  const [bookingStatus, setBookingStatus] = useState(item.status);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(item, 'editable item');
  const {user} = useSelector(state => state.loginReducer);

  const handleUpdate = async () => {
    const body = {
      paymentStatus: paymentStatus,
      status: bookingStatus,
    };
    const res = await dispatch(updateBooking(body, item._id));
    console.log(res, 'response');
    const status = get(res, 'value.status');
    if (status === 200) {
      alert(get(res.value.data, 'message', 'Done'));
      await updateRoomStatus();
       dispatch(getByHotelIdBooking(user.result.username));
      navigation.navigate('RoomDetails', {item});
    } else {
      console.log(get(res, 'message', 'Done'));
    }
  };

  const updateRoomStatus = async () => {
    try {
      const roomData = item.rooms.map(item => ({
        roomId: item._id,
        roomData: {
          roomStatus:
            bookingStatus === 'CHECK-IN'
              ? 'BOOKED'
              : bookingStatus === 'CHECKED-OUT'
              ? 'VACANT'
              : bookingStatus,
        },
      }));

      for (const room of roomData) {
        const res = await dispatch(updateRoom(room.roomData, room.roomId));
        if (res.status !== 200) {
          console.log('Failed to update room status for roomId:', room.roomId);
        }
      }
      console.log('Room status updated successfully');
    } catch (error) {
      console.log('Error updating room status:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Booking Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bookingStatus}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Set picker text color
          onValueChange={itemValue => setBookingStatus(itemValue)}>
          {bookingStatusData.map((status, index) => (
            <Picker.Item key={index} label={status} value={status} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Payment Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentStatus}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Set picker text color
          onValueChange={itemValue => setPaymentStatus(itemValue)}>
          {paymentStatusData.map((status, index) => (
            <Picker.Item key={index} label={status} value={status} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    color: '#000000',
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
