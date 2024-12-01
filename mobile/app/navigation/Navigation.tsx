import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

// Import all screens
import HomeScreen from '../(tabs)/HomeScreen';
import OrdersScreen from '../(tabs)/OrdersScreen';
import Packeti from '../(tabs)/Packeti';
import ProfileOrder from '../(tabs)/ProfileOrder';
import ProviderProfile from '../(tabs)/ProviderProfile';
import Reviews from '../(tabs)/Reviews';
import ServicesProviderProfile from '../(tabs)/ServicesProviderProfile';
import UserProfile from '../(tabs)/UserProfile';
import WelcomeScreen from '../(tabs)/WelcomeScreen';
import Wishlist from '../(tabs)/Wishlist';

// Define route types
type RootStackParamList = {
    Home: undefined;
    Orders: undefined;
    Packeti: undefined;
    ProfileOrder: undefined;
    ProviderProfile: undefined;
    Reviews: undefined;
    ServicesProviderProfile: undefined;
    UserProfile: undefined;
    Welcome: undefined;
    Wishlist: undefined;
};

// Create a stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <View style={{ flex: 1 }}>
            {/* Main navigation stack */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="Packeti" component={Packeti} />
                <Stack.Screen name="ProfileOrder" component={ProfileOrder} />
                <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
                <Stack.Screen name="Reviews" component={Reviews} />
                <Stack.Screen name="ServicesProviderProfile" component={ServicesProviderProfile} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Wishlist" component={Wishlist} />
            </Stack.Navigator>

            {/* Bottom navigation menu */}
            <BottomMenu />
        </View>
    );
}

// Bottom menu component
const BottomMenu = () => {
    return (
        <View style={styles.bottomMenu}>
            <MenuButton route="Home" icon={require('../../assets/images/home.png')} label="Головна" />
            <MenuButton route="Wishlist" icon={require('../../assets/images/book.png')} label="Чек-лист" />
            <MenuButton route="Orders" icon={require('../../assets/images/chat.png')} label="Замовлення" />
            <MenuButton route="ProviderProfile" icon={require('../../assets/images/user.png')} label="Профіль" />
        </View>
    );
};

// Placeholder component for Chat
const ChatPlaceholder = () => (
    <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Чат пока не реализован</Text>
    </View>
);

// Button component for the bottom menu
const MenuButton = ({ route, icon, label }: { route: keyof RootStackParamList; icon: any; label: string }) => {
    return (
        <TouchableOpacity
            style={styles.bottomMenuItem}
            onPress={() => console.log(`Navigating to ${route}`)}
        >
            <Image source={icon} style={styles.menuIcon} />
            <Text style={styles.bottomMenuText}>{label}</Text>
        </TouchableOpacity>
    );
};

// Styles for navigation
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