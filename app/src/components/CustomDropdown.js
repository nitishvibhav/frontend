import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import imagePath from '../assets/images/imagePath';

const CustomDropdown = ({icon, text, text2, data, value, onChange}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholder={text2}
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          onChange={onChange}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          renderRightIcon={() => (
            <Image
              source={imagePath.Dropdown}
              style={styles.arrowIcon}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dadada',
    alignItems: 'center',
    backgroundColor: '#eef3ef',
    padding: 10,
    width: '49%',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 11,
    color: 'gray',
  },
  dropdown: {
    backgroundColor: '#eef3ef',
    width: '90%',
    height: 22,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight:'800'
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
        fontWeight:'700'
  },
  itemTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  arrowIcon:{
    height:14,
    width:14,
    
  }
});
