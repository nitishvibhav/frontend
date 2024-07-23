import React, { useState } from 'react';
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
import { Calendar } from 'react-native-calendars';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';

const BookingStepOne = ({ navigation, route }) => {
  const [data, setData] = useState(route.params?.data || {});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [checkIn, setCheckIn] = useState('CHECK-IN DATE');
  const [checkOut, setCheckOut] = useState('CHECK-OUT DATE');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];

  const handlePressCheckin = (day) => {
    setCheckIn(day.dateString);
    setData((prevData) => ({
      ...prevData,
      checkIn: day.dateString,
    }));
    setIsModalVisible(false);
  };

  const handlePressCheckOut = (day) => {
    setCheckOut(day.dateString);
    setData((prevData) => ({
      ...prevData,
      checkOut: day.dateString,
    }));
    setIsModalVisible1(false);
  };

  const handleNumberOfRoomsChange = (text) => {
    setNumberOfRooms(text);
    setData((prevData) => ({
      ...prevData,
      numberOfRooms: text,
    }));
  };
  

  const handleNext = () => {
    navigation.navigate('steptwo', {
      data: { ...data, checkIn, checkOut, numberOfRooms },
    });

    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Booking Info</Text>
        <View style={styles.row}>
          <View style={{ width: '49%' }}>
            <CustomTouchableOpacity
              label="CHECK-IN DATE"
              icon={imagePath.checkIn}
              text={checkIn}
              width="100%"
              onPress={() => setIsModalVisible(true)}
            />
          </View>
          <View style={{ width: '49%' }}>
            <CustomTouchableOpacity
              label="CHECK-OUT DATE"
              icon={imagePath.checkOut}
              text={checkOut}
              width="100%"
              onPress={() => setIsModalVisible1(true)}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Number of Rooms"
          value={numberOfRooms}
          onChangeText={handleNumberOfRoomsChange}
          keyboardType="numeric"
        />
      </View>

      <CustomButton title="Next" onPress={handleNext} width="95%" />

      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <Calendar
                onDayPress={handlePressCheckin}
                markedDates={{ [checkIn]: { selected: true } }}
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
        onRequestClose={() => setIsModalVisible1(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible1(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <Calendar
                onDayPress={handlePressCheckOut}
                markedDates={{ [checkOut]: { selected: true } }}
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
    marginBottom: 15,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
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
