import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { logoutUser, updateUserDetails } from '../../redux/user/action'; // Import your action creator
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../assets/images/imagePath';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.loginReducer);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    username: '',
    group: '',
    organizationName: '',
    nationality: '',
    gender: '',
    city: '',
    country: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.result.fullName,
        email: user.result.email,
        contactNumber: user.result.contactNumber.toString(),
        username: user.result.username,
        group: user.result.group,
        organizationName: user.result.organizationName,
        nationality: user.result.nationality,
        gender: user.result.gender,
        city: user.result.address.city,
        country: user.result.address.country,
        location: user.result.address.location,
      });
    }
  }, [user]);

  const handleTextChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = () => {
    const data = profileData
    console.log(data,"form data ")
    dispatch(updateUserDetails(data, user.result._id)); // Assuming _id is the user ID field
  };

  // Fields for personal information section
  const personalInfoFields = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'contactNumber', label: 'Contact Number' },
    { key: 'gender', label: 'Gender' },
    { key: 'nationality', label: 'Nationality' },
  ];

  // Fields for address details section
  const addressFields = [
    { key: 'organizationName', label: 'Organization Name' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={imagePath.nextIcon} style={styles.icon} />
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>SAVE</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage} />
        <Text style={styles.fullName}>{profileData.fullName}</Text>
        <Text style={styles.group}>{profileData.group}</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {personalInfoFields.map((field) => (
          <View key={field.key} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${field.label}`}
              placeholderTextColor="#505152"
              value={profileData[field.key]}
              onChangeText={(value) => handleTextChange(field.key, value)}
            />
          </View>
        ))}
      </View>

      {/* Address Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Details</Text>
        {addressFields.map((field) => (
          <View key={field.key} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${field.label}`}
              placeholderTextColor="#505152"
              value={profileData[field.key]}
              onChangeText={(value) => handleTextChange(field.key, value)}
            />
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  icon: {
    height: 16,
    width: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a74d7',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#e0e3ea',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  group: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a74d7',
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: '40%',
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a74d7',
  },
});
