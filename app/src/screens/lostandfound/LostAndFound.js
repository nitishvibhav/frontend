import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import imagePath from '../../assets/images/imagePath';
import { useNavigation } from '@react-navigation/native';

const LostAndFound = () => {
    const navigation= useNavigation()
  return (
    <View style={{flex:1}}>
      <View style={styles.mainContainer}>
        <View style={styles.miniContainer}>
          <Text style={styles.textBold}>25</Text>
          <Text>All Item</Text>
        </View>
        <View style={styles.miniContainer}>
          <Text style={styles.textBold}>10</Text>
          <Text>Lost</Text>
        </View>
        <View style={styles.miniContainer}>
          <Text style={styles.textBold}>6</Text>
          <Text>Found</Text>
        </View>
        <View style={styles.miniContainer}>
          <Text style={styles.textBold}>15</Text>
          <Text>Solved</Text>
        </View>
      </View>
      <ScrollView>
      <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('DetailsLostItem')}>
        <Image source={imagePath.LostItem} style={styles.imageLost} />
        <View style={styles.label}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
            Lost
          </Text>
        </View>
        <View>
          <Text style={styles.headingText}>HeadPhone</Text>
          <Text style={styles.smallText}>black colour, boat company</Text>
          <Text style={styles.smallText}>206, Executive Room</Text>
          <Text style={styles.smallText}>11/06/2024, 10:00 AM</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image source={imagePath.LostItem} style={styles.imageLost} />
        <View style={styles.label}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
            Lost
          </Text>
        </View>
        <View>
          <Text style={styles.headingText}>HeadPhone</Text>
          <Text style={styles.smallText}>black colour, boat company</Text>
          <Text style={styles.smallText}>206, Executive Room</Text>
          <Text style={styles.smallText}>11/06/2024, 10:00 AM</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image source={imagePath.LostItem} style={styles.imageLost} />
        <View style={styles.label}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
            Lost
          </Text>
        </View>
        <View>
          <Text style={styles.headingText}>HeadPhone</Text>
          <Text style={styles.smallText}>black colour, boat company</Text>
          <Text style={styles.smallText}>206, Executive Room</Text>
          <Text style={styles.smallText}>11/06/2024, 10:00 AM</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image source={imagePath.LostItem} style={styles.imageLost} />
        <View style={styles.label}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
            Lost
          </Text>
        </View>
        <View>
          <Text style={styles.headingText}>HeadPhone</Text>
          <Text style={styles.smallText}>black colour, boat company</Text>
          <Text style={styles.smallText}>206, Executive Room</Text>
          <Text style={styles.smallText}>11/06/2024, 10:00 AM</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <Image source={imagePath.LostItem} style={styles.imageLost} />
        <View style={styles.label}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
            Lost
          </Text>
        </View>
        <View>
          <Text style={styles.headingText}>HeadPhone</Text>
          <Text style={styles.smallText}>black colour, boat company</Text>
          <Text style={styles.smallText}>206, Executive Room</Text>
          <Text style={styles.smallText}>11/06/2024, 10:00 AM</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LostAndFound;

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  miniContainer: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    width: '24%',
    alignItems: 'center',
    elevation:1
  },
  textBold: {
    color: 'black',
    fontWeight: '800',
    fontSize: 24,
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    elevation:1
  },
  imageLost: {
    width: '35%',
    height: 120,
    borderRadius: 6,
    marginRight: 10,
  },
  headingText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 13,
    color: 'black',
    marginBottom: 5,
    fontWeight: '600',
  },
  label: {
    position: 'absolute',
    margin: 10,
    backgroundColor: 'red',
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
