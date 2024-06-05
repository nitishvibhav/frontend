import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Splash} from '../screens';

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
  </Stack.Navigator>
);

export default AuthStack;
