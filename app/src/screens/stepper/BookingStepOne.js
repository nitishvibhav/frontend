import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomsDetails} from '../../redux/rooms/action';

const BookingStepOne = ({navigation, route}) => {
  const [data, setData] = useState(route.params?.data || {});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [checkIn, setCheckIn] = useState('CHECK-IN DATE');
  const [checkOut, setCheckOut] = useState('CHECK-OUT DATE');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [errors, setErrors] = useState({});
  const currentDate = new Date().toISOString().split('T')[0];

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

  const handleNumberOfGuestsChange = text => {
    setNumberOfGuests(text);
    setData(prevData => ({
      ...prevData,
      numberOfGuests: text,
    }));
  };

  const handleNumberOfAdultsChange = text => {
    setNumberOfAdults(text);
    setData(prevData => ({
      ...prevData,
      numberOfAdults: text,
    }));
  };

  const handleNumberOfChildrenChange = text => {
    setNumberOfChildren(text);
    setData(prevData => ({
      ...prevData,
      numberOfChildren: text,
    }));
  };


  const validateFields = () => {
    const newErrors = {};
    if (checkIn === 'CHECK-IN DATE' || !checkIn) {
      newErrors.checkIn = 'Check-in date is required.';
    }
    if (checkOut === 'CHECK-OUT DATE' || !checkOut) {
      newErrors.checkOut = 'Check-out date is required.';
    }
    if (new Date(checkIn) > new Date(checkOut)) {
      newErrors.date =
        'Check-in date must be before or equal to check-out date.';
    }
    if (!numberOfGuests)
      newErrors.numberOfGuests = 'Total number of guests is required.';
    if (!numberOfAdults)
      newErrors.numberOfAdults = 'Number of adults is required.';
    if (!numberOfChildren)
      newErrors.numberOfChildren = 'Number of children is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (validateFields()) {
      navigation.navigate('BookingFilteration', {
        data: {
          ...data,
          checkIn,
          checkOut,
          numberOfGuests,
          numberOfAdults,
          numberOfChildren,
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <View style={{width: '49%'}}>
            <CustomTouchableOpacity
              label="CHECK-IN DATE"
              icon={imagePath.checkIn}
              text={checkIn}
              width="100%"
              onPress={() => setIsModalVisible(true)}
            />
            {errors.checkIn && (
              <Text style={styles.errorText}>{errors.checkIn}</Text>
            )}
          </View>
          <View style={{width: '49%'}}>
            <CustomTouchableOpacity
              label="CHECK-OUT DATE"
              icon={imagePath.checkOut}
              text={checkOut}
              width="100%"
              onPress={() => setIsModalVisible1(true)}
            />
            {errors.checkOut && (
              <Text style={styles.errorText}>{errors.checkOut}</Text>
            )}
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>NUMBER OF ADULT</Text>
            <TextInput
              style={styles.input}
              placeholder="ADULT"
              value={numberOfAdults}
              onChangeText={handleNumberOfAdultsChange}
              keyboardType="numeric"
              placeholderTextColor="black"
            />
            {errors.numberOfAdults && (
              <Text style={styles.errorText}>{errors.numberOfAdults}</Text>
            )}
          </View>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>NUMBER OF CHILDREN</Text>
            <TextInput
              style={styles.input}
              placeholder="CHILDREN"
              value={numberOfChildren}
              onChangeText={handleNumberOfChildrenChange}
              keyboardType="numeric"
              placeholderTextColor="black"
            />
            {errors.numberOfChildren && (
              <Text style={styles.errorText}>{errors.numberOfChildren}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>TOTAL NUMBER OF GUESTS</Text>
          <TextInput
            style={styles.input}
            placeholder="TOTAL GUESTS"
            value={numberOfGuests}
            onChangeText={handleNumberOfGuestsChange}
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          {errors.numberOfGuests && (
            <Text style={styles.errorText}>{errors.numberOfGuests}</Text>
          )}
        </View>
      </View>

      <CustomButton title="Next" onPress={handleNext} width="95%" />

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
  },
  sectionContainer: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
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
  label: {
    marginBottom: 5,
    fontWeight: '700',
    fontSize: 12,
    color: 'black',
  },
  input: {
    height: 56,
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eef3ef',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Quicksand-Bold',
  },
  inputContainer: {
    marginTop: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BookingStepOne;
