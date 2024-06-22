import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBookingDetails, postBooking} from '../../redux/booking/action';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import imagePath from '../../assets/images/imagePath';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import CustomModal from '../../components/CustomModal';
import {CalendarList} from 'react-native-calendars';
import {MultiSelect} from 'react-native-element-dropdown';
import CustomDropdown from '../../components/CustomDropdown';
import {getRoomCategoryDetails} from '../../redux/roomcategory/action';
import {get} from 'lodash';
import {getAminitiesCategoryDetails} from '../../redux/amenitiesCategory/action';

let validationSchema = object({
  name: string(),
});

const AddBooking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [CheckIn, setCheckIn] = useState('22-04-2024');
  const [CheckOut, setCheckOut] = useState('23-04-2024');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [infantCount, setInfantCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [adultCount, setAdultCount] = useState(1);
  const [modalVisibleGuest, setModalVisibleGuest] = useState(false);
  const [status, setStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleInfantIncrement = () => {
    setInfantCount(infantCount + 1);
  };
  const handleInfantDecrement = () => {
    if (infantCount <= 0) {
      return;
    } else setInfantCount(infantCount - 1);
  };
  const handleChildrenIncrement = () => {
    setChildrenCount(childrenCount + 1);
  };
  const handleChildrenDecrement = () => {
    if (childrenCount <= 0) {
      return;
    }
    setChildrenCount(childrenCount - 1);
  };
  const handleAdultIncrement = () => {
    setAdultCount(adultCount + 1);
  };
  const handleAdultDecrement = () => {
    if (adultCount <= 1) {
      return;
    }
    setAdultCount(adultCount - 1);
  };

  const [address, setAddress] = useState({
    location: 'M.G Road',
    country: 'India',
    city: 'Kolkata',
  });
  const [traveller, setTraveller] = useState({
    fullName: 'Nitish Vibhav ',
    gender: 'Male',
    age: '21',
  });
  const [contact, setContact] = useState({
    phoneNumber: '8420557642',
    email: 'nitishvibhav@gmail.com',
    alternatePhoneNumber: '',
    nationality: '',
  });
  const [payment, setPayment] = useState({
    totalPrice: '1000',
    tax: '',
    extraCharges: '',
    chargesRemark: '',
    discountType: '',
    discount: '100',
    grandTotal: '1100',
  });

  const [modalType, setModalType] = useState(null);

  const toggleModal = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSave = data => {
    if (modalType === 'traveller') {
      setTraveller({
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
      });
    } else if (modalType === 'address') {
      setAddress({
        country: data.country,
        city: data.city,
        location: data.location,
      });
    } else if (modalType === 'contact') {
      setContact({
        phoneNumber: data.phoneNumber,
        email: data.email,
        alternatePhoneNumber: data.alternatePhoneNumber,
        nationality: data.nationality,
      });
    } else if (modalType === 'payment') {
      setPayment({
        totalPrice: data.totalPrice,
        tax: data.tax,
        extraCharges: data.extraCharges,
        chargesRemark: data.chargesRemark,
        discountType: data.discountType,
        discount: data.discount,
        grandTotal: data.grandTotal,
      });
    }
    setModalVisible(false);
  };
  const getFields = () => {
    switch (modalType) {
      case 'payment':
        return [
          {name: 'totalPrice', placeholder: 'Base Price'},
          {name: 'tax', placeholder: 'Tax Amount'},
          {name: 'extraCharges', placeholder: 'Extra Charges'},
          {name: 'chargesRemark', placeholder: 'Charges Remark'},
          {name: 'discountType', placeholder: 'Discount Type'},
          {name: 'discount', placeholder: 'Discount'},
          {name: 'grandTotal', placeholder: 'Grand Total'},
        ];
      case 'address':
        return [
          {name: 'country', placeholder: 'Country'},
          {name: 'city', placeholder: 'City'},
          {name: 'location', placeholder: 'Location'},
        ];
      case 'traveller':
        return [
          {name: 'fullName', placeholder: 'Full Name'},
          {name: 'gender', placeholder: 'Gender'},
          {name: 'age', placeholder: 'Age'},
        ];
      case 'contact':
        return [
          {name: 'phoneNumber', placeholder: 'Phone Number'},
          {name: 'email', placeholder: 'Email'},
          {name: 'nationality', placeholder: 'Nationality'},
          {name: 'alternatePhoneNumber', placeholder: 'Alternate Phone Number'},
        ];
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (modalType) {
      case 'payment':
        return 'Payment Details';
      case 'address':
        return 'Address Details';
      case 'traveller':
        return 'Traveller Details';
      case 'contact':
        return 'Contact Details';
      default:
        return '';
    }
  };
  const {roomCategory} = useSelector(state => state.roomCategoryReducer);
  const {amenitiesCategory} = useSelector(
    state => state.amenitiesCategoryReducer,
  );
  const [roomType, setRoomType] = useState([]);
  const [amenitiesType, setAmenitiesType] = useState([]);

  useEffect(() => {
    dispatch(getRoomCategoryDetails());
    dispatch(getAminitiesCategoryDetails());
  }, [dispatch]);

  useEffect(() => {
    if (roomCategory.result) {
      const titles = roomCategory.result.map(category => ({
        label: category.title,
        value: category.title,
      }));
      setRoomType(titles);
    } else if (amenitiesCategory.result) {
      const titles = amenitiesCategory.result.map(category => ({
        label: category.title,
        value: category.title,
      }));
      setAmenitiesType(titles);
    }
  }, [amenitiesCategory, roomCategory]);

  const req = {
    fullName: traveller.fullName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    nationality: contact.nationality,
    hotelId: '123456',
    roomId: '1234',
    roomCategory: 'single room',
    checkIn: CheckIn,
    checkOut: CheckOut,
    totalPrice: payment.totalPrice,
    tax: payment.tax,
    extraCharges: payment.extraCharges,
    chargesRemark: payment.chargesRemark,
    discountType: payment.discountType,
    discount: payment.discount,
    grandTotal: payment.grandTotal,
    status: status,
    paymentStatus: paymentStatus,
    aminities: ["spa", "bar"],
    bookingMethod: bookingStatus,
    address: {
      country: address.country,
      city: address.city,
      location: address.location,
    },
    numberOfGuest: {
      adult: adultCount.toString(),
      child: childrenCount.toString(),
      total: (infantCount + childrenCount + adultCount).toString(),
    },
  };

  console.log(req, 'reqs');

  const handlePost = () => {
    const res = dispatch(postBooking(req));
    console.log(res, 'response');
    const status = get(res, 'value.status');
    if (status === 200) {
      alert(get(res.value.data, 'message', 'Done'));
      dispatch(getBookingDetails());
    } else {
      console.log(get(res, 'message', 'Done'));
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
  const currentDateString = currentDate.toISOString().split('T')[0];

  const paymentOption = [
    {label: 'Paid', value: 'SUCCESS'},
    {label: 'Due', value: 'PENDING'},
  ];

  const data = [
    {label: 'item1', value: 'item1'},
    {label: 'item2', value: 'item2'},
  ];

  const bookingOption = [
    {label: 'Offline', value: 'OFFLINE'},
    {label: 'Online', value: 'ONLINE'},
  ];

  const statusOption = [
    {label: 'Check-in', value: 'CHECK-IN'},
    {label: 'Check-out', value: 'CHECKED-OUT'},
    {label: 'Reserved', value: 'RESERVED'},
  ];
  const [roomTypeStatus, setRoomTypeStatus] = useState('');

  const [amenitie, setAmenitie] = useState([]);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
            <View>
              <View style={styles.miniContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CustomTouchableOpacity
                    icon={imagePath.checkIn}
                    text="CHECK-IN DATE"
                    text2={CheckIn}
                    width="49%"
                    onPress={() => setIsModalVisible(true)}
                  />
                  <CustomTouchableOpacity
                    icon={imagePath.checkOut}
                    text="CHECK-OUT DATE"
                    text2={CheckOut}
                    width="49%"
                    onPress={() => setIsModalVisible1(true)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CustomDropdown
                    icon={imagePath.BookingStatus}
                    text="Booking Status"
                    text2="Check-in"
                    data={statusOption}
                    value={status}
                    onChange={item => setStatus(item.value)}
                  />
                  <CustomDropdown
                    icon={imagePath.paymentStatus}
                    text="Payment Status"
                    text2="Due"
                    data={paymentOption}
                    value={paymentStatus}
                    onChange={item => setPaymentStatus(item.value)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <CustomDropdown
                    icon={imagePath.roomType}
                    text="Room Type"
                    text2="Select Type"
                    data={roomType}
                    value={roomTypeStatus}
                    onChange={item => setRoomTypeStatus(item.value)}
                  />
                  <CustomDropdown
                    icon={imagePath.BookingOption}
                    text="Booking Option"
                    text2="Offline"
                    data={bookingOption}
                    value={bookingStatus}
                    onChange={item => setBookingStatus(item.value)}
                  />
                </View>
                <CustomTouchableOpacity
                  icon={imagePath.checkOut}
                  text="Amenities"
                  text2="Spa, Bar, Meals"
                  width="95%"
                />
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={amenitiesType}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Amenities"
                  value={amenitie}
                  onChange={item => {
                    setAmenitie(item);
                  }}
                  renderLeftIcon={() => (
                    <Image source={imagePath.alarmIcon} style={styles.icon} />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
                <CustomTouchableOpacity
                  icon={imagePath.guests}
                  text="Guests"
                  text2={`${adultCount} Adult | ${childrenCount} Child | ${infantCount} infant | Total: ${
                    infantCount + childrenCount + adultCount
                  }`}
                  width="95%"
                  onPress={() => setModalVisibleGuest(true)}
                />
                <CustomTouchableOpacity
                  icon={imagePath.addressDetails}
                  text="Address Details"
                  text2={`${address.country} | ${address.city} | ${address.location}`}
                  width="95%"
                  onPress={() => toggleModal('address')}
                />
                <CustomTouchableOpacity
                  icon={imagePath.tarvellarDetails}
                  text="Traveller Details"
                  text2={`${traveller.fullName} | ${traveller.age} | ${traveller.gender}`}
                  width="95%"
                  onPress={() => toggleModal('traveller')}
                />
                <CustomTouchableOpacity
                  icon={imagePath.contactDetails}
                  text="Contact Details"
                  text2={`${contact.phoneNumber} | ${contact.email}`}
                  width="95%"
                  onPress={() => toggleModal('contact')}
                />
                <CustomTouchableOpacity
                  icon={imagePath.paymentDetails}
                  text="Payment Details"
                  text2={`Total : ${payment.grandTotal} | Discount : ${payment.discount}`}
                  width="95%"
                  onPress={() => toggleModal('payment')}
                />
              </View>

              <View style={styles.miniContainer}></View>
            </View>
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
        <CustomButton title="Submit" width="50%" onPress={handlePost} />
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSave={handleSave}
        fields={getFields()}
        title={getTitle()}
      />
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
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleGuest}
        onRequestClose={() => {
          setModalVisibleGuest(!modalVisibleGuest);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalview}>
            <View>
              <Text style={styles.headingText}>Number of Guests</Text>
            </View>
            <View style={styles.modalContainer}>
              <View>
                <Text style={{fontSize: 16}}>{adultCount} Adults</Text>
                <Text style={styles.smallText}>12 years old and above</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={handleAdultDecrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Decrement}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.modalCounterText}>{adultCount}</Text>
                <TouchableOpacity
                  onPress={handleAdultIncrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Increment}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContainer}>
              <View>
                <Text style={{fontSize: 16}}>{childrenCount} Children</Text>
                <Text style={styles.smallText}>2 to 12 years old</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={handleChildrenDecrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Decrement}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.modalCounterText}>{childrenCount}</Text>
                <TouchableOpacity
                  onPress={handleChildrenIncrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Increment}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContainer}>
              <View>
                <Text style={{fontSize: 16}}>{infantCount} Infants</Text>
                <Text style={styles.smallText}>Less than 2 years</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={handleInfantDecrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Decrement}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.modalCounterText}>{infantCount}</Text>
                <TouchableOpacity
                  onPress={handleInfantIncrement}
                  style={styles.modalTouchablity}>
                  <Image
                    source={imagePath.Increment}
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalButton}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  alignItems: 'center',
                }}>
                <View style={{marginRight: 10}}>
                  <Text>Total</Text>
                  <Text>Guests</Text>
                </View>
                <View style={styles.modalTouchablity}>
                  <Text>{infantCount + childrenCount + adultCount}</Text>
                </View>
              </View>
              <CustomButton
                title="Save"
                width="40%"
                onPress={() => setModalVisibleGuest(!modalVisibleGuest)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddBooking;

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginBottom: 20,
    width: '90%',
  },
  smallText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '600',
  },
  modalIcon: {
    height: 16,
    width: 16,
    tintColor: 'orange',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 20,
  },
  modalCounterText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },
  modalTouchablity: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef3ef',
    marginRight: 0,
    borderRadius: 6,
  },
  touch: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  guestinput: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    marginLeft: 20,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  modalview: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 6,
    width: '95%',
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
