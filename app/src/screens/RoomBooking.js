import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import CalendarComponent from '../components/CalendarComponent';
import CalendarComponent1 from '../components/CalendarComponent1';
import PriceBreakupCard from '../components/PriceBreakupCard';
import axios from 'axios';
import * as request from '../../request';
import {useDispatch, useSelector} from 'react-redux';
import {postBooking} from '../redux/booking/bookingAction';

const RoomBooking = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [person, setPerson] = useState('');
  const [nameError, setNameError] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [rooms, setRooms] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [note, setNote] = useState('');
  const {success} = useSelector(state => state.bookingReducer);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsCategoryRes, roomsRes] = await axios.all([
          axios.get('http://97.74.86.231:3001/api/v1/en/rooms-category/'),
          axios.get('http://97.74.86.231:3001/api/v1/en/rooms'),
        ]);

        const titles = roomsCategoryRes.data.result.map(item => item.title);
        setTitles(titles);
        setSelectedTitle(titles[0]);

        const rooms = roomsRes.data.result.filter(
          item => item.roomStatus === 'Vacant',
        );
        setRooms(rooms);
        setSelectedRoom(rooms[0]?.roomNumber || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = text => {
    setName(text);
    if (submitted && !text.trim()) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

 

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.labelview}>
          <Text style={styles.label}>Full Name</Text>
          {submitted && !name.trim() && (
            <Text style={{color: 'red', fontWeight: '700'}}>
              Name is required
            </Text>
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
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Phone No.</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Mobile No."
          placeholderTextColor="gray"
          value={phone}
          onChangeText={setPhone}
        />
        <View style={styles.labelview}>
          <Text style={styles.label}>Address</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Address"
          placeholderTextColor="gray"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.containerhalf}>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Arrival Date</Text>
            </View>
            <CalendarComponent1 onChange={setArrivalDate} />
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.labelview}>
              <Text style={styles.label}>Departure Date</Text>
            </View>
            <CalendarComponent onChange={setDepartureDate} />
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
                <Picker.Item label="Total Person" value="" />
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
                selectedValue={selectedTitle}
                onValueChange={itemValue => setSelectedTitle(itemValue)}>
                {titles.map((title, index) => (
                  <Picker.Item key={index} label={title} value={title} />
                ))}
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
                {rooms.map(room => (
                  <Picker.Item
                    key={room._id}
                    label={room.roomNumber.toString()}
                    value={room.roomNumber}
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
            <Text>{selectedFile ? selectedFile.name : 'Select File'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFile} style={styles.touchableopacity}>
            <Text>{selectedFile2 ? selectedFile2.name : 'Select File'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelview}>
          <Text style={styles.label}>Note</Text>
        </View>
        <TextInput
          style={styles.textinput}
          multiline={true}
          numberOfLines={1}
          placeholder="Note"
          placeholderTextColor="gray"
          value={note}
          onChangeText={setNote}
        />
        <CustomButton title="Add Booking" width="95%"  />
      </View>
      <PriceBreakupCard />
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
