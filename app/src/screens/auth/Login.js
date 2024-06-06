import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {React, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {get} from 'lodash';
import {login} from '../../redux/user/action';
import imagePath from '../../assets/images/imagePath';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(data, 'data');

  const loginHandler = async () => {
    const res = await dispatch(login(data));
    const status = get(res, 'value.status');
    console.log('status', status);
    if (status === 200) {
      alert('Login Successfully');
      navigation.navigate('MainScreen');
    } else {
      console.log('res', res);
      alert('Invalied username or password...');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Image
        source={imagePath.loginPageImage}
        style={styles.loginImage}
      />
      <Text style={styles.innerContainer}>Log in to your account</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={styles.textinput}
        onChangeText={value => handleChange('email', value)}
        value={data.email}
      />
      <TextInput
        placeholder="Password"
        style={styles.textinput2}
        onChangeText={value => handleChange('password', value)}
        value={data.password}
        secureTextEntry={true}
      />

      <View style={styles.innerContainerView}>
        <Text style={{fontSize: 12, color: '#000'}}>Remember me</Text>
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{fontSize: 12, color: '#000'}}>Forgotten Password?</Text>
        </Pressable>
      </View>
      <CustomButton title="Login" width="90%" onPress={loginHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  loginImage: {
    height: 300,
    width: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    color: '#000',
  },
  textinput: {
    width: '90%',
    backgroundColor: '#eef3ef',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Quicksand-Regular',
    color: 'black',
  },
  textinput2: {
    width: '90%',
    backgroundColor: '#eef3ef',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Quicksand-Regular',
  },
  innerContainerView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignSelf: 'center',
  },

  orView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginGoogle: {
    marginTop: 15,
    width: '90%',
    borderRadius: 6,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eef3ef',
    paddingVertical: 10,
    alignItems: 'center',
  },
  googleImage: {
    height: 24,
    width: 24,
    alignSelf: 'center',
    marginLeft: 30,
  },
  loginGoogleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  loginGoogleText: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 20,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Quicksand-Bold',
  },
  dontHaveText: {
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 10,
    color: '#000',
  },
  signUpText: {
    color: 'orange',
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: 'Quicksand-Bold',
  },
});

export default Login;
