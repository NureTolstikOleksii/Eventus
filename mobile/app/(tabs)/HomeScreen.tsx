import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);

    return (
        <LinearGradient colors={['#b3e04e', '#ffffff']} style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.cityText}>Харків</Text>
                    <Image source={require('../../assets/images/location.png')} style={styles.locationIcon} />
                    <Image source={require('../../assets/images/bell.png')} style={styles.bellIcon} />
                </View>

                <View style={styles.searchAndFilterContainer}>
                    <View style={styles.searchBar}>
                        <Text style={styles.placeholderText}>Пошук</Text>
                    </View>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                        <FontAwesome name="bars" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Категорії</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.categoryItem}>
                        <Image source={require('../../assets/images/flower.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryItem}>
                        <Image source={require('../../assets/images/house.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryItem}>
                        <Image source={require('../../assets/images/eat.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryItem}>
                        <Image source={require('../../assets/images/hb.png')} style={styles.icon} />
                    </TouchableOpacity>
                    {/* Добавьте остальные категории */}
                </ScrollView>

                <Text style={styles.sectionTitle}>Топ пакетів</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topPackages}>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/birthday.png')} style={styles.packageImage} />
                        <Text style={styles.packageText}>День народження</Text>
                    </View>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/wedding.png')} style={styles.packageImage} />
                        <Text style={styles.packageText}>Весілля</Text>
                    </View>
                    {/* Добавьте остальные пакеты */}
                </ScrollView>

                <Text style={styles.sectionTitle}>Топ послуг:</Text>
                <View style={styles.servicesContainer}>
                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>Флористика</Text>
                        <Text style={styles.serviceDescription}>— оформлення квітами та композиції.</Text>
                    </View>
                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>Декор</Text>
                        <Text style={styles.serviceDescription}>— оформлення локацій, меблі, текстиль, елементи декору.</Text>
                    </View>
                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>Кейтеринг</Text>
                        <Text style={styles.serviceDescription}>— організація харчування, напої, сервірування.</Text>
                    </View>
                    <View style={styles.serviceItem}>
                        <Text style={styles.serviceTitle}>Фотографія та відеозйомка</Text>
                        <Text style={styles.serviceDescription}>— фотографи, відеооператори, фотозони.</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1 },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

        paddingBottom: 10
    },
    cityText: { color: '#fff', fontSize: 18 },
    locationIcon: { width: 16, height: 16, marginTop: 10, marginBottom: 10 },
    bellIcon: { width: 24, height: 24, marginLeft: 'auto' },
    searchAndFilterContainer: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 20 },
    searchBar: { flex: 1, backgroundColor: '#ffffff80', padding: 10, borderRadius: 10 },
    placeholderText: { color: '#888' },
    filterButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginVertical: 10, paddingHorizontal: 20 },
    categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
    categoryItem: { alignItems: 'center', marginHorizontal: 10 },
    icon: { width: 40, height: 40 },
    topPackages: { paddingHorizontal: 20, marginBottom: 10 },
    packageItem: { width: 150, marginRight: 15, alignItems: 'center' },
    packageImage: { width: 150, height: 150, borderRadius: 10 },
    packageText: { color: '#fff', fontWeight: 'bold', position: 'absolute', bottom: 10, left: 10 },
    servicesContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    serviceItem: {
        backgroundColor: '#6fa32b',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    serviceTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    serviceDescription: {
        color: '#fff',
        fontSize: 14,
    },
});
