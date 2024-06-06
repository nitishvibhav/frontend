import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../assets/images/imagePath';

const CustomDrawer = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 10,
          backgroundColor: 'orange',
          borderRadius: 6,
          height: 80,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 6,
            alignSelf: 'center',
            marginLeft: 10,
            justifyContent: 'center',
          }}>
          <Image
            source={imagePath.bookedRooms}
            style={{height: 40, width: 40, borderRadius: 6}}
          />
        </View>
        <View style={{alignSelf: 'center', marginLeft: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 700}}>
            Hotel Sajilo
          </Text>
          <Text style={{color: 'white', fontSize: 12}}>Kathmandu</Text>
        </View>
      </View>

      <View
        style={styles.container}>
        <Text
          style={styles.heading}>
          Booking
        </Text>
        <View
          style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>
              All Booking
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Booking', {screen:'All Booking'})}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
        <View
          style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>
              Add Booking
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Booking', {screen:'Add Booking'})}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={styles.container}>
        <Text
          style={styles.heading}>
          Rooms
        </Text>
        <View
          style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>
              All Rooms
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Room', {screen:'All Room'})}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
        <View
          style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>
              Booked Rooms
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Room', {screen:'Confirmed Room'})}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
        <View
          style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>
              Available Rooms
            </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Room', {screen:'Available Room'})}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>View Profile</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Edit Profile</Text>
          </View>
          <Image
            source={imagePath.nextIcon}
            style={styles.nextImage}
          />
        </View>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 10,
          color: '#0379d3',
          fontWeight: 600,
        }}>
        Rate Us • Privacy Policy{' '}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: 40,
          fontSize: 12,
          fontWeight: 500,
          color: '#000',
        }}>
        App Version 1.0.1
      </Text>
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  nextImage: {
    height: 16,
    width: 16,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  heading: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: 'gray',
    fontSize:16,
    fontWeight:'600'
  },
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 6,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    paddingBottom: 10,
  },
});
