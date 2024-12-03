import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const PacketiScreen = () => {
    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Image source={require('../assets/images/backarrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Пакети послуг</Text>
                </View>

                <View style={styles.cardContainer}>
                    <Image source={require('../assets/images/flowerspackages.png')} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Пакет “Ніжність”</Text>
                        <Text style={styles.cardPrice}>10 000 грн</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesome name="star" size={18} color="#FFD700" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#FFD700" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#FFD700" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#BDBDBD" style={styles.star} />
                            <FontAwesome name="star" size={18} color="#BDBDBD" style={styles.star} />
                        </View>
                    </View>
                    <Image source={require('../assets/images/rightarrow.png')} style={styles.arrowIcon} />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default PacketiScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    backIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
    },
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
        textAlign: 'center',
        flex: 1,
    },
    cardContainer: {
        width: 340,
        backgroundColor: '#A4C644',
        borderRadius: 15,
        alignItems: 'center',
        padding: 0,
        marginVertical: 35,
        borderColor: '#78A519',
        borderWidth: 1,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    textContainer: { width: '100%', padding: 10 },
    cardTitle: {
        fontSize: 22,
        fontFamily: 'Kurale',
        color: '#fff',
    },
    cardPrice: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    star: { marginRight: 4 },
    arrowIcon: {
        width: 36,
        height: 26,
        position: 'absolute',
        right: 40,
        top: 150,
    },
});