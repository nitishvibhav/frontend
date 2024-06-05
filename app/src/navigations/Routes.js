import {NavigationContainer} from '@react-navigation/native';
import {getUser} from '../../utils';
import MainStack from './MainStack';
import AuthStack from './AuthStack';




export default Routes = () => {
  console.log(getUser(), "inside main Routes")
  return (
    <NavigationContainer>
      {getUser ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
