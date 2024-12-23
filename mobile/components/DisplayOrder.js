import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu'; // Подключаем компонент нижнего меню

const DisplayOrder = ({ navigation, route }) => {
    const { orderId } = route.params; // Извлекаем параметр orderId

    const order = {
        customer: 'Валера',
        date: '30.10.2024',
        time: '9:00',
        service: 'Букет',
        notes: 'Особливі побажання настрої!\nТакож Прошу включити квіти, які довго стоять свіжими.\nБажаю, щоб букет був яскравим.',
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>{orderId || 'Номер замовлення відсутній'}</Text>
            </View>
    
            {/* Order Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Замовник</Text>
                    <Text style={styles.detailValue}>{order.customer || 'Невідомий замовник'}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Дата</Text>
                    <Text style={styles.detailValue}>{order.date || 'Дата відсутня'}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Час</Text>
                    <Text style={styles.detailValue}>{order.time || 'Час відсутній'}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Послуга</Text>
                    <Text style={styles.detailValue}>{order.service || 'Послуга не вказана'}</Text>
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{order.notes || 'Примітки відсутні'}</Text>
                </View>
            </View>
    
            {/* Bottom Menu */}
            <BottomMenu />
        </LinearGradient>
    );
}    

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 30,},
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
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    detailItem: {
        backgroundColor: '#A4C644',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    notesContainer: {
        backgroundColor: '#A4C644',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
    },
    notesText: {
        fontSize: 16,
        color: '#ffffff',
        lineHeight: 22,
    },
});

export default DisplayOrder;
