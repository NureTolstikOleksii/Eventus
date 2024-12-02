import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
    const navigation = useNavigation(); // Используем хук для навигации

    const menuItems = [
        { route: 'Home', icon: require('../assets/images/home.png'), label: 'Головна' },
        { route: 'Wishlist', icon: require('../assets/images/book.png'), label: 'Чек-лист' },
        { route: 'Chat', icon: require('../assets/images/chat.png'), label: 'Чат' },
        { route: 'ProviderProfile', icon: require('../assets/images/user.png'), label: 'Профіль' },
    ];

    return (
        <View style={styles.bottomMenu}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.bottomMenuItem}
                    onPress={() => navigation.navigate(item.route)}
                >
                    <Image source={item.icon} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomMenu: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
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
});

export default BottomMenu;