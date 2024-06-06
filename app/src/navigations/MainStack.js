import {MainScreen, RoomDetails, Checkout, CategoryDetails, AddBooking} from '../screens';
import imagePath from '../assets/images/imagePath';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Image} from 'react-native';


const Stack = createNativeStackNavigator();


export default MainStack = () => (
  
  <Stack.Navigator>
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={{headerShown: false, title: 'Book Your Room'}}
    />

    <Stack.Screen
      name="RoomDetails"
      component={RoomDetails}
      options={{
        headerShown: true,
        title: 'Booking Details',
        headerRight: () => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
            <Image
              source={imagePath.editIcon}
              style={{
                height: 26,
                width: 26,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        ),
      }}
    />

    <Stack.Screen
      name="Checkout"
      component={Checkout}
      options={{headerShown: true, title: 'Checkout'}}
    />
    <Stack.Screen
    name="AddBooking"
    component={AddBooking}
    options={{headerShown: true, title: ' Add booking'}}
  />

  </Stack.Navigator>
);
