import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FacilityBadge = ({ facility }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{facility}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    paddingVertical:2,
    margin: 2,
    borderRadius: 5,
    alignSelf:'center'
  },
  badgeText: {
    color: '#333',
    fontWeight: '500',
    fontSize:10
  },
});

export default FacilityBadge;
