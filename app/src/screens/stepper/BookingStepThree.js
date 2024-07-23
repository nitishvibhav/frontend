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
import CustomButton from '../../components/CustomButton';
import MultiSelectPicker from '../../components/MultiSelectPicker';
import {useDispatch, useSelector} from 'react-redux';
import {getAminitiesCategoryDetails} from '../../redux/amenitiesCategory/action';

const BookingStepThree = ({navigation, route}) => {
  const {data} = route.params; // Previous page data
  console.log('Data from previous page:', data);

  const [purpose, setPurpose] = useState('');
  const [relation, setRelation] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});
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

  const handleNext = () => {
    let validationErrors = {};

    if (!purpose.trim()) {
      validationErrors.purpose = 'Purpose is required';
    }
    if (!relation.trim()) {
      validationErrors.relation = 'Relation is required';
    }
    if (amenities.length === 0) {
      validationErrors.amenities = 'Please select at least one amenity';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigation.navigate('review', {
        data: {
          ...data,
          purpose,
          relation,
          amenities,
        },
      });
    }
  };

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
          {errors.purpose && <Text style={styles.errorText}>{errors.purpose}</Text>}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Relation</Text>
          <TextInput
            style={styles.input}
            placeholder="Relation"
            onChangeText={setRelation}
            value={relation}
          />
          {errors.relation && <Text style={styles.errorText}>{errors.relation}</Text>}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <MultiSelectPicker
            options={amenitiesOptions}
            selectedValues={amenities}
            onValueChange={setAmenities}
          />
          {errors.amenities && <Text style={styles.errorText}>{errors.amenities}</Text>}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentsContainer}>
            {/* Placeholder for document design */}
            <View style={styles.documentPlaceholder}>
              <Text>Document Placeholder</Text>
            </View>
          </View>
          <RNButton title="Add Document" onPress={() => {}} />
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
  documentPlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#dadada',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef3ef',
    marginRight: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BookingStepThree;
