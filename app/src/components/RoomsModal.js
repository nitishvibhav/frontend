import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import imagePath from '../assets/images/imagePath';
import CustomButton from './CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomCategoryDetails} from '../redux/roomcategory/action';
import { getRooms } from '../redux/rooms/action';

const RoomsModal = ({visible, onClose}) => {
  const [selectedState, setSelectedState] = useState(0);
  const dispatch = useDispatch();
  const {roomCategory} = useSelector(state => state.roomCategoryReducer);
  const {rooms} = useSelector(state => state.roomReducer);

  const RoomCategory = roomCategory?.result || [];
  const Rooms = rooms?.result
  console.log(Rooms, 'ghjkjhgv');
  console.log(RoomCategory, 'ghjkjhgv');
  useEffect(() => {
    dispatch(getRoomCategoryDetails());
    dispatch(getRooms())
  }, [dispatch]);

  const handlePress = (item) => { 
    console.log(item, "line no. 30") 
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            bottom: 0,
            position: 'absolute',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 700}}>
              Choose Room Category
            </Text>
            <Pressable
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                marginRight: 20,
                backgroundColor: '#f7f7f7',
                justifyContent: 'center',
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={imagePath.closeIcon}
                style={{
                  height: 12,
                  width: 12,
                  alignSelf: 'center',
                  tintColor: 'orange',
                }}
              />
            </Pressable>
          </View>
          <View style={styles.mainContainer}>
            {Rooms.map(item => (
              <TouchableOpacity
                key={item._id}
                style={styles.container}
                onPress={()=>handlePress(item)}>
                <Text>{item.roomCategory}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 700, marginTop:0, marginBottom:0}}>
              Choose Room Number
            </Text>
          <View style={styles.mainContainer}>
            {Rooms.map(item => (
              <TouchableOpacity
                key={item._id}
                style={styles.container}
                onPress={()=>handlePress(item)}>
                <Text>{item.roomNumber}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <CustomButton width="90%" title="Save & Close" />
        </View>
      </View>
    </Modal>
  );
};

export default RoomsModal;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eef3ef',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 6,
  },
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom:20
  },
});
