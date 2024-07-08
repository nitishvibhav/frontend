import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {get} from 'lodash';
import {postBooking} from '../../redux/booking/action';

const BookingReview = ({route}) => {
  const {data} = route.params;
  console.log(data, 'stepper data');
  const dispatch = useDispatch();

  const displayData = [
    {label: 'Full name', value: 'Nitish Vibhav'},
    {label: 'Email', value: data.email},
    {label: 'Phone Number', value: data.phoneNumber},
    // Add more fields here as needed
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
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      aminities: ['spa', 'bar'],
      roomCategory: data.roomType,
      relation: data.relation,
      numberOfRooms: data.numberOfRooms.toString(),
      dateOfBirth: data.dob,
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
      <View style={styles.sectionContainer}>
        <View style={styles.labelView}>
          <Text style={{color: '#717171', fontSize: 12}}>CHECK-IN</Text>
          <Text style={{color: '#717171', fontSize: 12}}>CHECK-OUT</Text>
        </View>
        <View style={styles.ContainerView}>
          <Text style={{color: '#414141', fontSize: 12}}>
            <Text style={{color: '#000000', fontSize: 16, fontWeight: '700'}}>
              29 Feb
            </Text>{' '}
            2024, Thu
          </Text>
          <Text style={{color: '#414141', fontSize: 12}}>
            <Text style={{color: '#000000', fontSize: 16, fontWeight: '700'}}>
              1 March
            </Text>{' '}
            2024, Fri
          </Text>
        </View>
        <View style={styles.sectionTime}>
          <Text style={{color: '#414141', fontSize: 12}}>12 PM</Text>
          <Text style={{color: '#414141', fontSize: 12}}>11 AM</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        {displayData.map((item, index) => (
          <View style={styles.maincontainer} key={index}>
            <View style={styles.labelViewinput}>
              <Text>{item.label}</Text>
            </View>
            <TextInput
              placeholder="name"
              style={styles.input}
              value={item.value}
              editable={false}
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
    paddingHorizontal: 10,
  },
  sectionTime: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContainerView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 40,
    borderStyle: 'dashed',
  },
  labelView: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelViewinput: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    marginRight: 20,
  },
  sectionContainer: {
    width: '95%',
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: 'grey',
    marginBottom: 10,
    paddingBottom: 10,
  },
  line: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    margin: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    width: '40%',
    fontSize: 16,
    color: '#333',
  },
  value: {
    width: '60%',
    fontSize: 16,
    color: '#333',
  },
});
