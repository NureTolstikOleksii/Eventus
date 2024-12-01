import React from 'react';
import Navigation from '../navigation/Navigation';
import "expo-router/entry"; /* <--- Maybe not efficient */
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer>
            <Navigation /> {/* Внутри уже настроены стеки, табы и переходы */}
        </NavigationContainer>
    );
}

