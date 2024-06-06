// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import { getBookingDetails} from '../../redux/booking/action';
// import {useDispatch, useSelector} from 'react-redux';
// import imagePath from '../../assets/images/imagePath';

// const AllBooking = () => {
//   const navigation = useNavigation();
//   const [bookingData, setBookingData] = useState([]);
//   const dispatch = useDispatch();
//   const {booking} = useSelector(state => state.bookingReducer);

//   useEffect(() => {
//     dispatch(getBookingDetails());
//   }, []);
//   console.log(booking, 'dataBooking');
//   return (
//     <ScrollView>
//       <View style={styles.topContainer2}>
//         <View style={{flexDirection: 'row'}}>
//           <View style={{width: '25%', alignItems: 'flex-start'}}>
//             <Text style={{color: 'black', fontWeight: '800'}}>Customer</Text>
//           </View>
//           <View style={{width: '25%', alignItems: 'flex-start'}}>
//             <Text style={{color: 'black', fontWeight: '800'}}>
//               Booking Status
//             </Text>
//           </View>
//           <View style={{width: '25%', alignItems: 'flex-start'}}>
//             <Text style={{color: 'black', fontWeight: '800'}}>
//               Arrived Date
//             </Text>
//           </View>
//           <View style={{width: '25%', alignItems: 'center'}}>
//             <Text style={{color: 'black', fontWeight: '800'}}>Details</Text>
//           </View>
//         </View>
//         <View
//           style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
//         />

//         {booking?.result?.map(item => (
//           <View key={item._id}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingVertical: 4,
//               }}>
//               <View style={{width: '25%', alignItems: 'flex-start'}}>
//                 <Text style={{color: 'black', fontWeight: '500'}}>
//                   {item.fullName}
//                 </Text>
//               </View>
//               <View style={{width: '25%', alignItems: 'flex-start'}}>
//                 <Text
//                   style={{
//                     color: item.status == 'Pending' ? 'orange' : 'green',
//                     fontWeight: '800',
//                   }}>
//                   {item.status}
//                 </Text>
//               </View>
//               <View style={{width: '25%', alignItems: 'flex-start'}}>
//                 <Text style={{color: 'black', fontWeight: '500'}}>
//                   {item.date}
//                 </Text>
//               </View>

//               <View style={{width: '25%', alignItems: 'center'}}>
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor:
//                       item.status == 'Pending' ? 'orange' : 'green',
//                     width: '55%',
//                     height: 32,
//                     borderRadius: 3,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                   onPress={() => navigation.navigate('RoomDetails')}>
//                   <Image
//                     source={
//                       item.status == 'Pending'
//                         ? imagePath.view_icon
//                         : imagePath.view_icon
//                     }
//                     style={{height: 16, width: 16, tintColor: 'white'}}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View
//               style={{
//                 borderBottomWidth: 1,
//                 borderColor: 'gray',
//                 marginVertical: 5,
//               }}
//             />
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default AllBooking;

// const styles = StyleSheet.create({
//   mainContainer: {
//     width: '95%',
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   line: {
//     borderBottomWidth: 1,
//     borderColor: 'gray',
//     marginVertical: 5,
//   },
//   topContainer2: {
//     width: '95%',
//     alignSelf: 'center',
//     padding: 10,
//     marginTop: 10,
//     backgroundColor: 'white',
//     borderRadius: 6,
//     paddingBottom: 20,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomCategoryDetails} from '../../redux/roomcategory/action';
import { useNavigation } from '@react-navigation/native';

const AllBooking = () => {
  const dispatch = useDispatch();
  const {roomCategory} = useSelector(state => state.roomCategoryReducer);
const navigation = useNavigation()


  useEffect(() => {
    dispatch(getRoomCategoryDetails());
  }, []);

  console.log(roomCategory, 'line no. 155');
  return (
    <ScrollView>
      <View style={styles.topContainer2}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Title</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Room Type</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Price</Text>
          </View>
          <View style={{width: '25%', alignItems: 'flex-start'}}>
            <Text style={{color: 'black', fontWeight: '800'}}>Bed size</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderColor: 'gray', marginVertical: 5}}
        />

        <View>
          {roomCategory?.result?.map(item => (
            <TouchableOpacity key={item._id} onPress={() => navigation.navigate('AddBooking', { item })}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 4,
                }}>
                <View style={{width: '25%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black', fontWeight: '500'}}>
                    {item.title}
                  </Text>
                </View>
                <View style={{width: '25%', alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      color: item.status == 'Pending' ? 'orange' : 'green',
                      fontWeight: '800',
                    }}>
                    {item.description}
                  </Text>
                </View>
                <View style={{width: '25%', alignItems: 'flex-start'}}>
                  <Text style={{color: 'black', fontWeight: '500'}}>
                    {item.bedCapacity}
                  </Text>
                </View>

                <View style={{width: '25%', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: '500'}}>
                    {item.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  marginVertical: 5,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllBooking;

const styles = StyleSheet.create({
  topContainer2: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingBottom: 20,
  },
});
