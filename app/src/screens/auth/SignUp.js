import React, {useState} from 'react';
import {View, Text, TextInput, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    console.log({email, password, name, password_confirmation});
    axios
      .post('http://192.168.1.6:8000/api/admin/register', {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        name: name,
      })
      .then(result => {
        console.log(result);
        console.log('success');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Sign Up for SAJILO App
        </Text>
      </View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Full Name"
        style={{
          width: '90%',
          backgroundColor: '#eef3ef',
          alignSelf: 'center',
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Your Email"
        style={{
          width: '90%',
          backgroundColor: '#eef3ef',
          alignSelf: 'center',
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Your Password"
        style={{
          width: '90%',
          backgroundColor: '#eef3ef',
          alignSelf: 'center',
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      />
      <TextInput
        value={password_confirmation}
        onChangeText={setPassword_confirmation}
        placeholder="Confirm Password"
        style={{
          width: '90%',
          backgroundColor: '#eef3ef',
          alignSelf: 'center',
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      />
      <CustomButton title="Sign Up" width="90%" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;
