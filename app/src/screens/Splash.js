import {View, Image, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen'); 
    }, 200); 
  }, []);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Splash;
