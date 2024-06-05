import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  // TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../../components/CustomButton';
import {Picker} from '@react-native-picker/picker';
// import DocumentPicker from 'react-native-document-picker';
// import CalendarComponent from '../components/CalendarComponent';
// import CalendarComponent1 from '../components/CalendarComponent1';
// import PriceBreakupCard from '../components/PriceBreakupCard';
import {useDispatch, useSelector} from 'react-redux';
import {getRooms} from '../../redux/rooms/action';
import {getBookingDetails, postBooking} from '../../redux/booking/action';

const AddBooking = () => {
  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState('');
  const [aminities, setAminities] = useState('');
  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomMap, setRoomMap] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [amenities, setAmenities] = useState([]);

  const [booking, setBooking] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    hotelId: '6659ab4982a8de3410433661',
    roomId: selectedValue,
    checkIn: '',
    checkOut: '',
    totalPrice: '',
    extraCharges: '',
    grandTotal: '',
    chargesRemark: '',
    status: '',
    paymentStatus: '',
    aminities: [],
    discount: '',
  });

  const [address, setAddress] = useState({
    province: '',
    district: '',
    city: '',
    street: '',
  });

  const [numberOfGuest, setnumberOfGuest] = useState({
    adult: '',
    child: '',
    total: '',
  });

  const handleChange = (name, value) => {
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleAddressDetails = (name, value) => {
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleGuestNumber = (name, value) => {
    setnumberOfGuest({
      ...numberOfGuest,
      [name]: value,
    });
  };

  console.log(booking, address, numberOfGuest, 'booking');

  const {rooms} = useSelector(state => state.roomReducer);
  const {roomCategory} = useSelector(state => state.roomCategoryReducer);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms && rooms.result) {
      const filteredRooms = rooms.result.filter(
        room => room.roomStatus === 'Vacant',
      );
      setBookedRooms(filteredRooms);

      const roomMapping = {};
      filteredRooms.forEach(room => {
        roomMapping[room.roomNumber] = room._id;
      });
      setRoomMap(roomMapping);
    }
  }, [rooms]);

  console.log(bookedRooms, 'booked rooms data');

  const handleBooking = async () => {
    const roomID = roomMap[selectedRoom]; // Get the room ID from room number

    const updatedBooking = {
      ...booking,
      roomId: roomID,
      amenities: amenities, // Include amenities here
    };

    const req = {
      booking: updatedBooking,
      address,
      numberOfGuest,
    };
    console.log(req, 'console inside the function');
    try {
      const res = await dispatch(postBooking(req)); // Dispatch the postBooking action with bookingData
      if (res && res.value && res.value.status === 200) {
        // Show alert for successful booking
        alert('Booking successful');
        // dispatch(getRooms())
         dispatch(getBookingDetails());
      } else {
        // Show alert for any other error
        alert('Failed to book room. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while booking:', error);
      // Show alert for any unexpected error
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  // const pickFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     setSelectedFile(res);
  //     setSelectedFile2(res);
  //     console.log('Selected File:', res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the picker');
  //     } else {
  //       console.log('Error picking file:', err);
  //     }
  //   }
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.labelview}>
          <Text style={styles.label}>Full Name</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={booking.fullName}
          onChangeText={value => handleChange('fullName', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Amenities</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Amenities"
          placeholderTextColor="gray"
          value={aminities}
          onChangeText={value => setAminities(value)}
        />
        <Button
          title="Add Amenity"
          onPress={() => {
            setAmenities([...amenities, aminities]);
            setAminities('');
          }}
        />
        <View>
          {amenities.map((amenity, index) => (
            <Text key={index}>{amenity}</Text>
          ))}
        </View>
        <View style={styles.labelview}>
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          placeholderTextColor="gray"
          value={booking.email}
          onChangeText={value => handleChange('email', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Phone No.</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Mobile No."
          placeholderTextColor="gray"
          value={booking.phoneNumber}
          onChangeText={value => handleChange('phoneNumber', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Nationality</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Nationality"
          placeholderTextColor="gray"
          value={booking.nationality}
          onChangeText={value => handleChange('nationality', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Total Price</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Total price"
          placeholderTextColor="gray"
          value={booking.totalPrice}
          onChangeText={value => handleChange('totalPrice', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Extra Charges</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Extra Charges"
          placeholderTextColor="gray"
          value={booking.extraCharges}
          onChangeText={value => handleChange('extraCharges', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Grand Total</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Grand Total"
          placeholderTextColor="gray"
          value={booking.grandTotal}
          onChangeText={value => handleChange('grandTotal', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Charges Remark</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Charges Remark"
          placeholderTextColor="gray"
          value={booking.chargesRemark}
          onChangeText={value => handleChange('chargesRemark', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Booking Status</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Booking Status"
          placeholderTextColor="gray"
          value={booking.status}
          onChangeText={value => handleChange('status', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Payment Status</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Payment Status"
          placeholderTextColor="gray"
          value={booking.paymentStatus}
          onChangeText={value => handleChange('paymentStatus', value)}
        />

        <View style={styles.labelview}>
          <Text style={styles.label}>Discount</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Discount"
          placeholderTextColor="gray"
          value={booking.discount}
          onChangeText={value => handleChange('discount', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Check-in Date</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Check-in Date"
          placeholderTextColor="gray"
          value={booking.checkIn}
          onChangeText={value => handleChange('checkIn', value)}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Check-out Date</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Check-out Date"
          placeholderTextColor="gray"
          value={booking.checkOut}
          onChangeText={value => handleChange('checkOut', value)}
        />

        <View style={styles.labelview}>
          <Text style={styles.label}>Number of Guests</Text>
        </View>

        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Adult</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="Adult"
              placeholderTextColor="gray"
              value={numberOfGuest.adult}
              onChangeText={value => handleGuestNumber('adult', value)}
            />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Child</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="Child"
              placeholderTextColor="gray"
              value={numberOfGuest.child}
              onChangeText={value => handleGuestNumber('child', value)}
            />
          </View>
        </View>
        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Total Guest</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="Total Guest"
              placeholderTextColor="gray"
              value={numberOfGuest.total}
              onChangeText={value => handleGuestNumber('total', value)}
            />
          </View>
        </View>

        <View style={styles.labelview}>
          <Text style={styles.label}>Address</Text>
        </View>

        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Province</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="Province"
              placeholderTextColor="gray"
              value={address.province}
              onChangeText={value => handleAddressDetails('province', value)}
            />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>District</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="District"
              placeholderTextColor="gray"
              value={address.district}
              onChangeText={value => handleAddressDetails('district', value)}
            />
          </View>
        </View>
        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>City</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="City"
              placeholderTextColor="gray"
              value={address.city}
              onChangeText={value => handleAddressDetails('city', value)}
            />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Street</Text>
            </View>
            <TextInput
              style={styles.textinput}
              placeholder="Street "
              placeholderTextColor="gray"
              value={address.street}
              onChangeText={value => handleAddressDetails('street', value)}
            />
          </View>
        </View>
        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Select Room No.</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={itemValue => setSelectedValue(itemValue)}>
                {bookedRooms.map(room => (
                  <Picker.Item
                    key={room._id}
                    label={room.roomNumber.toString()}
                    value={room.roomNumber}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Select Room Type</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={selectedTitle}
                onValueChange={itemValue => setSelectedTitle(itemValue)}>
                <Picker.Item label="Select Room Type" value="" />
                {titles.map((title, index) => (
                  <Picker.Item key={index} label={title} value={title} />
                ))}
              </Picker>
            </View>
              </View>*/}
        </View>

        {/* <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Arrival Date</Text>
            </View>
            <CalendarComponent1 onChange={setArrivalDate} />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Departure Date</Text>
            </View>
            <CalendarComponent onChange={setDepartureDate} />
          </View>
            </View>*/}

        {/*<View style={styles.labelview}>
          <Text style={styles.label}>Upload Document</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={pickFile} style={styles.touchableopacity}>
            <Text>{selectedFile ? selectedFile.name : 'Select File'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFile} style={styles.touchableopacity}>
            <Text>{selectedFile2 ? selectedFile2.name : 'Select File'}</Text>
          </TouchableOpacity>
              </View>*/}

        <CustomButton title="Add Booking" width="95%" onPress={handleBooking} />
      </View>
    </ScrollView>
  );
};

export default AddBooking;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  textheading: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  textinput: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  genderText: {
    marginRight: 10,
    color: 'black',
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  labelview: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textinput2: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textinput3: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
  },
  containerhalf: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  button: {
    marginVertical: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
  },
  textinput1: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
    paddingVertical: 15,
  },
  touchableopacity: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
  },
});
