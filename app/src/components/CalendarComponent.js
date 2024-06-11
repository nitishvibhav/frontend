import React, {useState} from 'react';
import {
  View,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';

const CalendarComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Check-Out Date');

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

export default CalendarComponent;

const styles = StyleSheet.create({
  textinput1: {
    paddingHorizontal: 16,
    width: '95%',
    alignSelf: 'center',
    marginVertical:7,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#eef3ef',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
});
