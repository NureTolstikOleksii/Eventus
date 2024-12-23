import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const PaymentScreen = ({ route, navigation }) => {
        const { title, price } = route.params; // Получаем переданный orderId
        
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Оплата</Text>

                <Image source={require('../assets/images/hamsterkombatone.png')} style={styles.hamsterImage} />

                <Text style={styles.itemName}>{title || "Назва відсутня"}</Text>
                <Text style={styles.price}>{price || "Не вдалося отримати ціну"} грн</Text>

                <Text style={styles.paymentInfo}>Ви можете сплатити за допомогою:</Text>

                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/privat.png')} style={styles.logo} />
                    <Image source={require('../assets/images/mono.png')} style={styles.logo} />
                    <Image source={require('../assets/images/osad.png')} style={styles.logo} />
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
    header: {
        fontSize: 24,
        fontFamily: 'Kurale',
        color: '#83B620',
        marginBottom: 20,
    },
    hamsterImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    itemName: {
        fontSize: 32,
        fontFamily: 'Kurale',
        color: '#83B620',
        marginBottom: 10,
    },
    price: {
        fontSize: 32,
        fontFamily: 'Kurale',
        color: '#83B620',
        marginBottom: 30,
    },
    paymentInfo: {
        fontSize: 16,
        fontFamily: 'Cagliostro',
        color: '#3D3D3D',
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});

export default PaymentScreen;
