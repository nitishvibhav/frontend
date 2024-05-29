import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const TopMiniCard = ({title, width,color1,color2}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[color1, color2]}
      style={[styles.container, {width: width}]}>
      
        <Text style={styles.buttonText}>{title}</Text>
      
    </LinearGradient>
  )
}

export default TopMiniCard

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      paddingVertical: 8,
      flexDirection: 'row',
      alignSelf: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal:8
    },
    buttonText: {
      fontSize: 15,
      color: '#fafafa',
      fontWeight: '700',
      fontFamily: 'Quicksand-Regular',
    },
  });