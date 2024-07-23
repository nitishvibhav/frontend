import React, {useEffect, useState} from 'react';
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
import {Calendar} from 'react-native-calendars';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {
  getFilterationDetails,
  postFilterationDetails,
} from '../../redux/filteration/action';

const BookingStepTwo = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [activeGuestIndex, setActiveGuestIndex] = useState(null);

  const [data, setData] = useState({
    fullName: '',
    dob: 'dd/mm/yyyy',
    gender: '',
    nationality: '',
    phoneNumber: '',
    email: '',
    state: '',
    location: '',
    country: '',
    additionalGuests: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route.params?.nextPageData) {
      console.log('Data from previous page:', route.params.nextPageData);
      setData(prevData => ({
        ...prevData,
        ...route.params.nextPageData, // Spread previous page data
      }));
    } else {
      console.log('No data received from previous page');
    }
  }, [route.params?.nextPageData]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0];

  const handlePressDob = day => {
    if (activeGuestIndex !== null) {
      handleGuestFieldChange(activeGuestIndex, 'dob', day.dateString);
    } else {
      setData(prevData => ({
        ...prevData,
        dob: day.dateString,
      }));
    }
    setIsModalVisible(false);
  };

  const handleNext = () => {
    let validationErrors = {};

    // Validate primary guest details
    if (!data.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }
    if (data.dob === 'dd/mm/yyyy') {
      validationErrors.dob = 'Date of Birth is required';
    }
    if (!data.gender) {
      validationErrors.gender = 'Gender is required';
    }
    if (!data.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number is required';
    }
    if (!data.email.trim()) {
      validationErrors.email = 'Email is required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        validationErrors.email = 'Email is invalid';
      }
    }
    if (!data.state.trim()) {
      validationErrors.state = 'State is required';
    }
    if (!data.country.trim()) {
      validationErrors.country = 'Country is required';
    }
    if (!data.location.trim()) {
      validationErrors.location = 'Location is required';
    }
    if (!data.nationality.trim()) {
      validationErrors.nationality = 'Nationality is required';
    }

    // Validate additional guests
    data.additionalGuests.forEach((guest, index) => {
      if (!guest.name.trim()) {
        validationErrors[`additionalGuestName_${index}`] =
          'Full Name is required';
      }
      if (guest.dob === 'DOB') {
        validationErrors[`additionalGuestDob_${index}`] =
          'Date of Birth is required';
      }
      if (!guest.gender) {
        validationErrors[`additionalGuestGender_${index}`] = 'Gender is required';
      }
      if (!guest.age.trim()) {
        validationErrors[`additionalGuestAge_${index}`] = 'Age is required';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const combinedData = {
        ...route.params.nextPageData,
        ...data,
      };
      navigation.navigate('stepthree', {data: combinedData});
    }
  };

  const handleCheckboxChange = fieldName => {
    setData(prevData => ({
      ...prevData,
      gender: fieldName,
    }));
  };

  const addGuest = () => {
    setData(prevData => ({
      ...prevData,
      additionalGuests: [
        ...prevData.additionalGuests,
        {
          name: '',
          dob: 'DOB',
          age: '',
          gender: '',
        },
      ],
    }));
  };

  const handleGuestFieldChange = (index, field, value) => {
    setData(prevData => {
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

  const deleteGuest = index => {
    setData(prevData => {
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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={text => setData({...data, fullName: text})}
            value={data.fullName}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>
        <CustomTouchableOpacity
          icon={imagePath.alarmIcon}
          label="Date of Birth"
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
                  markedDates={{[data.dob]: {selected: true}}}
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
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={data.gender}
              onValueChange={(itemValue, itemIndex) =>
                setData({...data, gender: itemValue})
              }>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>
      </View>
      <View style={[styles.sectionContainer, {marginTop: 10}]}>
        <Text style={styles.sectionTitle}>Additional Guests</Text>
        {data.additionalGuests.map((guest, index) => (
          <View key={index} style={styles.additionalGuestContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={text =>
                  handleGuestFieldChange(index, 'name', text)
                }
                value={guest.name}
              />
              {errors[`additionalGuestName_${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`additionalGuestName_${index}`]}
                </Text>
              )}
            </View>
            <CustomTouchableOpacity
              icon={imagePath.alarmIcon}
              label="DOB"
              text={guest.dob}
              width="100%"
              onPress={() => {
                setActiveGuestIndex(index); // Set the active guest index
                setIsModalVisible(true);
              }}
            />
            {errors[`additionalGuestDob_${index}`] && (
              <Text style={styles.errorText}>
                {errors[`additionalGuestDob_${index}`]}
              </Text>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={guest.gender}
                  onValueChange={(itemValue, itemIndex) =>
                    handleGuestFieldChange(index, 'gender', itemValue)
                  }>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
              {errors[`additionalGuestGender_${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`additionalGuestGender_${index}`]}
                </Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={text =>
                  handleGuestFieldChange(index, 'age', text)
                }
                value={guest.age}
              />
              {errors[`additionalGuestAge_${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`additionalGuestAge_${index}`]}
                </Text>
              )}
            </View>
            <View style={styles.deleteButtonContainer}>
              <Button
                title="Delete"
                onPress={() => deleteGuest(index)}
                color="#FF6347"
              />
            </View>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <CustomButton title="Add Guest" onPress={addGuest} width="100%" />
        </View>
      </View>

      <View style={[styles.sectionContainer, {marginTop: 10}]}>
        <Text style={styles.sectionTitle}>Contact Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={text => setData({...data, phoneNumber: text})}
            value={data.phoneNumber}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setData({...data, email: text})}
            value={data.email}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="State"
              onChangeText={text => setData({...data, state: text})}
              value={data.state}
            />
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
          </View>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              onChangeText={text => setData({...data, country: text})}
              value={data.country}
            />
            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={text => setData({...data, location: text})}
              value={data.location}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
          </View>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Text style={styles.label}>Nationality</Text>
            <TextInput
              style={styles.input}
              placeholder="Nationality"
              onChangeText={text => setData({...data, nationality: text})}
              value={data.nationality}
            />
            {errors.nationality && (
              <Text style={styles.errorText}>{errors.nationality}</Text>
            )}
          </View>
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
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginTop: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#eef3ef',
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
    backgroundColor: '#4CAF50',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BookingStepTwo;
