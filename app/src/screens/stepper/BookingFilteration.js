import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {postFilterationDetails} from '../../redux/filteration/action';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';

const BookingFilteration = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {data} = route.params;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const formdata = {
        hotelId: 'singh@123',
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        bedCapacity: data.numberOfGuests,
      };
      console.log('Dispatching with data:', formdata);
      try {
        const response = await dispatch(postFilterationDetails(formdata));
        console.log('Full Response:', response);
        setResponseData(response.value.data); // Access the correct part of the response
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleItemPress = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNextPress = () => {
    const nextPageData = {
      total: data.numberOfGuests,
      adult: data.numberOfAdults,
      child: data.numberOfChildren,
      hotelId: 'singh@123',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      bedCapacity: data.numberOfGuests,
      selectedItems,
    };
    navigation.navigate('steptwo', {nextPageData});
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {responseData &&
        responseData.result &&
        Array.isArray(responseData.result) ? (
          responseData.result.map(item => (
            <TouchableOpacity
              style={[
                styles.sectionContainer,
                selectedItems.includes(item) && styles.selectedItem,
              ]}
              key={item._id}
              onPress={() => handleItemPress(item)}>
              <View style={{width: '30%', marginRight: 10}}>
                <Image
                  source={imagePath.room}
                  style={{width: '100%', height: 120}}
                />
              </View>
              <View>
                {item.price && <Text>Price :{item.price}</Text>}
                {item.bedCapacity && (
                  <Text>Bed Capacity :{item.bedCapacity}</Text>
                )}
                <Text>Room Number: {item.roomNumber}</Text>
                <Text>Room Category: {item.roomCategory}</Text>
                {item.facilities && (
                  <View style={styles.facilitiesContainer}>
                    <Text>Facilities:</Text>
                    {item.facilities.map((facility, index) => (
                      <Text key={index}>- {facility}</Text>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>
      <View style={styles.bottomMainView}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '800'}}>
              $ 5,785
            </Text>
            <TouchableOpacity>
              <Image
                source={imagePath.infoImage}
                style={styles.bottomIconStyle}
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 9}}>including VAT</Text>
          <Text style={{color: 'white', fontSize: 9}}>For {data.numberOfGuests} person</Text>
        </View>
        <CustomButton
          title="Select Room"
          width="60%"
          onPress={selectedItems.length > 0 ? handleNextPress : null}
          disabled={selectedItems.length === 0}
        />
      </View>
    </View>
  );
};

export default BookingFilteration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  sectionContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  selectedItem: {
    backgroundColor: '#d0f0c0', // Change the color to indicate selection
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  responseContainer: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  facilitiesContainer: {
    marginTop: 10,
  },
  bottomMainView: {
    bottom: 0,
    position: 'relative',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 15,
  },
  bottomIconStyle: {
    height: 14,
    width: 14,
    tintColor: 'white',
    marginLeft: 7,
  },
});
