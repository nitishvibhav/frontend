// CustomModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image
} from 'react-native';
import CustomButton from './CustomButton';
import imagePath from '../assets/images/imagePath';

const CustomModal = ({ visible, onClose, onSave, fields, title }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Image source={imagePath.closeIcon} style={styles.closeIcon} />
            </Pressable>
          </View>
          {fields.map((field, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={field.placeholder}
              onChangeText={(value) => handleChange(field.name, value)}
              value={formData[field.name] || ''}
            />
          ))}
          <CustomButton width="90%" title="Save & Close" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    bottom:0,
    position:'relative'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  closeButton: {
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  closeIcon: {
    height: 12,
    width: 12,
    tintColor: 'orange',
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderColor: "#e3e3e3",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    color: "#a9a9a9",
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default CustomModal;
