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
  Image,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import imagePath from '../../assets/images/imagePath';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import MultiSelectPicker from '../../components/MultiSelectPicker';
import {getAminitiesCategoryDetails} from '../../redux/amenitiesCategory/action';
import {postFilterationDetails} from '../../redux/filteration/action';

const UpdateBooking = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [checkIn, setCheckIn] = useState('CHECK-IN DATE');
  const [checkOut, setCheckOut] = useState('CHECK-OUT DATE');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [errors, setErrors] = useState({});
  const currentDate = new Date().toISOString().split('T')[0];
  const [bookingStatus, setBookingStatus] = useState('PENDING');
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const [activeGuestIndex, setActiveGuestIndex] = useState(null);
  const [responseData, setResponseData] = useState([]);

  const [data, setData] = useState({
    fullName: '',
    dob: 'dd/mm/yyyy',
    gender: '',
    nationality: '',
    phoneNumber: '',
    email: '',
    city: '',
    location: '',
    country: '',
    additionalGuests: [],
    aminities: [],
    relation: '',
    purpose: '',
  });
  useEffect(() => {
    if (item) {
      setData(
        {
          fullName: item.fullName,
          email: item.email,
          phoneNumber: item.phoneNumber,
          username: item.username,
          nationality: item.nationality,
          gender: item.gender,
          city: item.address.city,
          country: item.address.country,
          location: item.address.location,
          numberOfRooms: item.numberOfRooms,
          purpose: item.purpose,
          relation: item.relation,
          dob: item.dob,
        },
        // (setNumberOfGuests = item.totalGuests),
        // (setNumberOfAdults = item.adult),
        // (setNumberOfChildren = item.child),
        // (setCheckIn = item.checkIn),
        // (setCheckOut = item.checkOut),
      );
    }
  }, [item]);

  const dispatch = useDispatch();
  const {amenitiesCategory} = useSelector(
    state => state.amenitiesCategoryReducer,
  );

  useEffect(() => {
    dispatch(getAminitiesCategoryDetails());
  }, [dispatch]);

  const amenitiesOptions =
    amenitiesCategory?.result?.map(item => ({
      label: item.title,
      value: item.title,
    })) || [];

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

  const {user} = useSelector(state => state.loginReducer);
  const fetchData = async () => {
    const formdata = {
      hotelId: user.result.username,
      checkIn: checkIn,
      checkOut: checkOut,
      bedCapacity: numberOfGuests,
    };
    console.log('Dispatching with data:', formdata);
    try {
      const response = await dispatch(postFilterationDetails(formdata));
      console.log('Full Response:', response);
      setResponseData(response.value.data);
    } catch (error) {
      console.log(error, 'error is here');
    }
  };

  const handlePressDob = day => {
    if (activeGuestIndex !== null) {
      handleGuestFieldChange(activeGuestIndex, 'dob', day.dateString);
      setActiveGuestIndex(null);
    } else {
      setData(prevData => ({
        ...prevData,
        dob: day.dateString,
      }));
    }
    setIsModalVisible(false);
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

  const paymentStatusData = ['PENDING', 'SUCCESS', 'PARTIALLY-PAID'];
  const bookingStatusData = [
    'CHECK-IN',
    'CHECKED-OUT',
    'JUST-CHECKED-OUT',
    'PENDING',
    'RESERVED',
  ];

  const toggleAccordion = index => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
  };

  const route = useRoute();
  const item = route.params?.item;
  console.log(item, 'data is here ......');

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
  const navigation = useNavigation();
  const updateRoomStatus = async () => {
    try {
      const roomData = data.selectedItems.map(item => ({
        roomId: item._id,
        roomData: {
          roomStatus:
            data.bookingStatus === 'CHECK-IN' ? 'BOOKED' : data.bookingStatus,
          reservations: [
            {
              startDate: data.checkIn,
              endDate: data.checkOut,
            },
          ],
        },
      }));

      for (const room of roomData) {
        const res = await dispatch(updateRoom(room.roomData, room.roomId));
        if (res.status !== 200) {
          console.log('Failed to update room status for roomId:', room.roomId);
        }
      }
      console.log('Room status updated successfully');
    } catch (error) {
      console.log('Error updating room status:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Booking and Payment Status Accordion */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleAccordion(0)}>
        <Text style={styles.accordionTitle}>Booking and Payment Status</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 0 && (
        <View style={styles.accordionContent}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Booking Status</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={bookingStatus}
                onValueChange={(itemValue, itemIndex) =>
                  setBookingStatus(itemValue)
                }
                style={styles.picker}>
                {bookingStatusData.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Payment Status</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={paymentStatus}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentStatus(itemValue)
                }
                style={styles.picker}>
                {paymentStatusData.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}

      {/* Date and Number of Guests Accordion */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleAccordion(1)}>
        <Text style={styles.accordionTitle}>Date and Number of Guests</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 1 && (
        <View style={styles.accordionContent}>
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
                {errors.date && (
                  <Text style={styles.errorText}>{errors.date}</Text>
                )}
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, {width: '49%'}]}>
                <Text style={styles.label}>NUMBER OF ADULT</Text>
                <View style={styles.input}>
                  <Image style={styles.iconinput} source={imagePath.guests} />
                  <TextInput
                    placeholder="ADULT"
                    value={numberOfAdults}
                    onChangeText={handleNumberOfAdultsChange}
                    keyboardType="numeric"
                    placeholderTextColor="black"
                  />
                </View>
                {errors.numberOfAdults && (
                  <Text style={styles.errorText}>{errors.numberOfAdults}</Text>
                )}
              </View>
              <View style={[styles.inputContainer, {width: '49%'}]}>
                <Text style={styles.label}>NUMBER OF CHILDREN</Text>
                <View style={styles.input}>
                  <Image style={styles.iconinput} source={imagePath.guests} />
                  <TextInput
                    placeholder="CHILDREN"
                    value={numberOfChildren}
                    onChangeText={handleNumberOfChildrenChange}
                    keyboardType="numeric"
                    placeholderTextColor="black"
                  />
                </View>
                {errors.numberOfChildren && (
                  <Text style={styles.errorText}>
                    {errors.numberOfChildren}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TOTAL NUMBER OF GUESTS</Text>
              <View style={styles.input}>
                <Image style={styles.iconinput} source={imagePath.guests} />
                <TextInput
                  placeholder="TOTAL GUESTS"
                  value={numberOfGuests}
                  onChangeText={handleNumberOfGuestsChange}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                />
              </View>
              {errors.numberOfGuests && (
                <Text style={styles.errorText}>{errors.numberOfGuests}</Text>
              )}
            </View>
          </View>
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
                  <Button
                    title="Close"
                    onPress={() => setIsModalVisible(false)}
                  />
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
                  <Button
                    title="Close"
                    onPress={() => setIsModalVisible1(false)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => fetchData() && toggleAccordion(4)}>
        <Text style={styles.accordionTitle}>Room Details</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 4 && (
        <View style={styles.accordionContent}>
          {responseData &&
          responseData.result &&
          Array.isArray(responseData.result) ? (
            responseData.result.map(item => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#E0E0E0',
                  padding: 10,
                  borderRadius: 6,
                  marginTop: 5,
                }}
                key={item._id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Room number : {item.roomNumber}</Text>
                  <Text>Room Category . 106</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Bed Capacity : 2</Text>
                  <Text>Price : 5000</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleAccordion(2)}>
        <Text style={styles.accordionTitle}>Guest Details</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 2 && (
        <View style={styles.accordionContent}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.inputContainerGuest}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                onChangeText={text => setData({...data, country: text})}
                value={data.country}
              />
            </View>

            <View style={styles.inputContainerGuest}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                onChangeText={text => setData({...data, city: text})}
                value={data.city}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.inputContainerGuest}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={text => setData({...data, location: text})}
                value={data.location}
              />
            </View>
            <View style={styles.inputContainerGuest}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={text => setData({...data, phoneNumber: text})}
                value={data.phoneNumber}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.inputContainerGuest}>
              <Text style={styles.label}>Nationality</Text>
              <TextInput
                style={styles.input}
                placeholder="Nationality"
                onChangeText={text => setData({...data, nationality: text})}
                value={data.nationality}
              />
            </View>
            <View style={styles.inputContainerGuest}>
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
                <TouchableWithoutFeedback
                  onPress={() => setIsModalVisible(false)}>
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
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setData({...data, email: text})}
              value={data.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={text => setData({...data, fullName: text})}
              value={data.fullName}
            />
          </View>
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
            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleAccordion(3)}>
        <Text style={styles.accordionTitle}>Additional Guest Details</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 3 && (
        <View style={styles.accordionContent}>
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
                    setActiveGuestIndex(index);
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
        </View>
      )}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleAccordion(5)}>
        <Text style={styles.accordionTitle}>Amenities & other Details</Text>
        <Image
          style={{height: 28, width: 28, tintColor: 'black'}}
          source={imagePath.Dropdown}
        />
      </TouchableOpacity>
      {activeAccordionIndex === 5 && (
        <View style={styles.accordionContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Relation</Text>
            <TextInput
              style={styles.input}
              placeholder="Relation"
              onChangeText={text => setData({...data, relation: text})}
              value={data.relation}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Purpose</Text>
            <TextInput
              style={styles.input}
              placeholder="Purpose"
              onChangeText={text => setData({...data, purpose: text})}
              value={data.purpose}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amenities</Text>
            <MultiSelectPicker
              options={amenitiesOptions}
              selectedValues={data.aminities}
              onValueChange={text => setData({...data, aminities: text})}
            />
            {errors.amenities && (
              <Text style={styles.errorText}>{errors.amenities}</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  accordionHeader: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignContent: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionContainer: {
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
  iconinput: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginRight: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#eef3ef',
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
    flexDirection: 'row',
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
  inputContainerGuest: {
    marginTop: 14,
    width: '49%',
  },
  inputContainer: {
    marginTop: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  fieldContainer: {
    marginVertical: 10,
  },
  fieldValue: {
    fontSize: 14,
    color: 'black',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
});

export default UpdateBooking;
