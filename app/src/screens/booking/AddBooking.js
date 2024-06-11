
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getBookingDetails, postBooking} from '../../redux/booking/action';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import imagePath from '../../assets/images/imagePath';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import CustomModal from '../../components/CustomModal';
import PriceBreakupCard from '../../components/PriceBreakupCard';
import {CalendarList} from 'react-native-calendars';
import {Dropdown} from 'react-native-element-dropdown';
import {MultiSelect} from 'react-native-element-dropdown';

let validationSchema = object({
  name: string().required(),
});

const AddBooking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [CheckIn, setCheckIn] = useState('Check-in Date');
  const [CheckOut, setCheckOut] = useState('Check-Out Date');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalData, setModalData] = useState({});

  const handleModalSave = data => {
    setModalData(data);
    console.log(data, 'line no.217');
  };

  const handlePost = () => {
    const req = {
      fullName: 'nitish Kumar',
      email: 'nitisraj@gmail.com',
      phoneNumber: '8420557642',
      nationality: 'Nepal',
      hotelId: '123456',
      roomId: '123456',
      checkIn: '12-04-2024',
      checkOut: '16-04-2024',
      totalPrice: '299',
      extraCharges: '100',
      grandTotal: '100',
      chargesRemark: 'vat Charges',
      status: 'CHECKED-OUT',
      paymentStatus: 'SUCCESS',
      aminities: ['bar', 'pub'],
      discount: '99',
      address: {
        province: 'province',
        district: 'district',
        city: 'city',
        street: 'street',
      },
      numberOfGuest: {
        adult: '1',
        child: '1',
        total: '1',
      },
    };

    try {
      dispatch(postBooking(req));
      alert('Booking successful');
      dispatch(getBookingDetails());
    } catch (error) {
      console.error('Error occurred while booking:', error);
    }
  };
  const handlePressCheckin = day => {
    setCheckIn(day.dateString);
    setIsModalVisible(false);
  };
  const handlePressCheckOut = day => {
    setCheckOut(day.dateString);
    setIsModalVisible1(false);
  };

  const currentDate = new Date();
  const [amenities, setAmenities] = useState([]);
  const currentDateString = currentDate.toISOString().split('T')[0];
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];

  const paymentOption = [
    {label: 'Paid', value: 'SUCCESS'},
    {label: 'Due', value: 'PENDING'},
  ];

  const statusOption = [
    {label: 'Check-in', value: 'CHECK-IN'},
    {label: ' Check-out', value: 'CHECKED-OUT'},
    {label: 'Reserved', value: 'RESERVED'},
  ];
  const [Room, setRooms] = useState('Select Room');
  const [status, setStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            nationality: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, values, errors}) => (
            <View>
              <View style={styles.miniContainer}>
                <Text>Booking Info</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  style={styles.textinput1}>
                  <Image source={imagePath.alarmIcon} style={styles.icon} />
                  <Text
                    style={{fontSize: 14, color: 'gray', fontWeight: '500'}}>
                    {CheckIn}
                  </Text>
                </TouchableOpacity>
                <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setIsModalVisible(false)}>
                  <View style={{flex: 1}}>
                    <CalendarList
                      onDayPress={handlePressCheckin}
                      markedDates={{[CheckIn]: {selected: true}}}
                      pastScrollRange={0}
                      minDate={currentDateString}
                      futureScrollRange={2}
                    />
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => setIsModalVisible1(true)}
                  style={styles.textinput1}>
                  <Image source={imagePath.alarmIcon} style={styles.icon} />
                  <Text style={{fontSize: 14, color: 'gray'}}>{CheckOut}</Text>
                </TouchableOpacity>
                <Modal
                  visible={isModalVisible1}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setIsModalVisible1(false)}>
                  <View style={{flex: 1}}>
                    <CalendarList
                      onDayPress={handlePressCheckOut}
                      markedDates={{[CheckOut]: {selected: true}}}
                      pastScrollRange={0}
                      minDate={currentDateString}
                      futureScrollRange={2}
                    />
                  </View>
                </Modal>
                <CustomTouchableOpacity
                  text="Guests"
                  width="95%"
                  icon={imagePath.alarmIcon}
                  onPress={() => setModalVisible(true)}
                />
                <CustomModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onSave={handleModalSave}
                  fields={[
                    {name: 'adult', placeholder: 'Adult'},
                    {name: 'child', placeholder: 'Child'},
                    {name: 'totalGuests', placeholder: 'Total no. of Guests'},
                  ]}
                  title="Add No. of Guests"
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  placeholder="Select Room"
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={Room}
                  onChange={item => {
                    setRooms(item.value);
                  }}
                  renderLeftIcon={() => (
                    <Image source={imagePath.alarmIcon} style={styles.icon} />
                  )}
                />
              </View>
              <View style={styles.miniContainer}>
                <Text>Personal Info</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('fullName')}
                  value={values.fullName}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contact No."
                  keyboardType="numeric"
                  onChangeText={handleChange('phoneNumber')}
                  value={values.phoneNumber}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nationality"
                  onChangeText={handleChange('nationality')}
                  value={values.nationality}
                />
                <CustomTouchableOpacity
                  text="Address Details"
                  width="95%"
                  icon={imagePath.alarmIcon}
                  onPress={() => setModalVisible2(true)}
                />
                <CustomModal
                  visible={modalVisible2}
                  onClose={() => setModalVisible2(false)}
                  onSave={handleModalSave}
                  fields={[
                    {
                      name: 'proviance',
                      placeholder: 'Proviance',
                    },
                    {name: 'district', placeholder: 'District'},
                    {name: 'street', placeholder: 'Street'},
                  ]}
                  title="Address Details"
                />
              </View>

              <View style={styles.miniContainer}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Amenities"
                  value={amenities}
                  onChange={item => {
                    setAmenities(item);
                  }}
                  renderLeftIcon={() => (
                    <Image source={imagePath.alarmIcon} style={styles.icon} />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={paymentOption}
                  maxHeight={300}
                  placeholder="Select Payment Status"
                  labelField="label"
                  valueField="value"
                  value={paymentStatus}
                  onChange={item => {
                    setPaymentStatus(item.value);
                  }}
                  renderLeftIcon={() => (
                    <Image source={imagePath.alarmIcon} style={styles.icon} />
                  )}
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={statusOption}
                  maxHeight={300}
                  placeholder="Select Booking Status"
                  labelField="label"
                  valueField="value"
                  value={status}
                  onChange={item => {
                    setStatus(item.value);
                  }}
                  renderLeftIcon={() => (
                    <Image source={imagePath.alarmIcon} style={styles.icon} />
                  )}
                />
              </View>
              <PriceBreakupCard />
            </View>
          )}
        </Formik>
      </ScrollView>
      <View style={styles.bottomMainView}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '800'}}>
              $ 5,785
            </Text>
            <TouchableOpacity>
              <Image
                source={imagePath.infoImage}
                style={{
                  height: 14,
                  width: 14,
                  tintColor: 'white',
                  marginLeft: 7,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 9}}>including VAT</Text>
          <Text style={{color: 'white', fontSize: 9}}>For 2 person</Text>
        </View>
        <CustomButton title="Submit" width="50%" />
      </View>
    </View>
  );
};

export default AddBooking;

const styles = StyleSheet.create({
  touch: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  guestinput: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 16,
    marginVertical: 7,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#eef3ef',
    borderWidth: 1,
    borderColor: '#dadada',
  },
  selectedStyle: {
    borderRadius: 6,
    marginLeft: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: -5,
    width: '95%',
    alignSelf: 'center',
  },
  miniContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
  },
  bottomMainView: {
    bottom: 0,
    position: 'relative',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 15,
  },
  textinput1: {
    paddingHorizontal: 10,
    marginVertical: 7,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#eef3ef',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#dadada',
    flexDirection: 'row',
  },
  dropdown: {
    paddingHorizontal: 10,
    marginVertical: 7,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#eef3ef',
    borderWidth: 1,
    borderColor: '#dadada',
  },
  icon: {
    marginRight: 10,
    height: 18,
    width: 18,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
