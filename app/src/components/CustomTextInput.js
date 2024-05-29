import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomTextInput = () => {
  return (
    <TextInput
      style={styles.textinput}
      placeholder="Total Person"
      placeholderTextColor="gray"
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textinput: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 2,
  },
});
