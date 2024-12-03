import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomMenu from '../components/BottomMenu';

const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('home');
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);

    const topPackages = [
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 4, price: 500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 5, price: 1500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 3, price: 1200 },
    ];

    const topServices = [
        { title: 'День народження', image: require('../assets/images/birthday.png') },
        { title: 'День народження', image: require('../assets/images/birthday.png') },
        { title: 'День народження', image: require('../assets/images/birthday.png') },
    ];

    const categoryIcons = [
        { key: 'flower', image: require('../assets/images/flower.png') },
        { key: 'house', image: require('../assets/images/house.png') },
        { key: 'eat', image: require('../assets/images/eat.png') },
        { key: 'hb', image: require('../assets/images/hb.png') },
    ];

    const toggleCategory = (category) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const toggleRating = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    const applyFilters = () => {
        console.log('Filters applied:', { selectedCategories, selectedRating, priceRange });
        setFilterVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Основной контент */}
            <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.gradient}>
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <Text style={styles.cityText}>Харків</Text>
                        <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
                        <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} />
                    </View>

                    {/* Search and Filter */}
                    <View style={styles.searchAndFilterContainer}>
                        <View style={styles.searchBar}>
                            <Text style={styles.placeholderText}>Пошук</Text>
                        </View>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                            <FontAwesome name="bars" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Categories */}
                    <Text style={styles.sectionTitle}>Категорії</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                        {categoryIcons.map((icon) => (
                            <TouchableOpacity key={icon.key} style={styles.categoryItem}>
                                <Image source={icon.image} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Top Services */}
                    <Text style={styles.sectionTitle}>Топ послуг</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topServices}>
                        {topServices.map((service, index) => (
                            <View key={index} style={styles.serviceItem}>
                                <Image source={service.image} style={styles.serviceImage} />
                                <View style={styles.serviceLabel}>
                                    <Text style={styles.serviceLabelText}>{service.title}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Top Packages */}
                    <Text style={styles.greenSectionTitle}>Топ пакетів:</Text>
                    {topPackages.map((pkg, index) => (
                        <View key={index} style={styles.topPackageCard}>
                            <Image source={pkg.image} style={styles.topPackageImage} />
                            <View style={styles.topPackageDetails}>
                                <Text style={styles.topPackageTitle}>{pkg.title}</Text>
                                <Text style={styles.topPackagePrice}>{pkg.price} грн</Text>
                                <View style={styles.topPackageRating}>
                                    {[...Array(5)].map((_, i) => (
                                        <FontAwesome
                                            key={i}
                                            name="star"
                                            size={16}
                                            color={i < pkg.rating ? '#FFD700' : '#ccc'}
                                            style={{ marginRight: 4 }}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </LinearGradient>

            {/* Фиксированное меню */}
            <BottomMenu />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gradient: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    cityText: {
        color: '#fff',
        fontSize: 18,
    },
    locationIcon: {
        width: 16,
        height: 20,
        marginLeft: 10,
    },
    bellIcon: {
        width: 24,
        height: 24,
        marginLeft: 'auto',
    },
    searchAndFilterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#ffffff80',
        padding: 10,
        borderRadius: 10,
    },
    placeholderText: {
        color: '#888',
    },
    filterButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        color: '#fff',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    categoryContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    topServices: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    serviceItem: {
        width: 150,
        marginRight: 15,
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    serviceImage: {
        width: 150,
        height: 150,
    },
    serviceLabel: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#6fa32b',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    greenSectionTitle: {
        fontSize: 24,
        color: '#335237',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    topPackageCard: {
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#83B620',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    topPackageImage: {
        width: '100%',
        height: 100,
    },
    topPackageDetails: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topPackageTitle: {
        color: '#fff',
        fontSize: 16,
    },
    topPackagePrice: {
        color: '#fff',
        fontSize: 16,
    },
    topPackageRating: {
        flexDirection: 'row',
    },
});
