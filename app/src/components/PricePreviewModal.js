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
  import { getAminitiesCategoryDetails } from '../redux/amenitiesCategory/action';
  
  const PricePreviwModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedState, setSelectedState] = useState(0);
    const dispatch = useDispatch();
    const {amenitiesCategory} = useSelector(state => state.amenitiesCategoryReducer)
  
    const amenity = amenitiesCategory?.result || [];
   console.log(amenity)
   
    useEffect(() => {
      dispatch(getAminitiesCategoryDetails());
    }, [dispatch]);
  
    const handlePress = (item) => { 
      console.log(item, "line no. 30") 
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
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
                Choose Amenities
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
              {amenity.map(item => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.container}
                  onPress={()=>handlePress(item)}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <CustomButton width="90%" title="Save & Close" />
          </View>
        </View>
      </Modal>
    );
  };
  
  export default PricePreviwModal;
  
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
  