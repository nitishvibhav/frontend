import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {get} from 'lodash';
import {getBookingDetails, postBooking} from '../../redux/booking/action';
import { useNavigation } from '@react-navigation/native';

const BookingReview = ({route}) => {
  const {data} = route.params;
  console.log(data, 'stepper data');
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    nationality: '',
    gender: '',
    state: '',
    country: '',
    location: '',
    numberOfRooms: '',
    totalGuests: '',
    numberOfAdults: '',
    numberOfChildren: '',
    checkIn: '',
    checkOut: '',
    purpose: '',
    relation: '',
    dob: '',
  });

  useEffect(() => {
    if (data) {
      setProfileData({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber.toString(),
        username: data.username,
        group: data.group,
        organizationName: data.organizationName,
        nationality: data.nationality,
        gender: data.gender,
        state: data.state,
        country: data.country,
        location: data.location,
        numberOfRooms: data.selectedItems.length.toString(),
        totalGuests: data.bedCapacity.toString(),
        numberOfAdults: data.adult.toString(),
        numberOfChildren: data.child.toString(),
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        purpose: data.purpose,
        relation: data.relation,
        dob: data.dob,
      });
    }
  }, [data]);

  const handleTextChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };
  const navigation = useNavigation()

  const handlePost = async () => {
    const roomCategories = data.selectedItems.map(item => item.roomCategory);
    const roomNumbers = data.selectedItems.map(item => item.roomNumber);

    const req = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      nationality: data.nationality,
      hotelId: data.hotelId,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      bookingMethod: 'OFFLINE',
      roomCategory: roomCategories.map((category, index) => ({
        _id: data.selectedItems[index]._id,
        title: category,
        bedCapacity: '1',
        price: '5000',
      })),
      rooms: roomNumbers.map((roomNumber, index) => ({
        _id: data.selectedItems[index]._id,
        roomNumber: roomNumber,
      })),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      aminities: data.amenities,
      relation: data.relation,
      numberOfRooms: data.selectedItems.length.toString(),
      dateOfBirth: data.dob,
      allotmentStatus: true,
      purpoes: data.purpose,
      address: {
        country: data.country,
        city: data.state,
        location: data.location,
      },
      numberOfGuest: {
        adult: data.adult.toString(),
        child: data.child.toString(),
        total: data.bedCapacity.toString(),
      },
      guests: data.additionalGuests,
    };

    const res = await dispatch(postBooking(req));
    console.log(res, 'response');
    const status = get(res, 'value.status');
    if (status === 200) {
      alert(get(res.value.data, 'message', 'Done'));
      dispatch(getBookingDetails());
      navigation.navigate('Home')
    } else {
      console.log(get(res, 'message', 'Done'));
    }
  };

  return (
    <View style={{   flex: 1,}}>
      <ScrollView style={styles.container}>

           {/* Booking Summary Section */}
           <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Total Guests</Text>
            <Text style={styles.selectedItemText}>{data.bedCapacity}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Check-In Date</Text>
            <Text style={styles.selectedItemText}>{data.checkIn}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Check-Out Date</Text>
            <Text style={styles.selectedItemText}>{data.checkOut}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Number of Rooms</Text>
            <Text style={styles.selectedItemText}>
              {data.selectedItems.length}
            </Text>
          </View>
        </View>

        {/* Selected Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Rooms</Text>
          {data.selectedItems.map((item, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.label}>Room {index + 1}</Text>
              <View style={styles.selectedItemContainer}>
                <Text style={styles.selectedItemText}>
                  Category: {item.roomCategory}
                </Text>
                <Text style={styles.selectedItemText}>
                  Number: {item.roomNumber}
                </Text>
              </View>
            </View>
          ))}
        </View>

     

        {/* Booking Information Section */}
        {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Information</Text>
        {bookingInfoFields.map(field => (
          <View key={field.key} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${field.label}`}
              placeholderTextColor="#505152"
              value={profileData[field.key]}
              onChangeText={value => handleTextChange(field.key, value)}
            />
          </View>
        ))}
      </View> */}

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {personalInfoFields.map(field => (
            <View key={field.key} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.label}`}
                placeholderTextColor="#505152"
                value={profileData[field.key]}
                onChangeText={value => handleTextChange(field.key, value)}
              />
            </View>
          ))}
        </View>

        {/* Address Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Details</Text>
          {addressFields.map(field => (
            <View key={field.key} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.label}`}
                placeholderTextColor="#505152"
                value={profileData[field.key]}
                onChangeText={value => handleTextChange(field.key, value)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <CustomButton title="Confirm Booking" width="95%" onPress={handlePost} />
    </View>
  );
};

export default BookingReview;

const styles = StyleSheet.create({
  container: {
 
    backgroundColor: '#f0f0f0',
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: '40%',
    marginRight: 10,
    fontSize: 14,
    color: '#333',
    fontWeight:'700'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 14,
    color: '#333',
  },
  selectedItemContainer: {
    flexDirection: 'column',
  },
  selectedItemText: {
    fontSize: 14,
    color: '#333',
  },
});

const bookingInfoFields = [
  {key: 'checkIn', label: 'Check-In Date'},
  {key: 'checkOut', label: 'Check-Out Date'},
  {key: 'numberOfRooms', label: 'Number of Rooms'},
  {key: 'numberOfAdults', label: 'Number of Adults'},
  {key: 'numberOfChildren', label: 'Number of Children'},
  {key: 'totalGuests', label: 'Total Guests'},
  {key: 'purpose', label: 'Purpose'},
];

const personalInfoFields = [
  {key: 'fullName', label: 'Full Name'},
  {key: 'gender', label: 'Gender'},
  {key: 'email', label: 'Email'},
  {key: 'phoneNumber', label: 'Contact Number'},
  {key: 'nationality', label: 'Nationality'},
];

const addressFields = [
  {key: 'state', label: 'State'},
  {key: 'country', label: 'Country'},
  {key: 'location', label: 'Location'},
];
