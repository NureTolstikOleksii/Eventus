import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

// Импорты экранов
import HomeScreen from '../(tabs)/HomeScreen';
import Wishlist from '../(tabs)/Wishlist';
import ProviderProfile from '../(tabs)/ProviderProfile';


// Чат-заглушка
const ChatPlaceholder = () => (
    <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Чат пока не реализован</Text>
    </View>
);

// Создаем стек-навигацию
const Stack = createNativeStackNavigator();

// Создаем референс для навигации
export const navigationRef = createNavigationContainerRef();

export default function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <View style={{ flex: 1 }}>
                {/* Основной стек навигации */}
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Wishlist" component={Wishlist} />
                    <Stack.Screen name="Chat" component={ChatPlaceholder} />
                    <Stack.Screen name="Profile" component={ProviderProfile} />
                </Stack.Navigator>

                {/* Панель навигации */}
                <View style={styles.bottomMenu}>
                <TouchableOpacity
                style={styles.bottomMenuItem}
                onPress={() => navigationRef.current?.navigate('Home')}
                >
                <Image source={require('../../assets/images/home.png')} style={styles.menuIcon} />
                <Text style={styles.bottomMenuText}>Головна</Text>
                </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomMenuItem}
                        onPress={() => navigationRef.current?.navigate('Wishlist')}
                    >
                        <Image source={require('../../assets/images/book.png')} style={styles.menuIcon} />
                        <Text style={styles.bottomMenuText}>Чек-лист</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomMenuItem}
                        onPress={() => navigationRef.current?.navigate('Chat')}
                    >
                        <Image source={require('../../assets/images/chat.png')} style={styles.menuIcon} />
                        <Text style={styles.bottomMenuText}>Чат</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomMenuItem}
                        onPress={() => navigationRef.current?.navigate('Profile')}
                    >
                        <Image source={require('../../assets/images/user.png')} style={styles.menuIcon} />
                        <Text style={styles.bottomMenuText}>Профіль</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bottomMenuItem: {
        alignItems: 'center',
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    bottomMenuText: {
        fontSize: 12,
        color: '#6fa32b',
        marginTop: 5,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 18,
        color: '#333',
    },
});