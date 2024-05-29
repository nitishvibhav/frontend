import React, {useState} from 'react';
import {
  View,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';

const CheckoutCalendar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Checkout Date');
  
    const onDayPress = day => {
      setSelectedDate(day.dateString);
      setIsModalVisible(false);
    };
  
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    return (
      <View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.textinput1}>
          <Text style={{color:'gray', fontSize:14, fontWeight:"500"}}>{selectedDate}</Text>
          <Image
          source={require('../../assets/images/calendaroutline.png')}
          style={{height: 16, width: 16}}
        />
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={{flex: 1}}>
            <CalendarList
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: {selected: true, selectedColor: 'red'},
              }}
              pastScrollRange={0}
              minDate={currentDateString}
              futureScrollRange={2}
            />
          </View>
        </Modal>
      </View>
    );
  };

export default CheckoutCalendar

const styles = StyleSheet.create({
    textinput1: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 6,
        paddingHorizontal: 20,
        fontSize: 12,
        color: 'black',
        marginTop: 2,
        paddingVertical: 15,
        justifyContent:'space-between',
        flexDirection:'row'
      },
})





