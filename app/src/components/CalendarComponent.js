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
  const [selectedDate, setSelectedDate] = useState('Departure Date');

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
        <Text style={{color:'black', fontSize:14, fontWeight:"500"}}>{selectedDate}</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 12,
    color: 'black',
    marginTop: 2,
    paddingVertical: 15,
  },
});
