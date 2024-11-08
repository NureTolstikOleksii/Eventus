import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RegistrationProviderScreen = () => {
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
            <Text style={styles.label}>Назва підприємства</Text>
            <TextInput style={styles.input} placeholder="Назва підприємства" />
            <Text style={styles.label}>Категорія послуг</Text>
            <TextInput style={styles.input} placeholder="Категорія послуг" />
            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#83B620', '#97D125', '#83B620']}
                    style={styles.gradientButton}
                >
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </LinearGradient>
            </TouchableOpacity>
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
        marginLeft: 10,
    },
    input: {
        height: 50,
        backgroundColor: '#CDE2A6',
        marginBottom: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
        borderWidth: 0,
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
});

export default RegistrationProviderScreen;
