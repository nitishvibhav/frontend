import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Splash} from '../screens'
import MainScreen from '../screens/initialScreen/MainScreen';
import Nothing from '../screens/auth/Nothing';
import BottomNavigator from '../screens/bottom/BottomNavigator';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
    name="nothing"
    component={Nothing}
    options={{headerShown: false, title: 'Book Your Room'}}
  />
  <Stack.Screen
  name="bottomnavigator"
  component={BottomNavigator}
  options={{headerShown: false, title: 'Book Your Room'}}
/>
    <Stack.Screen
    name="MainScreen"
    component={MainScreen}
    options={{headerShown: false}}
  />
    </Stack.Navigator>
);

export default AuthStack;
