import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ServicesScreen: React.FC = () => {
    const services = [
        'Букет',
        'Прикраса зали',
        'Прикраса автомобілю',
        'Букет нареченої'
    ];

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Послуги</Text>
            </View>
            <View style={styles.servicesContainer}>
                {services.map((service, index) => (
                    <TouchableOpacity key={index} style={styles.serviceItem}>
                        <Text style={styles.serviceText}>
                            {service.split(' ').map((word, idx) =>
                                idx === 1 ? `\n${word}` : word
                            )}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
            {/* Нижнее меню с пользовательскими иконками */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/home.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Головна</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/book.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Чек-лист</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/chat.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Чат</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/user.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Профіль</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
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
    servicesContainer: {
        paddingHorizontal: 20,
        paddingTop: 70,
        marginBottom: 30,
        alignItems: 'center', // Центрируем элементы, включая кнопку "+"
    },
    serviceItem: {
        backgroundColor: '#A4C644',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15, // Расстояние между блоками
        width: '100%',
    },
    serviceText: {
        fontSize: 18,
        color: '#ffffff',
        flexWrap: 'wrap', // Перенос текста на следующую строку
    },
    addButton: {
        marginTop: 20, // Отступ сверху для кнопки относительно блоков
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontSize: 50,
        color: '#6fa32b',
        fontWeight: 'bold',
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

    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        justifyContent: 'space-around',
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
    },
});

export default ServicesScreen;
