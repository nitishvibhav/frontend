import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import CalendarComponent from '../components/CalendarComponent';
import CalendarComponent1 from '../components/CalendarComponent1';
import PriceBreakupCard from '../components/PriceBreakupCard';

const RoomBooking = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFile, setSelectedFile] = useState(0);
  const [person, setPerson] = useState(0);
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(0);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res);
      setSelectedFile2(res);
      console.log('Selected File:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  const RoomOptions = [
    {label: 'Select Room No.', value: 'Select Room No.'},
    {label: 101, value: 101},
    {label: 102, value: 102},
    {label: 103, value: 103},
    {label: 104, value: 104},
    {label: 105, value: 105},
    {label: 106, value: 106},
  ];

  const handleNameChange = text => {
    setName(text);
    if (submitted && !text.trim()) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!text.trim()) {
      setNameError('Name is required');
    } else {
      // Perform submission logic
      alert('Form submitted successfully');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.labelview}>
          <Text style={styles.label}>Full Name</Text>
          {submitted &&
            !text.trim()(
              <Text style={{color: 'red', fontWeight: '700'}}>
                Name is required
              </Text>,
            )}
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={handleNameChange}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          placeholderTextColor="gray"
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Phone No.</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Mobile No."
          placeholderTextColor="gray"
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Address</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Address"
          placeholderTextColor="gray"
        />

        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Arrival Date</Text>
            </View>
            <CalendarComponent1 />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Departure Date</Text>
            </View>
            <CalendarComponent />
          </View>
        </View>
        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Total Person</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={person}
                onValueChange={itemValue => setPerson(itemValue)}>
                <Picker.Item label="Total Person" value=" " />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Select Room Type</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={selectedRoomType}
                onValueChange={itemValue => setSelectedRoomType(itemValue)}>
                <Picker.Item label="Select Room Type" value="" />
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Double" value="double" />
                <Picker.Item label="Deluxe" value="deluxe" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Select Room No.</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={selectedRoom}
                onValueChange={itemValue => setSelectedRoom(itemValue)}>
                {RoomOptions.map(option => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Select Gender</Text>
            </View>
            <View style={styles.textinput}>
              <Picker
                selectedValue={selectedGender}
                onValueChange={itemValue => setSelectedGender(itemValue)}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.labelview}>
          <Text style={styles.label}>Upload Document</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={pickFile} style={styles.touchableopacity}>
            <Text>Selected File {selectedFile[{}]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFile} style={styles.touchableopacity}>
            <Text>Selected File {selectedFile2[{}]}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelview}>
          <Text style={styles.label}>Note</Text>
        </View>
        <TextInput
          style={styles.textinput}
          multiline={true}
          numberOfLines={1}
          placeholder="note"
          placeholderTextColor="gray"
        />
        <CustomButton title="Add Booking" width="95%" onPress={handleSubmit} />

       
      </View>
      <PriceBreakupCard/>
    </ScrollView>
  );
};

export default RoomBooking;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  textheading: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  textinput: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  genderText: {
    marginRight: 10,
    color: 'black',
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  labelview: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textinput2: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textinput3: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
  },
  containerhalf: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  button: {
    marginVertical: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
  },
  textinput1: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
    paddingVertical: 15,
  },
  touchableopacity: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
  },
});
