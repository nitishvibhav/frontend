import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

const FloatingButton = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("RoomBooking")}>
        <Image
          source={require('../../assets/images/pencil.png')}
          style={{height: 20, width: 20}}
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
