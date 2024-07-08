import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';

const BookingStepTwo = ({ navigation, route }) => {
  const [data, setData] = useState({
    ...route.params?.data,
    fullName: '',
    dob: '12/01/2001',
    age: '',
    gender: '', // Single selection for gender
    nationality: '',
    contactNumber: '',
    email: '',
    state: '',
    location: '',
    country: '',
    additionalGuests: [], // Array to hold additional guest details
  });
  console.log(data,"stepper data ")

  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0];

  const handlePressDob = (day) => {
    setData((prevData) => ({
      ...prevData,
      dob: day.dateString,
    }));
    setIsModalVisible(false);
  };

  const handleNext = () => {
    navigation.navigate('stepthree', { data });
  };

  const handleCheckboxChange = (fieldName) => {
    setData((prevData) => ({
      ...prevData,
      gender: fieldName,
    }));
  };

  const addGuest = () => {
    setData((prevData) => ({
      ...prevData,
      additionalGuests: [
        ...prevData.additionalGuests,
        {
          name: '',
          dob: 'DOB',
          age: '',
          gender: '', // Single selection for gender
        },
      ],
    }));
  };

  const handleGuestFieldChange = (index, field, value) => {
    setData((prevData) => {
      const updatedGuests = [...prevData.additionalGuests];
      updatedGuests[index] = {
        ...updatedGuests[index],
        [field]: value,
      };
      return {
        ...prevData,
        additionalGuests: updatedGuests,
      };
    });
  };

  const deleteGuest = (index) => {
    setData((prevData) => {
      const updatedGuests = [...prevData.additionalGuests];
      updatedGuests.splice(index, 1);
      return {
        ...prevData,
        additionalGuests: updatedGuests,
      };
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Personal Details Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={(text) => setData({ ...data, fullName: text })}
            value={data.fullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTouchableOpacity
            icon={imagePath.alarmIcon}
            label="DOB"
            text={data.dob}
            width="100%"
            onPress={() => setIsModalVisible(true)}
          />
          <Modal
            visible={isModalVisible}
            animationType="none"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.calendarContainer}>
                  <Calendar
                    onDayPress={handlePressDob}
                    markedDates={{ [data.dob]: { selected: true } }}
                    pastScrollRange={100}
                    minDate={'1900-01-01'}
                    maxDate={currentDate}
                  />
                  <Button
                    title="Close"
                    onPress={() => setIsModalVisible(false)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={(text) => setData({ ...data, gender: text })}
            value={data.gender}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={(text) => setData({ ...data, age: text })}
            value={data.age}
          />
        </View>
      </View>

      {/* Additional Guests Section */}
      <View style={[styles.sectionContainer, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>Additional Guests</Text>
        {data.additionalGuests.map((guest, index) => (
          <View key={index} style={styles.additionalGuestContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={(text) =>
                  handleGuestFieldChange(index, 'name', text)
                }
                value={guest.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTouchableOpacity
                icon={imagePath.alarmIcon}
                label="DOB"
                text={guest.dob}
                width="100%"
                onPress={() => {
                  // Implement modal for DOB selection for each guest if needed
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Gender"
                onChangeText={(text) =>
                  handleGuestFieldChange(index, 'gender', text)
                }
                value={guest.gender}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={(text) =>
                  handleGuestFieldChange(index, 'age', text)
                }
                value={guest.age}
              />
            </View>
            <View style={styles.deleteButtonContainer}>
              <Button
                title="Delete"
                onPress={() => deleteGuest(index)}
                color="#FF6347" // Adjust color if needed
              />
            </View>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Add Guest" onPress={addGuest} />
        </View>
      </View>

      {/* Contact Details Section */}
      <View style={[styles.sectionContainer, { marginTop: 20 }]}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { width: '49%' }]}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="State"
              onChangeText={(text) => setData({ ...data, state: text })}
              value={data.state}
            />
          </View>
          <View style={[styles.inputContainer, { width: '49%' }]}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              onChangeText={(text) => setData({ ...data, country: text })}
              value={data.country}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { width: '49%' }]}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={(text) => setData({ ...data, location: text })}
              value={data.location}
            />
          </View>
          <View style={[styles.inputContainer, { width: '49%' }]}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={styles.input}
              placeholder="Nationality"
              onChangeText={(text) => setData({ ...data, nationality: text })}
              value={data.nationality}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(text) => setData({ ...data, contactNumber: text })}
            value={data.contactNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setData({ ...data, email: text })}
            value={data.email}
            keyboardType="email-address"
          />
        </View>
      </View>

      <CustomButton
        title="Next"
        onPress={handleNext}
        width="100%"
        style={styles.buttonStyle}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Light background color for sections
    borderRadius: 5,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Adjust section title color if needed
  },
  inputContainer: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    color: '#333', // Adjust label color if needed
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  additionalGuestContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#4CAF50', // Example background color
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BookingStepTwo;
