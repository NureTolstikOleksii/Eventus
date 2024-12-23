import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/Navigation';

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
           
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingTop: 60,
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
        height: 100, // Фиксированная высота для всех блоков
        width: '100%',
        justifyContent: 'center', // Центрирование текста по вертикали
        borderRadius: 10,
        marginBottom: 15, // Расстояние между блоками
        paddingHorizontal: 15, // Добавлен внутренний отступ для текста
    },
    serviceText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'left', // Текст выравнивается по левому краю
    },
    addButton: {
        marginTop: 5, // Отступ сверху для кнопки относительно блоков
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


});

export default ServicesScreen;
