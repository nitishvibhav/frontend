import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

const CustomTouchableOpacity = ({onPress, icon, text, width}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {width: width}]}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          height: 18,
          width: 18,
          alignSelf: 'center',
          marginRight: 10,
        }}
      />
        <Text
          style={{
            fontSize: 14,
            fontWeight:'500'
          }}>
          {text}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dadada',
    alignItems: 'center',
    backgroundColor: '#eef3ef',
    padding: 10,
  },
});

export default CustomTouchableOpacity;
