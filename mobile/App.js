import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import PacketiScreen from './components/Packeti';
import ReviewsScreen from './components/Reviews';
// import ProfileOrder from './components/ProfileOrder';
import CheckList from './components/checklist';
import ProviderProfile from './components/ProviderProfile';
import ServicesScreen from './components/ServicesProviderProfile';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Packeti" component={PacketiScreen} />
                <Stack.Screen name="Reviews" component={ReviewsScreen} />
                <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
                <Stack.Screen name="CheckList" component={CheckList} />
                <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
