import { NavigationContainer } from '@react-navigation/native';
import WeatherSearch from './src/Weather';
import WeatherDetail from './src/WeatherDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

const App = () => {

  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WeatherSearch">
            <Stack.Screen name="WeatherSearch" component={WeatherSearch} />
            <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default App;
