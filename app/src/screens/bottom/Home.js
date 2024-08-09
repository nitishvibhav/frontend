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
import {useDispatch, useSelector} from 'react-redux';
import imagePath from '../../assets/images/imagePath';
import {getByHotelIdBooking} from '../../redux/Booking1/action';
import {getByHotelIdLedger} from '../../redux/Ledger/action';
import {getRoomByHotelID} from '../../redux/room/action';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {roomByHotelID} = useSelector(state => state.roomReducer);
  const [bookedRooms, setBookedRooms] = useState('');
  const [VacantRoomCount, setVacantRoomCount] = useState('');
  const [reservedRooms, setReservedRooms] = useState('');
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentPayment, setRecentPayment] = useState([]);

  const {getBookingByHotelId} = useSelector(state => state.booking1Reducer);
  const bookingData = getBookingByHotelId?.result || [];

  const {user} = useSelector(state => state.loginReducer);
  const {getLedgerByHotelId} = useSelector(state => state.ledgerReducer);
  const paymentData = getLedgerByHotelId.result;
  console.log(paymentData, 'paymentdata is here');

  useEffect(() => {
    dispatch(getByHotelIdBooking(user.result.username));
    dispatch(getByHotelIdLedger(user.result.username));
    dispatch(getRoomByHotelID(user.result.username));
  }, [dispatch]);


  useEffect(() => {
    if (Array.isArray(bookingData) && bookingData.length > 0) {
      const sortedAndSlicedBookings = bookingData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentBookings(sortedAndSlicedBookings);
    }
  }, [bookingData]);

  useEffect(() => {
    if (Array.isArray(paymentData) && paymentData.length > 0) {
      const sortedAndSlicedPayment = paymentData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentPayment(sortedAndSlicedPayment);
    }
  }, [paymentData]);



  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const bookingsToday = bookingData.filter(
      booking => booking.checkIn.split('T')[0] === today,
    );
    const bookedToday = bookingsToday.filter(
      booking => booking.status === 'BOOKED',
    ).length;
    const pendingToday = bookingsToday.filter(
      booking => booking.status === 'PENDING',
    ).length;
    const reservedToday = bookingsToday.filter(
      booking => booking.status === 'RESERVED',
    ).length;

    setBookedRooms(bookedToday);
    setVacantRoomCount(pendingToday);
    setReservedRooms(reservedToday);
  }, [bookingData]);

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
            data={roomByHotelID.count}
            icon={imagePath.totalRooms}
          />
          <TopMiniCard
            title="Pending Rooms"
            data={VacantRoomCount}
            icon={imagePath.vacantRooms}
          />
        </View>
        <View style={styles.mainView}>
          <TopMiniCard
            title="Booked Rooms"
            data={bookedRooms}
            icon={imagePath.bookedRooms}
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
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Customer
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Booking Status
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Arrived Date
            </Text>
          </View>
          <View style={{width: '25%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Payment
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            marginVertical: 5,
          }}
        />
        {recentBookings?.map(item => (
          <View key={item._id}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}
              >
              <View style={{width: '25%', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 11}}>
                  {item.fullName}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'center'}}>
                <Text
                  style={{
                    color:
                      item.status == 'CHECK-IN'
                        ? 'green'
                        : item.status == 'PENDING'
                        ? 'red'
                        : 'orange',
                    fontWeight: '800',
                    fontSize: 11,
                  }}>
                  {item.status}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'center'}}>
                <Text style={{color: 'black', fontWeight: '500', fontSize: 11}}>
                  {item.checkIn}
                </Text>
              </View>
              <View style={{width: '25%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: item.paymentStatus == 'SUCCESS' ? 'green' : 'red',
                    fontWeight: '800',
                    fontSize: 11,
                  }}>
                  {item.paymentStatus}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: 'gray',
                marginVertical: 5,
              }}
            />
          </View>
        ))}
      </View>

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
          Payment Info
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
          <View style={{width: '20%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Room No.
            </Text>
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Payment
            </Text>
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Paid
            </Text>
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Dues
            </Text>
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: '800', fontSize: 12}}>
              Amount
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            marginVertical: 10,
          }}
        />
        {recentPayment?.map(item => {
          const name =
            bookingData &&
            bookingData.find(data => data._id === item.receiptAgainst);
          return (
            <View key={item._id}>
              <View style={{flexDirection: 'row'}} >
                <View style={{width: '20%', alignItems: 'flex-start'}}>
                  <Text
                    style={{color: 'purple', fontWeight: '500', fontSize: 11}}>
                    {name ? name.fullName : 'USER'}
                  </Text>
                </View>
                <View style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      color:
                        item.paymentStatus == 'SUCCESS'
                          ? 'green'
                          : item.paymentStatus == 'PENDING'
                          ? 'red'
                          : 'orange',
                      fontWeight: '800',
                      fontSize: 11,
                    }}>
                    {item.paymentStatus === 'PARTIALLY-PAID'
                      ? 'PARTIALLY'
                      : item.paymentStatus}
                  </Text>
                </View>
                <View style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{color: 'green', fontWeight: '500', fontSize: 11}}>
                    {item.payableAmount}
                  </Text>
                </View>
                <View style={{width: '20%', alignItems: 'center'}}>
                  <Text style={{color: 'red', fontWeight: '800', fontSize: 11}}>
                    {item.dues}
                  </Text>
                </View>
                <View style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{color: 'orange', fontWeight: '800', fontSize: 11}}>
                    {item.amount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderColor: 'gray',
                  marginVertical: 10,
                }}
              />
            </View>
          );
        })}
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
