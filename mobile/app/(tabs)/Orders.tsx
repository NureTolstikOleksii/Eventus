import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Navigation from '../navigation/Navigation';

const ServiceScreen: React.FC = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton}>
                        <Image source={require('../../assets/images/backarrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Послуги</Text>
                </View>

                <View style={styles.cardContainer}>
                    <Image source={require('../../assets/images/flowers.png')} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Букет “Ніжність”</Text>
                        <Text style={styles.cardPrice}>10 000 грн</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesome name="star" size={18} color="#FFD700" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#FFD700" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#BDBDBD" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#BDBDBD" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#BDBDBD" style={styles.star} />
                        </View>
                    </View>
                </View>
            </ScrollView>

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

export default ServiceScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60, // Увеличен отступ сверху
    },
    backIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
    },
    backButton: { padding: 5 },
    icon: { width: 24, height: 24 },
    headerText: {
        fontSize: 26,
        fontFamily: 'Kurale',
        color: '#fff',
        marginLeft: -35,
        textAlign: 'center',
        flex: 1,
    },
    cardContainer: {
        width: 340,
        height: 99,
        backgroundColor: '#A4C644',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 20,
        borderColor: '#78A519',
        borderWidth: 1,
    },
    cardImage: {
        width: 100, // Увеличено на 10 пикселей
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 22,
        fontFamily: 'Kurale',
        color: '#fff',
    },
    cardPrice: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 2,
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