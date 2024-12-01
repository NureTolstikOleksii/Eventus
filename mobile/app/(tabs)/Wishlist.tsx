import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/Navigation';

const WishlistScreen: React.FC = () => {
    const wishlistItems = [
        {
            title: 'Букет',
            supplier: 'Постачальник Василій',
            image: require('../../assets/images/roses.png'),
        },
        {
            title: 'Букет',
            supplier: 'Постачальник Петро',
            image: require('../../assets/images/roses2.png'),
        },
        {
            title: 'Букет',
            supplier: 'Постачальник Іван',
            image: require('../../assets/images/roses3.png'),
        },
    ];

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Список бажань</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.wishlistContainer, { paddingBottom: 100 }]}>
                {wishlistItems.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemSupplier}>{item.supplier}</Text>
                        </View>
                        <TouchableOpacity style={styles.removeButton}>
                            <Image source={require('../../assets/images/minus.png')} style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton}>
                <Image source={require('../../assets/images/plus.png')} style={styles.addIcon} />
            </TouchableOpacity>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60, // Увеличен отступ сверху
    },
    backIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
    },
    wishlistContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A4C644',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    itemImage: {
        width: 123,
        height: 77,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    itemSupplier: {
        fontSize: 14,
        color: '#ffffff',
    },
    removeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeIcon: {
        width: 20,
        height: 5,

    },
    addButton: {
        position: 'absolute', // Абсолютное позиционирование
        bottom: 250, // Расстояние от последнего элемента или нижнего края
        alignSelf: 'center', // Центрирование по горизонтали
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Для Android
    },
    addIcon: {
        width: 30,
        height: 30,
    },
    menuContainer: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6fa32b',
    },
    lastMenuItem: {
        borderBottomWidth: 0, // убираем нижнюю границу для последнего элемента
    },
    menuText: { fontSize: 20, color: '#6fa32b' },
    arrowIcon: { width: 15, height: 15, tintColor: '#6fa32b' },

    
});

export default WishlistScreen;
