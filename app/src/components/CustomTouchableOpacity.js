import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import imagePath from '../assets/images/imagePath';

const CustomTouchableOpacity = ({onPress, icon, text, width, label}) => {
  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity
        style={[styles.container, {width: width}]}
        onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={icon} style={styles.iconStyle} />
          <Text style={styles.textInput}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dadada',
    alignItems: 'center',
    backgroundColor: '#eef3ef',
    padding: 10,
    height: 56,
    justifyContent: 'space-between',
  },
  labelText: {
    marginTop: 0,
    fontWeight: '700',
    fontSize: 12,
    color: 'black',
  },
  textInput: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
    marginRight: 5,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 2,
  },
  iconStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default CustomTouchableOpacity;
