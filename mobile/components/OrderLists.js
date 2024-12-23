import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu'; // Подключаем компонент нижнего меню

const OrderLists = ({ navigation }) => {
    const orders = [
        '№2452466',
        '№345678',
        '№234546',
        '№3656544',
        '№4636566',
        '№3465365',
    ];

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Замовлення</Text>
            </View>

            {/* Orders List */}
            <View style={styles.ordersContainer}>
                {orders.map((order, index) => (
                    <TouchableOpacity
                    key={index}
                    style={styles.orderItem}
                    onPress={() => navigation.navigate('DisplayOrder', { orderId: order })}
                >
                    <Text style={styles.orderText}>{order}</Text>
                    <Image
                        source={require('../assets/images/arrow_right.png')}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Menu */}
            <BottomMenu />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
        marginTop:30,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
        marginTop:30,
    },
    ordersContainer: {
        paddingHorizontal: 20,
        paddingTop: 50,
        marginBottom: 30,
    },
    orderItem: {
        backgroundColor: '#A4C644',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    orderText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'left',
    },
    arrowIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
    },
});

export default OrderLists;
