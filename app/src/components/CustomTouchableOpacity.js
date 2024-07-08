import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import imagePath from '../assets/images/imagePath';

const CustomTouchableOpacity = ({onPress, icon, text, width, label}) => {
  return (
    <View>
      <Text style={{marginTop: 5, fontWeight: '700'}}>{label}</Text>
      <TouchableOpacity
        style={[styles.container, {width: width}]}
        onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={icon} style={styles.iconStyle} />
          <Text style={styles.textInput}>{text}</Text>
        </View>
        <Image
          source={imagePath.Dropdown}
          style={{height: 28, width: 28, tintColor: 'black'}}
        />
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
    padding:10,
    height: 40,
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
    color: '#7b7d7a',
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
