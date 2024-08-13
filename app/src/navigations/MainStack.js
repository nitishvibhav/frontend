import {RoomDetails,} from '../screens';
import LostAndFound from '../screens/lostandfound/LostAndFound';
import DetailsLostItem from '../screens/lostandfound/DetailsLostItem';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from '../screens/drawer/DrawerNavigator';
import BookingReview from '../screens/stepper/BookingReview';
import BookingStepThree from '../screens/stepper/BookingStepThree';
import BookingStepTwo from '../screens/stepper/BookingStepTwo';
import BookingStepOne from '../screens/stepper/BookingStepOne';
import BookingFilteration from '../screens/stepper/BookingFilteration';
import LedgerBill from '../screens/ledger/LedgerBill';
import LedgerDetail from '../screens/ledger/LedgerDetails';
import UpdateBooking from '../screens/bookingDetails/UpdateBooking';
import AddDocument from '../screens/bookingDetails/AddDocument';
import AllBooking from '../screens/allScreens/AllBooking';

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
      }}
    />

   
    <Stack.Screen
      name="ledgerbill"
      component={LedgerBill}
      options={{headerShown: true, title: 'Add Payment Details'}}
    />
    <Stack.Screen
      name="LedgerDetail"
      component={LedgerDetail}
      options={{headerShown: true, title: 'Payment Details'}}
    />

    <Stack.Screen
      name="BookingFilteration"
      component={BookingFilteration}
      options={{headerShown: true, title: ' Choose Your Rooms'}}
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
      options={{headerShown: true, title: ' Traveller Details '}}
    />
    <Stack.Screen
      name="stepthree"
      component={BookingStepThree}
      options={{headerShown: true, title: ' Final Step '}}
    />
    <Stack.Screen
      name="review"
      component={BookingReview}
      options={{headerShown: true, title: ' Review Details '}}
    />
    <Stack.Screen
      name="UpdateBooking"
      component={UpdateBooking}
      options={{headerShown: true, title: ' Update Booking Details '}}
    />

    <Stack.Screen
      name="AddDocument"
      component={AddDocument}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="AllBooking"
      component={AllBooking}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
