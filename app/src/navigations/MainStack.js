import {
  MainScreen,
  RoomDetails,
  Checkout,
  CategoryDetails,
  AddBooking,
} from '../screens';
import imagePath from '../assets/images/imagePath';
import {TouchableOpacity, Image} from 'react-native';
import LostAndFound from '../screens/lostandfound/LostAndFound';
import DetailsLostItem from '../screens/lostandfound/DetailsLostItem';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from '../screens/drawer/DrawerNavigator';
import BookingReview from '../screens/stepper/BookingReview';
import BookingStepThree from '../screens/stepper/BookingStepThree';
import BookingStepTwo from '../screens/stepper/BookingStepTwo';
import BookingStepOne from '../screens/stepper/BookingStepOne';

const Stack = createStackNavigator();

export default MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="drawerNavigator"
      component={DrawerNavigator}
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
            }}>
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

    <Stack.Screen
      name="LostAndFound"
      component={LostAndFound}
      options={{headerShown: true, title: ' Lost & Found'}}
    />
    <Stack.Screen
      name="DetailsLostItem"
      component={DetailsLostItem}
      options={{headerShown: true, title: ' Details '}}
    />
    <Stack.Screen
      name="stepone"
      component={BookingStepOne}
      options={{headerShown: true, title: ' Step 1 '}}
    />
    <Stack.Screen
      name="steptwo"
      component={BookingStepTwo}
      options={{headerShown: true, title: ' Step 2 '}}
    />
    <Stack.Screen
      name="stepthree"
      component={BookingStepThree}
      options={{headerShown: true, title: ' Step 3 '}}
    />
    <Stack.Screen
      name="review"
      component={BookingReview}
      options={{headerShown: true, title: ' review '}}
    />
  </Stack.Navigator>
);
