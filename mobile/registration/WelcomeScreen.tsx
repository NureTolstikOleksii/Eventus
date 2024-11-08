import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
    return (
        <LinearGradient
            colors={['#b3e04e', '#ffffff']}
            style={styles.container}
        >
            <Image source={require('../../assets/images/capibara.png')} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={['#8BC34A', '#AED581']}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Зареєструватися</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.loginText}>
                    Якщо ви вже зареєстровані <Text style={styles.loginLink}>Увійдіть</Text>
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    button: {
        borderRadius: 25,
        marginTop: 20,
    },
    gradientButton: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#444',
        marginTop: 10,
        fontSize: 16,
    },
    loginLink: {
        color: '#6da72f',
        fontWeight: 'bold',
    },
});
