import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button as RNButton,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';

const BookingStepThree = ({ navigation, route }) => {
  const { data } = route.params; 
  const [purpose, setPurpose] = useState('');
  const [relation, setRelation] = useState('');
  const [amenities, setAmenities] = useState('');
  const [documents, setDocuments] = useState([]);


  const handleImagePicker = () => {
    const options = {
      title: 'Select Document',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        // Add selected image to documents array
        setDocuments([...documents, source]);
      }
    });
  };

 
  const renderDocuments = () => {
    return documents.map((document, index) => (
      <View key={index} style={styles.documentItem}>
        <Image source={document} style={styles.documentImage} />
        <TouchableOpacity onPress={() => handleRemoveDocument(index)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  // Function to remove selected document
  const handleRemoveDocument = index => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };

  const handleNext = () => {
    navigation.navigate('review', {
      data: {
        ...data,
        purpose,
        relation,
        amenities,
      },
    });
  };

  // Console log data when component renders
  console.log(data, "Data from previous page");

  return (
    <ScrollView style={styles.container}>
      {/* Purpose Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Purpose</Text>
        <TextInput
          style={styles.input}
          placeholder="Purpose"
          onChangeText={setPurpose}
          value={purpose}
          multiline
        />
      </View>

      {/* Relation Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Relation</Text>
        <TextInput
          style={styles.input}
          placeholder="Relation"
          onChangeText={setRelation}
          value={relation}
          multiline
        />
      </View>

      {/* Amenities Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <TextInput
          style={styles.input}
          placeholder="Amenities"
          onChangeText={setAmenities}
          value={amenities}
          multiline
        />
      </View>

      {/* Documents Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Documents</Text>
        {/* Display selected documents */}
        <View style={styles.documentsContainer}>{renderDocuments()}</View>
        {/* Button to add documents */}
        <RNButton title="Add Document" onPress={handleImagePicker} />
      </View>

      <CustomButton
        title="Next"
        onPress={handleNext}
        width="100%"
        style={styles.buttonStyle}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top', 
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  documentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  documentItem: {
    marginRight: 10,
    marginBottom: 10,
  },
  documentImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  removeText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default BookingStepThree;
