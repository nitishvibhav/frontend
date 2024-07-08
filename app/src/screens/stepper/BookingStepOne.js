import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import CustomDropdown from '../../components/CustomDropdown';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomCategoryDetails} from '../../redux/roomcategory/action';
import {getRooms} from '../../redux/rooms/action';

const BookingStepOne = ({navigation, route}) => {
  const [data, setData] = useState(route.params?.data || {});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [checkIn, setCheckIn] = useState('CHECK-IN DATE');
  const [checkOut, setCheckOut] = useState('CHECK-OUT DATE');
  const currentDate = new Date().toISOString().split('T')[0];

  const [dropdownValues, setDropdownValues] = useState({
    roomType: null,
    numberOfRooms: null,
    numberOfAdults: null,
    numberOfChildren: null,
    totalGuests: null,
    roomNumber: null,
  });

  const dispatch = useDispatch();
  const roomCategory = useSelector(
    state => state.roomCategoryReducer.roomCategory,
  );
  const rooms = useSelector(state => state.roomReducer.rooms);

  useEffect(() => {
    dispatch(getRoomCategoryDetails());
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (roomCategory && roomCategory.result) {
      const roomTypeOptions = roomCategory.result.map(room => ({
        label: room.title,
        value: room.title,
      }));

      setBookingInfoConfig(prevConfig =>
        prevConfig.map(config =>
          config.stateKey === 'roomType'
            ? {...config, data: roomTypeOptions}
            : config,
        ),
      );
    }
  }, [roomCategory]);

  // Update room numbers based on selected room type
  useEffect(() => {
    if (dropdownValues.roomType && rooms && rooms.result) {
      const roomNumberOptions = rooms.result
        .filter(room => room.roomCategory === dropdownValues.roomType && room.allotmentStatus ===false)
        .map(room => ({
          label: room.roomNumber,
          value: room.roomNumber,
        }));

      setBookingInfoConfig(prevConfig =>
        prevConfig.map(config =>
          config.stateKey === 'roomNumber'
            ? {...config, data: roomNumberOptions}
            : config,
        ),
      );
    }
  }, [dropdownValues.roomType, rooms]);

  const [bookingInfoConfig, setBookingInfoConfig] = useState([
    {
      label: 'Room Type',
      placeholder: 'Select Room Type',
      data: [],
      stateKey: 'roomType',
    },
    {
      label: 'Room Number',
      placeholder: 'Select Room Number',
      data: [],
      stateKey: 'roomNumber',
    },
  ]);

  const roomsGuestsConfig = [
    {
      label: 'Number of Rooms',
      placeholder: 'Select Number of Rooms',
      data: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
      ],
      stateKey: 'numberOfRooms',
    },
    {
      label: 'Total Number of Guests',
      placeholder: 'Select Total Number of Guests',
      data: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
      ],
      stateKey: 'totalGuests',
    },
    {
      label: 'Number of Adults',
      placeholder: 'Select Number of Adults',
      data: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
      ],
      stateKey: 'numberOfAdults',
    },
    {
      label: 'Number of Children',
      placeholder: 'Select Number of Children',
      data: [
        {label: '0', value: '0'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
      ],
      stateKey: 'numberOfChildren',
    },
  ];

  const handleChange = (value, stateKey) => {
    setDropdownValues(prevValues => ({
      ...prevValues,
      [stateKey]: value,
    }));
    setData(prevData => ({
      ...prevData,
      [stateKey]: value,
    }));
  };

  const handlePressCheckin = day => {
    setCheckIn(day.dateString);
    setData(prevData => ({
      ...prevData,
      checkIn: day.dateString,
    }));
    setIsModalVisible(false);
  };

  const handlePressCheckOut = day => {
    setCheckOut(day.dateString);
    setData(prevData => ({
      ...prevData,
      checkOut: day.dateString,
    }));
    setIsModalVisible1(false);
  };

  const handleNext = () => {
    navigation.navigate('steptwo', {
      data: {...data, ...dropdownValues, checkIn, checkOut},
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Booking Info Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Booking Info</Text>
        <CustomTouchableOpacity
          label="CHECK-IN DATE"
          icon={imagePath.checkIn}
          text={checkIn}
          width="100%"
          onPress={() => setIsModalVisible(true)}
        />
        <CustomTouchableOpacity
          label="CHECK-OUT DATE"
          icon={imagePath.checkOut}
          text={checkOut}
          width="100%"
          onPress={() => setIsModalVisible1(true)}
        />
        {bookingInfoConfig.map(({label, placeholder, data, stateKey}) => (
          <CustomDropdown
            key={stateKey}
            label={label}
            icon={imagePath.alarmIcon}
            placeholder={placeholder}
            data={data}
            value={dropdownValues[stateKey]}
            onChange={item => handleChange(item.value, stateKey)}
          />
        ))}
      </View>

      {/* Rooms and Guests Details Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Rooms and Guests Details</Text>
        <View style={styles.row}>
          <View style={{width: '49%'}}>
            <CustomDropdown
              label="Number of Rooms"
              icon={imagePath.alarmIcon}
              placeholder="Select Number of Rooms"
              data={roomsGuestsConfig[0].data}
              value={dropdownValues.numberOfRooms}
              onChange={item => handleChange(item.value, 'numberOfRooms')}
              containerStyle={styles.halfWidth}
            />
          </View>
          <View style={{width: '49%'}}>
            <CustomDropdown
              label="Total Number of Guests"
              icon={imagePath.alarmIcon}
              placeholder="Select Total Number of Guests"
              data={roomsGuestsConfig[1].data}
              value={dropdownValues.totalGuests}
              onChange={item => handleChange(item.value, 'totalGuests')}
              containerStyle={styles.halfWidth}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: '49%'}}>
            <CustomDropdown
              label="Number of Adults"
              icon={imagePath.alarmIcon}
              placeholder="Number of Adults"
              data={roomsGuestsConfig[2].data}
              value={dropdownValues.numberOfAdults}
              onChange={item => handleChange(item.value, 'numberOfAdults')}
              containerStyle={styles.halfWidth}
            />
          </View>
          <View style={{width: '49%'}}>
            <CustomDropdown
              label="Number of Children"
              icon={imagePath.alarmIcon}
              placeholder="Select Number of Children"
              data={roomsGuestsConfig[3].data}
              value={dropdownValues.numberOfChildren}
              onChange={item => handleChange(item.value, 'numberOfChildren')}
              containerStyle={styles.halfWidth}
            />
          </View>
        </View>
      </View>

      <CustomButton title="Next" onPress={handleNext} width="100%" />

      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <Calendar
                onDayPress={handlePressCheckin}
                markedDates={{[checkIn]: {selected: true}}}
                pastScrollRange={0}
                minDate={currentDate}
                futureScrollRange={2}
              />
              <Button title="Close" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isModalVisible1}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsModalVisible1(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible1(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <Calendar
                onDayPress={handlePressCheckOut}
                markedDates={{[checkOut]: {selected: true}}}
                pastScrollRange={0}
                minDate={currentDate}
                futureScrollRange={2}
              />
              <Button title="Close" onPress={() => setIsModalVisible1(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: '80%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
});

export default BookingStepOne;
