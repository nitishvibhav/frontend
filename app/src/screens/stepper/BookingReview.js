import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {get} from 'lodash';
import {postBooking} from '../../redux/booking/action';

const BookingReview = ({route}) => {
  const {data} = route.params;
  console.log(data, 'stepper data');
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    organizationName: '',
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
    relation:'',
    dob :''
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
        numberOfRooms: data.numberOfRooms.toString(),
        totalGuests: data.totalGuests.toString(),
        numberOfAdults: data.numberOfAdults.toString(),
        numberOfChildren: data.numberOfChildren.toString(),
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        purpose: data.purpose,
        relation:data.relation,
        dob:data.dob
      });
    }
  }, [data]);

  const handleTextChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = () => {
    const data = profileData;
    console.log(data, 'form data ');
    dispatch(updateUserDetails(data, data._id)); // Assuming _id is the user ID field
  };

  // Fields for personal information section
  const bookingInfoFields = [
    {key: 'checkIn', label: 'Check-in Date'},
    {key: 'checkOut', label: 'Check-out Date'},
    {key: 'numberOfRooms', label: 'No. of Rooms'},
    {key: 'totalGuests', label: 'Total Guests'},
    {key: 'numberOfAdults', label: 'No. of Adults'},
    {key: 'numberOfChildren', label: 'No. of Children'},
    {key : 'purpose', label : 'Purpose'},
    {key:'relation', label:'Relation'},
  ];

  const personalInfoFields = [
    {key: 'fullName', label: 'Full Name'},
    {key: 'email', label: 'Email'},
    {key: 'phoneNumber', label: 'Contact Number'},
    {key: 'gender', label: 'Gender'},
    {key: 'nationality', label: 'Nationality'},
    {key :'dob' , label:'Date of Birth'}
  ];

  // Fields for address details section
  const addressFields = [
    {key: 'state', label: 'State'},
    {key: 'country', label: 'Country'},
    {key: 'location', label: 'Location'},
  ];

  const handlePost = async () => {
    const req = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      nationality: data.nationality,
      hotelId: '123456',
      status: 'PENDING',
      paymentStatus: 'PENDING',
      bookingMethod: 'OFFLINE',
      roomCategory: [
        {
          _id: '66695ed6d4a4403f0cdf0648',
          title: 'SUPER-DELUXE-ROOM',
          bedCapacity: '2',
          price: '5000',
        },
      ],
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      aminities: ['spa', 'bar'],
      relation: data.relation,
      numberOfRooms: data.numberOfRooms.toString(),
      dateOfBirth: data.dob,
      allotmentStatus: true,
      purpoes: data.purpose,
      address: {
        country: data.country,
        city: data.state,
        location: data.location,
      },
      numberOfGuest: {
        adult: data.numberOfAdults.toString(),
        child: data.numberOfChildren.toString(),
        total: data.totalGuests.toString(),
      },
      guests: data.additionalGuests,
    };
    const res = await dispatch(postBooking(req));
    console.log(res, 'response');
    const status = get(res, 'value.status');
    if (status === 200) {
      alert(get(res.value.data, 'message', 'Done'));
      dispatch(getBookingDetails());
    } else {
      console.log(get(res, 'message', 'Done'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Booking Information Section */}
      <View style={styles.section}>
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
      </View>
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
      <CustomButton title="Submit" width="100%" onPress={handlePost} />
    </ScrollView>
  );
};

export default BookingReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  icon: {
    height: 16,
    width: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a74d7',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#e0e3ea',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  group: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a74d7',
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
    fontSize: 16,
    color: '#333',
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
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a74d7',
  },
});
