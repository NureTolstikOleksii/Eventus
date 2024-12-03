import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProviderProfile = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Профіль</Text>
            </View>
            <View style={styles.profileContainer}>
                <Image source={require('../assets/images/providerphoto.png')} style={styles.profileImage} />
                <Text style={styles.userName}>Ім'я користувача</Text>
                <Text style={styles.organizationName}>Назва організації</Text>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Послуги</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Пакети послуг</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
                    <Text style={styles.menuText}>Сповіщення</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', paddingTop: 60 },
    title: { fontSize: 20, color: '#ffffff' },
    backIcon: { width: 15, height: 15 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 120, height: 120, borderRadius: 60 },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 10 },
    organizationName: { fontSize: 16, color: '#fff', marginTop: 5 },
    menuContainer: { marginTop: 30 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6fa32b',
    },
    lastMenuItem: { borderBottomWidth: 0 },
    menuText: { fontSize: 18, color: '#6fa32b' },
    arrowIcon: { width: 15, height: 15, tintColor: '#6fa32b' },
});

export default ProviderProfile;