import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RegistrationScreen = () => {
    const [isProvider, setIsProvider] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Повне ім'я</Text>
            <TextInput style={styles.input} placeholder="Повне ім'я" />
            <Text style={styles.label}>Адреса ел. пошти</Text>
            <TextInput style={styles.input} placeholder="Адреса ел. пошти" keyboardType="email-address" />
            <Text style={styles.label}>Пароль</Text>
            <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
            <View style={styles.checkboxContainer}>
                <Switch value={isProvider} onValueChange={setIsProvider} />
                <Text style={styles.checkboxText}>Зареєструватися як постачальник</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#83B620', '#97D125', '#83B620']}
                    style={styles.gradientButton}
                >
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <View style={styles.socialContainer}>
                <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
                <Image source={require('../../assets/images/Facebook.png')} style={styles.socialIcon} />
            </View>
            <Text style={styles.linkText}>
                Вже маєте акаунт? <Text style={styles.registerText}>Увійдіть</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        marginLeft: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#CDE2A6',
        marginBottom: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        borderRadius: 30,
        marginTop: 10,
        width: '70%',
        alignSelf: 'center',
    },
    gradientButton: {
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 24,
        color: '#86B826',
        textShadowColor: '#B0B5A5',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    linkText: {
        color: '#333',
        textAlign: 'center',
    },
    registerText: {
        color: '#83B620',
    },
});

export default RegistrationScreen;
