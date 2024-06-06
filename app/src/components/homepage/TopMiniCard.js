import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';

const TopMiniCard = ({title, icon, data,}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          height: 36,
          width: 36,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          marginRight: 5,
        }}>
        <Image source={icon} style={{height: 24, width: 24}} />
      </View>
      <View>
      <Text style={styles.dataText}>{data}</Text>
        <Text style={styles.buttonText}>{title}</Text>
       
      </View>
    </TouchableOpacity>
  );
};

export default TopMiniCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    marginTop: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    width: '49%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#fafafa',
    fontWeight: '900',
    fontFamily: 'Quicksand-Regular',
  },
  dataText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
  },
});
