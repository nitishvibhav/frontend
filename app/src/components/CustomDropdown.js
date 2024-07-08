import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import imagePath from '../assets/images/imagePath';

const CustomDropdown = ({ label, icon, placeholder, data, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownContainer}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholder={placeholder}
            data={data}
            labelField="value"
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
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dadada',
    alignItems: 'center',
    backgroundColor: '#eef3ef',
    padding: 10,
    width: '100%',
    height:44
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#eef3ef',
    width: '100%',
    height: 28,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '800',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  itemTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  arrowIcon: {
    height: 28,
    width: 28,
    tintColor:'black'
  },
});
