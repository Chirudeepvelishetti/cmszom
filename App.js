
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import Page1 from './Screens/Page1';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Scanner from './Screens/Scanner';

const Stack = createStackNavigator();
export default function App() {
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='home' component={Home} options={{headerShown:false}} ></Stack.Screen>
      <Stack.Screen name='page1' component={Page1}  options={{headerShown:false}}/>
      <Stack.Screen name='scanner' component={Scanner} options={{headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
   
  );
}


