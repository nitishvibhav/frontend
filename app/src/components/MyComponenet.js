import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Option 1", "Option 2"];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an Option</Text>
      <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => {
          setSelectedOption(selectedItem);
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text to show after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text to show for the row
          return item;
        }}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
      />
      {selectedOption && <Text style={styles.selectedText}>Selected: {selectedOption}</Text>}
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropdownRow: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
  },
  dropdownRowText: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});
