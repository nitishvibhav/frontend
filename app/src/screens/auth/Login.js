import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Pressable,
    StyleSheet,
  } from 'react-native';
  import {React, useState,} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import CustomButton from '../../components/CustomButton';
  
  const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
      <View style={styles.mainContainer}>
        <Image
          source={require('../../../assets/images/login_app.png')}
          style={styles.loginImage}
        />
        <Text style={styles.innerContainer}>Log in to your account</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email"
          style={styles.textinput}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.textinput2}
        />
  
        <View style={styles.innerContainerView}>
          <Text style={{fontSize: 12,  color:'#000'}}>Remember me</Text>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{fontSize: 12, color:'#000',}}>Forgotten Password?</Text>
          </Pressable>
          
        </View>
       <CustomButton title="Login" width='90%' />
        <View style={styles.orView}>
          <Text style={{ color:'#000'}}>OR</Text>
        </View>
        <TouchableOpacity style={styles.loginGoogle} >
          <View style={styles.loginGoogleView}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent:'center'
              }}>
              
              <Text style={styles.loginGoogleText}>Log in with Google</Text>
            </View>
          </View>
        </TouchableOpacity>
       
  
        <Text style={styles.dontHaveText}>
          Don't have an account?{' '}
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </Text>
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
      marginBottom:10
    },
    innerContainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 20,
      color:'#000',
  
    },
    textinput: {
      width: '90%',
      backgroundColor: '#eef3ef',
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontFamily:'Quicksand-Regular',
      color:'black',
    
    },
    textinput2: {
      width: '90%',
      backgroundColor: '#eef3ef',
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontFamily:'Quicksand-Regular',
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
     alignItems:'center'
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
      alignItems:'center'
    },
    loginGoogleText: {
      fontSize: 16,
      alignSelf: 'center',
      marginLeft: 20,
      color:'#000',
      fontWeight:'600',
      fontFamily:'Quicksand-Bold'
    },
    dontHaveText: {
      alignSelf: 'center',
      fontSize: 12,
      marginTop: 10,
      color:'#000'
    },
    signUpText: {
      color: 'orange',
      textDecorationLine: 'underline',
      fontSize: 12,
      fontFamily:'Quicksand-Bold',
    },
    
  });
  
  export default Login;
  