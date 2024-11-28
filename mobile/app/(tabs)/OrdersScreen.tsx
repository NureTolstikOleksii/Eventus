import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OrdersScreen: React.FC = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Шапка с заголовком и стрелкой */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Мої замовлення</Text>
            </View>

            {/* Список заказов */}
            <ScrollView contentContainerStyle={[styles.ordersContainer, { paddingBottom: 100 }]}>
                {[
                    { title: 'Букет', date: '12/08/2024', price: '1 000 грн', image: require('../../assets/images/bouquet.png') },
                    { title: 'Банкет', date: '15/04/2024', price: '10 000 грн', image: require('../../assets/images/banquet.png') },
                    { title: 'День народження', date: '05/10/2024', price: '5 000 грн', image: require('../../assets/images/happy_birthday.png') },
                ].map((order, index) => (
                    <View key={index} style={styles.orderItem}>
                        <Image source={order.image} style={styles.orderImage} />
                        <View style={styles.overlay}>
                            <View style={styles.textContainer}>
                                <View style={styles.textLeft}>
                                    <Text style={styles.orderTitle}>{order.title}</Text>
                                    <Text style={styles.orderDate}>{order.date}</Text>
                                </View>
                                <Text style={styles.orderPrice}>{order.price}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.addButton}>
                <Image source={require('../../assets/images/plus.png')} style={styles.addIcon} />
            </TouchableOpacity>

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
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40, // Устанавливаем стрелку слева сверху
    },
    backIcon: {
        width: 15,
        height: 15,
        tintColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
    },
    ordersContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    orderItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        height: 70, // Уменьшаем высоту блока
    },
    orderImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)', // Делаем оверлей светлее
        justifyContent: 'center', // Размещаем текст ближе к центру блока
        paddingHorizontal: 15,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textLeft: {
        flexDirection: 'column',
    },
    orderTitle: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    orderDate: {
        color: '#ffffff',
        fontSize: 14,
    },
    orderPrice: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
    },
    addButton: {
        position: 'absolute', // Абсолютное позиционирование
        bottom: 450, // Расстояние от последнего элемента или нижнего края
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

export default OrdersScreen;