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
  const [totalPrice, setTotalPrice] = useState(0);

  const {user} = useSelector(state => state.loginReducer);

  useEffect(() => {
    const fetchData = async () => {
      const formdata = {
        hotelId: user.result.username,
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
      setTotalPrice(totalPrice - item.price); // Subtract the price of the deselected room
    } else {
      setSelectedItems([...selectedItems, item]);
      setTotalPrice(totalPrice + item.price); // Add the price of the selected room
    }
  };

  const handleNextPress = () => {
    const nextPageData = {
      total: data.numberOfGuests,
      adult: data.numberOfAdults,
      child: data.numberOfChildren,
      hotelId: user.result.username,
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
                styles.normalContainer,
                selectedItems.includes(item) && styles.selectedItem,
              ]}
              key={item._id}
              onPress={() => handleItemPress(item)}>
              <View style={styles.roomNumberView}>
                <View>
                  <Text style={styles.textRoom}>
                    Room Number : {item.roomNumber}
                  </Text>
                </View>
                <View>
                  <Text style={styles.textRoom}>{item.roomCategory}</Text>
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <View style={{width: '30%', marginRight: 10}}>
                  <Image
                    source={imagePath.room}
                    style={{width: '100%', height: 130}}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  {item.facilities && (
                    <View style={styles.facilitiesContainer}>
                      {item.facilities.map((facility, index) => (
                        <View key={index} style={styles.facilityItem}>
                          <Text
                            style={{
                              fontSize: 9,
                              color: 'black',
                              fontWeight: '600',
                            }}>
                            {facility}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '75%',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <Text>Bed Capacity : {item.bedCapacity}</Text>
                    <View
                      style={{
                        backgroundColor: '#ffcc66',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginLeft: 20,
                        borderRadius: 6,
                      }}>
                      <Text>{item.price} रु/Night</Text>
                    </View>
                  </View>
                </View>
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
              {`रु ${totalPrice}`} {/* Dynamically display the total price */}
            </Text>
            <TouchableOpacity>
              <Image
                source={imagePath.infoImage}
                style={styles.bottomIconStyle}
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 9}}>
            For {data.numberOfGuests} person
          </Text>
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
  roomNumberView: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'space-between',
  },
  textRoom: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
  },
  normalContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
    width: '95%',
    alignSelf: 'center',
  },
  sectionContainer: {
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  selectedItem: {
    backgroundColor: 'orange', // Change the color to indicate selection
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
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap', // allows items to wrap to the next line
    gap: 5,
  },
  facilityItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#e6e6ff',
    borderRadius: 4,
    margin: 2, // optional, for additional spacing
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
