import React, { useState, useEffect } from 'react'; // Додано useEffect для завантаження замовлень
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";
const API_KEY = Constants.expoConfig?.extra?.API_KEY;


const OrdersScreen = () => {
    const navigation = useNavigation(); // Подключаем навигацию
    const [orders, setOrders] = useState([]); // Стан для збереження замовлень

    const fetchUserOrders = async () => {
        try {
            console.log("Fetching user orders..."); // Для відлагодження
            const response = await fetch(`${API_KEY}/profile/user_orders`, {
                method: 'GET',
                credentials: 'include', // Передача cookies для сесії
            });
    
            if (response.ok) {
                const orders = await response.json();
                console.log("Orders fetched successfully:", orders); // Перевіряємо, що отримано
                setOrders(orders); // Оновлення стану замовлень
            } else {
                const errorResponse = await response.json();
                console.error("Failed to fetch orders:", errorResponse);
                Alert.alert('Помилка', errorResponse.message || 'Не вдалося завантажити замовлення.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error.message);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };
    

    // Завантаження замовлень при завантаженні компонента
    useEffect(() => {
        fetchUserOrders();
    }, []);

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Шапка с заголовком и стрелкой */}
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Мої замовлення</Text>
            </View>

            {/* Список заказов */}
            <ScrollView contentContainerStyle={[styles.ordersContainer, { paddingBottom: 100 }]}>
    {orders.length > 0 ? (
        orders.map((order, index) => (
            <View key={index} style={styles.orderItem}>
                <View style={styles.textContainer}>
                    <View style={styles.textLeft}>
                        <Text style={styles.orderTitle}>{order.order_name}</Text>
                        <Text style={styles.orderDate}>{new Date(order.order_date).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.orderPrice}>{order.total_price} грн</Text>
                </View>
            </View>
        ))
    ) : (
        <Text style={styles.noOrdersText}>Замовлень немає</Text>
    )}
</ScrollView>

        {/* Кнопка с переходом */}
        {/* <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('ItemAddScreen')} // Переход на ItemAddScreen
            >
                <Image source={require('../assets/images/plus.png')} style={styles.addIcon} />
            </TouchableOpacity> */}



            {/* Нижнее меню */}
            <BottomMenu />
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
    noOrdersText: {
        fontSize: 16, // Збільшуємо шрифт
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40,
    },
    backIcon: {
        width: 20,
        height: 25,
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
        backgroundColor: '#a6cf4a', // Яскравий зелений фон
        borderRadius: 15, // Збільшуємо закруглення
        marginVertical: 10,
        padding: 20, // Збільшуємо внутрішній відступ
        elevation: 5, // Тінь для Android
        shadowColor: '#000', // Тінь для iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textLeft: {
        flexDirection: 'column',
    },
    orderTitle: {
        fontSize: 18, // Більший текст
        color: '#ffffff', // Білий текст
        fontWeight: 'bold',
        marginBottom: 5, // Відступ між текстами
    },
    orderDate: {
        color: '#ffffff', // Білий текст
        fontSize: 16, // Більший розмір шрифту
    },
    orderPrice: {
        color: '#ffffff', // Білий текст
        fontSize: 16, // Більший текст
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 300,
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
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
        borderBottomWidth: 0,
    },
    menuText: { fontSize: 20, color: '#6fa32b' },
    arrowIcon: { width: 15, height: 15, tintColor: '#6fa32b' },
});


export default OrdersScreen;
