import {MainScreen, RoomDetails, Checkout} from '../screens';
import imagePath from '../assets/images/imagePath';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Image} from 'react-native';

const Stack = createNativeStackNavigator();
const phoneNumber = '8210023654';
const handleCall = () => {
  Linking.openURL(`tel:${phoneNumber}`);
};

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
            onPress={handleCall}>
            <Image
              source={imagePath.callImage}
              style={{
                height: 30,
                width: 30,
                marginRight: 10,
                tintColor: 'blue',
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
  </Stack.Navigator>
);
