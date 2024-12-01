import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/Navigation';

const UserProfile: React.FC = () => {
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
                <Image source={require('../../assets/images/userphoto.png')} style={styles.profileImage} />
                <Text style={styles.userName}>Валєра</Text>
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Список бажань</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Чек-лист</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Мої замовлення</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Чат</Text>
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
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', paddingTop: 60 },
    title: { fontSize: 20, color: '#ffffff' },
    backIcon: { width: 15, height: 15 },
    editIcon: { width: 28, height: 28 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 130, height: 130, borderRadius: 40 },
    userName: { fontSize: 22, color: '#ffffff', marginTop: 10 },
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

export default UserProfile;
