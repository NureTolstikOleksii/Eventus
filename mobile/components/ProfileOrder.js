import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu'; // Подключение компонента меню

const ProfileOrder = ({ route, navigation }) => {
    // Получаем параметр florist из route.params
    const { florist } = route.params;

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#fff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/backarrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Image source={require('../assets/images/chatwhite.png')} style={styles.icon} />
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image source={require('../assets/images/china.png')} style={styles.avatar} />
                    </View>
                    {/* Отображаем переданное имя флориста */}
                    <Text style={styles.nameText}>{florist}</Text>
                    <Text style={styles.organizationText}>Назва організації</Text>
                    <View style={styles.ratingContainer}>
                        {[...Array(4)].map((_, index) => (
                            <FontAwesome key={index} name="star" size={23} color="#6fa32b" style={styles.star} />
                        ))}
                        <FontAwesome name="star" size={23} color="gray" style={styles.star} />
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {[
                        { label: 'Послуги', screen: 'Orders' }, // Имя экрана 'Services'
                        { label: 'Пакети послуг', screen: 'Packeti' }, // Имя экрана 'ServicePackages'
                        { label: 'Відгуки', screen: 'Reviews' }, // Имя экрана 'Reviews'
                    ].map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => navigation.navigate(item.screen)} // Навигация на соответствующий экран
                            >
                                <Text style={styles.menuText}>{item.label}</Text>
                                <FontAwesome name="chevron-right" size={18} color="#6fa32b" />
                            </TouchableOpacity>
                            {/* Линия-разделитель */}
                            {index < 2 && <View style={styles.separator} />}
                        </View>
                    ))}
                </View>

                <View style={styles.contactContainer}>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactLabel}>Телефон:</Text>
                        <Text style={styles.contactText}>+380 97 123 4567</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactLabel}>Електронна пошта:</Text>
                        <Text style={styles.contactText}>florist.vasiliy@example.com</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Нижнее меню */}
            <BottomMenu />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backButton: { padding: 5 },
    icon: { width: 24, height: 24 },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontFamily: 'Kurale',
        fontSize: 24,
        color: '#fff',
    },
    organizationText: {
        fontFamily: 'Kurale',
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 3,
    },
    menuContainer: {
        width: '100%', // Увеличиваем ширину контейнера
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginVertical: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#999', // Цвет линии
        width: '100%', // Линия на всю ширину
    },
    menuText: {
        fontFamily: 'Kurale',
        fontSize: 18,
        color: '#6fa32b',
    },
    contactContainer: {
        width: '100%', // Контейнер на всю ширину
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginBottom: 10,
        marginTop: 100, // Отступ сверху
    },
    contactItem: {
        marginBottom: 15, // Отступ между строками
    },
    contactLabel: {
        fontFamily: 'Kurale',
        fontSize: 13,
        color: '#6fa32b',
        marginBottom: 5, // Отступ между лейблом и текстом
        textAlign: 'left', // Выравнивание по левому краю
    },
    contactText: {
        fontFamily: 'Kurale',
        fontSize: 13,
        color: '#6fa32b',
        textDecorationLine: 'underline',
        textAlign: 'left', // Выравнивание по левому краю
    },
});

export default ProfileOrder;
