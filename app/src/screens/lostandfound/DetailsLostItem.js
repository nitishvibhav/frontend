import {StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import React from 'react';
import imagePath from '../../assets/images/imagePath';
import CustomButton from '../../components/CustomButton';

const DetailsLostItem = () => {
  return (
    <ScrollView>
      <Image source={imagePath.LostItem} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.textHeading}>Headphone</Text>
        <Text style={styles.textSmallHeading}>Description : </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets co
        </Text>
        <Text style={styles.textSmallHeading}>
          Reported By : {''}
          <Text style={styles.textSmall}>
            Rohan Prasad (HouseKeeping staff)
          </Text>
        </Text>
        <Text style={styles.textSmallHeading}>
          Reported Date : {''}
          <Text style={styles.textSmall}>24-05-2024 (Thursday) 09:00 AM</Text>
        </Text>
        <Text style={styles.textSmallHeading}>
          Found in : {''}
          <Text style={styles.textSmall}>
            Room no. 206, Executive Room (2nd floor)
          </Text>
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textSmallHeading}>
          Contact Details : {''}
          <Text style={styles.textSmall}>8420557642</Text>
        </Text>
        <Text style={styles.textSmallHeading}>
          Email: {''}
          <Text style={styles.textSmall}>nitishvibhav@gmail.com</Text>
        </Text>
        <Text style={styles.textSmallHeading}>
          Address : {''}
          <Text style={styles.textSmall}>Burra Bazar, Kolkata, WB, 700007</Text>
        </Text>
      </View>
      <CustomButton title="Claimed" width='95%'/>
    </ScrollView>
  );
};

export default DetailsLostItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    marginTop: 10,
    resizeMode: 'contain',
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    elevation: 1,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    marginBottom: 10,
  },
  textSmallHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
    marginTop: 5,
  },
  textSmall: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
