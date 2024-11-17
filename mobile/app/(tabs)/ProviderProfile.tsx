import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProviderProfile: React.FC = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Профіль</Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/pencil.png')} style={styles.editIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/images/providerphoto.png')} style={styles.profileImage} />
                <Text style={styles.userName}>Lee Know</Text>
                <Text style={styles.organizationName}>Назва організації</Text>
                <View style={styles.starsContainer}>
                    {[...Array(4)].map((_, index) => (
                        <Image
                            key={index}
                            source={require('../../assets/images/star_filled.png')}
                            style={styles.starIcon}
                        />
                    ))}
                    <Image
                        source={require('../../assets/images/star_outline.png')}
                        style={styles.starIcon}
                    />
                </View>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Послуги</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Пакети послуг</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
                    <Text style={styles.menuText}>Сповіщення</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
            </View>

            {/* Нижнее меню с пользовательскими иконками */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/home.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Головна</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={require('../../assets/images/add.png')} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Додати</Text>
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
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
    title: { fontSize: 20, color: '#ffffff' },
    backIcon: { width: 15, height: 15 },
    editIcon: { width: 28, height: 28 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 119, height: 116, borderRadius: 40 },
    userName: { fontSize: 22, color: '#ffffff', marginTop: 10 },
    organizationName: { fontSize: 16, color: '#ffffff', marginTop: 5 },
    starsContainer: { flexDirection: 'row', marginTop: 5 },
    starIcon: { width: 25, height: 25, marginHorizontal: 8 },
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

export default ProviderProfile;
