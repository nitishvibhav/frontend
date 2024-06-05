import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import imagePath from '../assets/images/imagePath';

const FloatingButton = () => {
  const phoneNumber = '8210023654';
const handleCall = () => {
  Linking.openURL(`tel:${phoneNumber}`);
};
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCall}>
        <Image
          source={imagePath.callIcon}
          style={{height: 25, width: 25}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    flex:1
  },
  button: {
    backgroundColor: 'white', // Change this to your preferred color
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android elevation for shadow
  },
});

export default FloatingButton;
