import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu'; // Подключаем компонент нижнего меню

const Orders = ({ navigation }) => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={require('../assets/images/arrow.png')} 
                            style={styles.icon} 
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Послуги</Text>
                </View>

                <View style={styles.cardContainer}>
                    <Image 
                        source={require('../assets/images/flowers.png')} 
                        style={styles.cardImage} 
                        resizeMode="cover" 
                    />
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


            {/* Нижнее меню */}
            <BottomMenu />
        </LinearGradient>
    );
};



const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
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
        width: 100,
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
});
// New screen was added
export default Orders;