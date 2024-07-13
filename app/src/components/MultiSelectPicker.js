import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const MultiSelectPicker = ({ options, selectedValues, onValueChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (value) => {
    const index = selectedValues.indexOf(value);
    if (index > -1) {
      onValueChange(selectedValues.filter(item => item !== value));
    } else {
      onValueChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value) => {
    onValueChange(selectedValues.filter(item => item !== value));
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item.value)}>
      <View style={styles.optionContainer}>
        <CheckBox value={selectedValues.includes(item.value)} onValueChange={() => handleSelect(item.value)} />
        <Text style={styles.optionLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.pickerContainer}>
        {selectedValues.length > 0 ? (
          <View style={styles.selectedValuesContainer}>
            {selectedValues.map(value => (
              <View key={value} style={styles.selectedValueItem}>
                <Text style={styles.selectedValueText}>{value}</Text>
                <TouchableOpacity onPress={() => handleRemove(value)}>
                  <Text style={styles.closeButton}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.pickerText}>Select Amenities</Text>
        )}
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList data={options} renderItem={renderOption} keyExtractor={(item) => item.value} />
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#eef3ef',
    marginBottom: 20,
  },
  pickerText: {
    color: '#333',
  },
  selectedValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedValueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical:7,
    paddingHorizontal:15,
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedValueText: {
    color: 'white',
    marginRight: 10,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionLabel: {
    marginLeft: 10,
    color: '#333',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MultiSelectPicker;
