import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {logoutUser} from '../../redux/user/action';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../assets/images/imagePath';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user} = useSelector(state => state.loginReducer);
  console.log(user, 'dfghj.........');

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <Image source={imagePath.nextIcon} style={{height: 16, width: 16}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: 800}}>My Profile</Text>
        </View>
        <Text style={{color: '#2a74d7', fontSize: 16, fontWeight: 600}}>
          SAVE
        </Text>
      </View>
      <View
        style={{
          height: 90,
          width: 90,
          borderRadius: 50,
          backgroundColor: '#e0e3ea',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}></View>
      <Text
        style={{
          color: '#2a74d7',
          fontWeight: 700,
          alignSelf: 'center',
          marginVertical: 15,
          fontSize: 16,
        }}>
        {user.result.fullName}
      </Text>
      <View
        style={{backgroundColor: 'white', marginTop: 10, paddingBottom: 10}}>
        <Text
          style={{
            color: '#717171',
            fontWeight: 400,
            marginLeft: 20,
            marginTop: 10,
          }}>
          PERSONAL INFORMATION
        </Text>
        <View style={styles.textinputView}>
          <Image source={imagePath.alarmIcon} style={{height: 20, width: 20}} />
          <Text>Email</Text>
        </View>
        <View style={styles.textinputView}>
          <TextInput placeholder="Email" placeholderTextColor={'#505152'} />
        </View>
        <View style={styles.textinputView}>
          <TextInput
            placeholder="Mobile No."
            placeholderTextColor={'#505152'}
          />
        </View>
        <View style={styles.textinputView}>
          <TextInput
            placeholder="Designation"
            placeholderTextColor={'#505152'}
          />
        </View>
      </View>
      <View
        style={{backgroundColor: 'white', marginTop: 20, paddingBottom: 10}}>
        <Text
          style={{
            color: '#717171',
            fontWeight: 400,
            marginLeft: 20,
            marginTop: 10,
          }}>
          HOTEL INFORMATION
        </Text>
        <View style={styles.textinputView}>
          <TextInput
            placeholder="Hotel Name"
            placeholderTextColor={'#505152'}
          />
        </View>
        <View style={styles.textinputView}>
          <TextInput placeholder="Address" placeholderTextColor={'#505152'} />
        </View>
        <View style={styles.textinputView}>
          <TextInput
            placeholder="Hotel Website"
            placeholderTextColor={'#505152'}
          />
        </View>
        <View style={styles.textinputView}>
          <TextInput
            placeholder="Land Line Number"
            placeholderTextColor={'#505152'}
          />
        </View>
        <View style={styles.textinputView}>
          <TextInput placeholder="City" placeholderTextColor={'#505152'} />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          marginBottom: 20,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}
        onPress={handleLogout}>
        <Text
          style={{
            color: '#2275df',
            fontWeight: 700,
            marginLeft: 10,
            fontSize: 16,
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  textinputView: {
    width: '90%',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#eef3ef',
  },
});
