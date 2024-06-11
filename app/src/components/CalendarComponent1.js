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

const CalendarComponent1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [CheckIn, setCheckIn] = useState('Check-in Date');

  const onDayPress = day => {
    setCheckIn(day.dateString);
    setIsModalVisible(false);
  };
  console.log(CheckIn, "selected date")
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.textinput1}>
        <Text style={{fontSize: 14, color: 'gray', fontWeight: '500'}}>
          {CheckIn}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={{flex: 1}}>
          <CalendarList
            onDayPress={onDayPress}
            markedDates={{[CheckIn]: {selected: true}}}
            pastScrollRange={0}
            minDate={currentDateString}
            futureScrollRange={2}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CalendarComponent1;

const styles = StyleSheet.create({
  textinput1: {
    paddingHorizontal: 16,
    marginVertical:7,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#eef3ef',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
});
