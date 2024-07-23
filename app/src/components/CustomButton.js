import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({title, onPress, width, disabled}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={disabled ? ['#d3d3d3', '#d3d3d3'] : ['#FFA500', '#FF6347']}
      style={[styles.container, {width: width}]}>
      <TouchableOpacity onPress={disabled ? null : onPress} disabled={disabled}>
        <Text style={[styles.buttonText, {color: disabled ? 'black' : 'white'}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '800',
    fontFamily: 'Quicksand-Regular',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
