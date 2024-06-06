import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image,Linking} from 'react-native';
import imagePath from '../assets/images/imagePath';

const FloatingButton = ({phone}) => {
const handleCall = () => {
  Linking.openURL(`tel:${phone}`);
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
    backgroundColor: 'white',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, 
  },
});

export default FloatingButton;
