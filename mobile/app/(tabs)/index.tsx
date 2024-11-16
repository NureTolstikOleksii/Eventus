import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../(tabs)/WelcomeScreen';
import UserProfile from '../(tabs)/UserProfile';
import OrdersScreen from '../(tabs)/OrdersScreen'; // Импортируем OrdersScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
