import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import TopMiniCard from '../../components/homepage/TopMiniCard';
import {getRooms, getRoomsDetails} from '../../redux/rooms/action';
import {useDispatch, useSelector} from 'react-redux';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {rooms} = useSelector(state => state.roomReducer);
  const [totalRooms, setTotalRooms] = useState('');
  const [bookedRooms, setBookedRooms] = useState('');
  const [VacantRoomCount, setVacantRoomCount] = useState('');
  const [reservedRooms, setReservedRooms] = useState('');

  useEffect(() => {
    dispatch(getRoomsDetails());
  }, [dispatch]);

  useEffect(() => {
    if (rooms && rooms.result) {
      const filteredRoomsVacant = rooms.result.filter(
        room => room.roomStatus === 'VACANT',
      );
      setVacantRoomCount(filteredRoomsVacant.length);
      setTotalRooms(rooms.count);
    }
  }, [rooms]);

  useEffect(() => {
    if (rooms && rooms.result) {
      const filteredBookedRooms = rooms.result.filter(
        room => (room.roomStatus = 'BOOKED'),
      );
      setBookedRooms(filteredBookedRooms.length);
    }
  }, [rooms]);

  useEffect(() => {
    if (rooms && rooms.result) {
      const filteredReservedRooms = rooms.result.filter(
        room => (room.roomStatus = 'RESERVED'),
      );
      setReservedRooms(filteredReservedRooms.length);
    }
  }, [rooms]);

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            source={imagePath.menuImage}
            style={{
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 18,
            color: 'black',
            fontWeight: '700',
          }}>
          Dashboard
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <View style={styles.mainView}>
          <TopMiniCard
            title="Total Rooms"
            data={totalRooms}
            icon={imagePath.totalRooms}
            onPress={() => navigation.navigate('RoomType', {screen: 'All Room'})}
          />
          <TopMiniCard
            title="Vacant Rooms"
            data={VacantRoomCount}
            icon={imagePath.vacantRooms}
            onPress={() =>
              navigation.navigate('RoomType', {screen: 'Available Room'})
            }
          />
        </View>
        <View style={styles.mainView}>
          <TopMiniCard
            title="Booked Rooms"
            data={bookedRooms}
            icon={imagePath.bookedRooms}
            onPress={() =>
              navigation.navigate('RoomType', {screen: 'Confirmed Room'})
            }
          />
          <TopMiniCard
            title="Reserved Room"
            data={reservedRooms}
            icon={imagePath.pendindRooms}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '800',
            fontSize: 18,
          }}>
          Recent Booking
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Booking', {screen: 'All Booking'})
          }
          style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '800',
              fontSize: 14,
              marginRight: 10,
            }}>
            View All
          </Text>
          <Image
            source={imagePath.nextIcon}
            style={{height: 16, width: 16, marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer2}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Customer</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Booking Status
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Arrived Date
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Payment</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Abhishek Kumar
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>12-04-2024</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>due</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Ashish</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Booked</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>11-04-2024</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Paid</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Sounak Kumar
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>12-04-2024</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>due</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Bibek Panda</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>12-04-2024</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>due</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Nitish Kumar
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Booked</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>11-04-2024</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Paid</Text>
          </View>
        </View>
      </View>
      <CustomButton
        title="Add Booking"
        onPress={() => navigation.navigate('stepone')}
        width="95%"
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '800',
            fontSize: 18,
          }}>
          Recent Room Booking
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Room', {screen: 'All Room'})}
          style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '800',
              fontSize: 14,
              marginRight: 10,
            }}>
            View All
          </Text>
          <Image
            source={imagePath.nextIcon}
            style={{height: 16, width: 16, marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer2}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Room No.</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Room Type</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Rent</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Status</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'purple', fontWeight: '500'}}>103</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Single</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>$1200</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'purple', fontWeight: '500'}}>105</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>double</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>$1100</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Booked</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'purple', fontWeight: '500'}}>203</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Deluxe</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>$1600</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'purple', fontWeight: '500'}}>303</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Deluxe</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>$1600</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'green', fontWeight: '800'}}>Booked</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'purple', fontWeight: '500'}}>403</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>Deluxe</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>$1600</Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'orange', fontWeight: '800'}}>Available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  haedingtext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  topContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  topContainer2: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingBottom: 20,
    marginBottom: 10,
  },
  totalRoomView: {
    flexDirection: 'row',
    width: '49%',
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },
  mainView: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
