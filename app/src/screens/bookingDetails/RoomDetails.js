import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FloatingButton from '../../components/FloatingButton';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import imagePath from '../../assets/images/imagePath';

const RoomDetails = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('Pending');

  const Confirm = () => {
    setStatus("Booked");
    console.log(status);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
              Status
            </Text>
            <Text style={{color: 'green', fontSize: 16, fontWeight: '700'}}>
              {status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Check-in Date
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              24-04-2024, FRIDAY
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Check-in Time
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              10:30 PM
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Check-out Date
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              26-04-2024, SUNDAY
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Check-out Time
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              9:30 AM
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Booked For
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              2D/3N
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              No. of Guests
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              2
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Total Amount
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              ₹ 6,000
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
              Traveller Details
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Name
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              Sounak Kumar
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Gender
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              Male
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Age
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              26
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Email
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              nitishvibhav@gmail.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Arrival Time
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              9:30 PM
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Address
            </Text>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              Burra Bazar, Kolkata, 700007
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
              Traveller Documents
            </Text>
          </View>
          <Image
            source={imagePath.idCard}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'contain',
              marginTop: 10,
              borderRadius: 6,
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: 15,
              fontSize: 16,
              color: 'black',
              fontWeight: '500',
            }}>
            Front Side
          </Text>
          <Image
            source={imagePath.idCardBack}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'contain',
              marginTop: 10,
              borderRadius: 6,
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: 15,
              fontSize: 16,
              color: 'black',
              fontWeight: '500',
            }}>
            Back Side
          </Text>
        </View>
      </ScrollView>
      <FloatingButton/>
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          paddingVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 20,
        }}>
        <View>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
            ₹ 4,500
          </Text>
          <Text style={{color: 'gray', fontSize: 10, fontWeight: '400'}}>
            Including Taxes
          </Text>
        </View>
        <View>
          <CustomButton
            title={status == 'Booked' ? 'Checkout' : 'Confirmed'}
            width="80%"
            onPress={() =>
              status == 'Booked' ? navigation.navigate('Checkout') : Confirm()
            }
          />
        </View>
      </View>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
