import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FloatingButton from '../../components/FloatingButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import imagePath from '../../assets/images/imagePath';

const RoomDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const item = route.params?.item;
  console.log(item, 'item line no.26');

  return (
    <View style={styles.flexContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.statusText}>Status</Text>
            <Text style={styles.statusValue}>{item.status}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Check-in Date</Text>
            <Text style={styles.valueText}>{item.checkIn}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Purpose</Text>
            <Text style={styles.valueText}>{item.purpoes}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Check-out Date</Text>
            <Text style={styles.valueText}>{item.checkOut}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Relation</Text>
            <Text style={styles.valueText}>{item.relation}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Booked For</Text>
            <Text style={styles.valueText}>2D/3N</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>No. of Guests</Text>
            <Text style={styles.valueText}>{item.numberOfGuest.total}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>No. of Rooms</Text>
            <Text style={styles.valueText}>{item.numberOfRooms}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>paymentStatus</Text>
            <Text style={styles.valueText}>{item.paymentStatus}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>bookingMethod</Text>
            <Text style={styles.valueText}>{item.bookingMethod}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>roomNumber</Text>
            <Text style={styles.valueText}>{item.rooms.roomNumber}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.travellerTitle}>Traveller Details</Text>
          </View>

          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Name</Text>
            <Text style={styles.valueText}>{item.fullName}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Contact Number</Text>
            <Text style={styles.valueText}>{item.phoneNumber}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>date Of Birth</Text>
            <Text style={styles.valueText}>{item.dateOfBirth}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Email</Text>
            <Text style={styles.valueText}>{item.email}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Nationality</Text>
            <Text style={styles.valueText}>{item.nationality}</Text>
          </View>
          <View style={[styles.rowSpaceBetween, styles.marginTop10]}>
            <Text style={styles.labelText}>Room Category</Text>
            <Text style={styles.valueText}>{item.roomCategory}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.travellerTitle}>Traveller Documents</Text>
          </View>
          <Image source={imagePath.idCard} style={styles.documentIcon} />
          <Text style={styles.documentFont}>Front Side</Text>
          <Image source={imagePath.idCardBack} style={styles.documentIcon} />
          <Text style={styles.documentFont}>Back Side</Text>
        </View>
      </ScrollView>
      <FloatingButton phone={item.phoneNumber} />
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.totalAmount}>₹ 4,500</Text>
          <Text style={styles.includingTaxes}>Including Taxes</Text>
        </View>
        <View>
          <CustomButton
            title="CheckOut"
            width="80%"
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      </View>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    width: '90%',
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
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginTop10: {
    marginTop: 10,
  },
  statusText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  statusValue: {
    color: 'green',
    fontSize: 16,
    fontWeight: '700',
  },
  labelText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  valueText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
  },
  travellerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  documentIcon: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 6,
  },
  documentFont: {
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  bottomContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'black',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  includingTaxes: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '400',
  },
});
