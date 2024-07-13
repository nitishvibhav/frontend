import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Button as RNButton,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';
import MultiSelectPicker from '../../components/MultiSelectPicker';
import {useDispatch, useSelector} from 'react-redux';
import {getAminitiesCategoryDetails} from '../../redux/amenitiesCategory/action';

const BookingStepThree = ({navigation, route}) => {
  const {data} = route.params;
  const [purpose, setPurpose] = useState('');
  const [relation, setRelation] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const {amenitiesCategory} = useSelector(
    state => state.amenitiesCategoryReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAminitiesCategoryDetails());
  }, [dispatch]);
  const amenitiesOptions =
    amenitiesCategory?.result?.map(item => ({
      label: item.title,
      value: item.title,
    })) || [];

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
        const source = {uri: response.uri};
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

  // Transform amenitiesCategory to the format required by MultiSelectPicker

  console.log(data, 'Data from previous page');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerTwo}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <TextInput
            style={styles.input}
            placeholder="Purpose"
            onChangeText={setPurpose}
            value={purpose}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Relation</Text>
          <TextInput
            style={styles.input}
            placeholder="Relation"
            onChangeText={setRelation}
            value={relation}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <MultiSelectPicker
            options={amenitiesOptions}
            selectedValues={amenities}
            onValueChange={setAmenities}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentsContainer}>{renderDocuments()}</View>
          <RNButton title="Add Document" onPress={handleImagePicker} />
        </View>
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 56,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eef3ef',
    borderColor: '#dadada',
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  containerTwo: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
  },
  documentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  documentItem: {
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  documentImage: {
    width: 100,
    height: 100,
  },
  removeText: {
    color: 'red',
    marginTop: 5,
  },
});

export default BookingStepThree;
