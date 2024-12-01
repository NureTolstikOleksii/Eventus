import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import PacketiScreen from './components/Packeti';
import ReviewsScreen from './components/Reviews';
// import ProfileOrder from './components/ProfileOrder';
// import Wishlist from './components/Wishlist';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Packeti" component={PacketiScreen} />
                <Stack.Screen name="Reviews" component={ReviewsScreen} />
                {/* <Stack.Screen name="Profile" component={ProfileOrder} />
                <Stack.Screen name="Wishlist" component={Wishlist} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
