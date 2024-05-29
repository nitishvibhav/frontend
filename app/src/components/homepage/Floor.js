import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Floor = ({Floor}) => {
  return (
    <View style={styles.headingView}>
        <Text style={styles.haedingtext}>{Floor}</Text>
      </View>
  )
}

export default Floor

const styles = StyleSheet.create({
    headingView: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
      },
      haedingtext: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700',
      },
})