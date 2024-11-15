import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#fff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Image source={{ uri: '../../assets/images/backarrow.png' }} style={styles.icon} />
                    </TouchableOpacity>
                    <Image source={{ uri: '../../assets/images/chatwhite.png' }} style={styles.icon} />
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: '../../assets/images/china.png' }} style={styles.avatar} />
                    </View>
                    <Text style={styles.nameText}>Lee Know</Text>
                    <Text style={styles.organizationText}>Назва організації</Text>
                    <View style={styles.ratingContainer}>
                        {[...Array(4)].map((_, index) => (
                            <FontAwesome key={index} name="star" size={23} color="#6fa32b" style={styles.star} />
                        ))}
                        <FontAwesome name="star" size={23} color="gray" style={styles.star} />
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {['Послуги', 'Пакети послуг', 'Відгуки', 'Адреса'].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <Text style={styles.menuText}>{item}</Text>
                            <FontAwesome name="chevron-right" size={18} color="#6fa32b" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.contactContainer}>
                    <Text style={styles.contactLabel}>Телефон:</Text>
                    <Text style={styles.contactText}>+380 97 123 4567</Text>
                    <Text style={styles.contactLabel}>Електронна пошта:</Text>
                    <Text style={styles.contactText}>florist.vasiliy@example.com</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={{ uri: '../../assets/images/home.png' }} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Головна</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={{ uri: '../../assets/images/book.png' }} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Чек-лист</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={{ uri: '../../assets/images/chat.png' }} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Чат</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomMenuItem}>
                    <Image source={{ uri: '../../assets/images/user.png' }} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>Профіль</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backButton: { padding: 5 },
    icon: { width: 24, height: 24 },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontFamily: 'Kurale',
        fontSize: 24,
        color: '#fff',
    },
    organizationText: {
        fontFamily: 'Kurale',
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 3, // Adjusted spacing between stars
    },
    menuContainer: {
        width: '90%',
        backgroundColor: 'transparent', // Transparent background for menu boxes
        borderRadius: 10,
        marginVertical: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999', // Darker line color
    },
    menuText: {
        fontFamily: 'Kurale',
        fontSize: 18,
        color: '#6fa32b',
    },
    contactContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginBottom: 10,
    },
    contactLabel: {
        fontFamily: 'Kurale',
        fontSize: 13,
        color: '#6fa32b',
        marginBottom: 5,
    },
    contactText: {
        fontFamily: 'Kurale',
        fontSize: 13,
        color: '#6fa32b',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
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
        fontFamily: 'Kurale',
        fontSize: 12,
        color: '#6fa32b',
    },
});