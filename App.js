import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from './src/screens';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux/store';


const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    "Roboto-Black": require('./src/assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./src/assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./src/assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Light": require('./src/assets/fonts/Roboto-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
