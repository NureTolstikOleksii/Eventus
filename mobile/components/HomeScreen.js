import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const HomeScreen = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);

    const topPackages = [
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 4, price: 500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 5, price: 1500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 3, price: 1200 },
    ];

    const categoryIcons = [
        { key: 'flower', image: require('../assets/images/flower.png') },
        { key: 'house', image: require('../assets/images/house.png') },
        { key: 'eat', image: require('../assets/images/eat.png') },
        { key: 'hb', image: require('../assets/images/hb.png') },
    ];

    const [filteredPackages, setFilteredPackages] = useState(topPackages);

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
        const [min, max] = priceRange;
        const filtered = topPackages.filter(
            (pkg) =>
                pkg.price >= min &&
                pkg.price <= max &&
                (selectedRating === null || pkg.rating === selectedRating)
        );
        setFilteredPackages(filtered);
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.cityText}>Харків</Text>
                    <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
                    <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} />
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                    {categoryIcons.map((icon) => (
                        <TouchableOpacity key={icon.key} style={styles.categoryItem}>
                            <Image source={icon.image} style={styles.icon} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Топ пакетів</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topPackages}>
                    {filteredPackages.map((pkg, index) => (
                        <View key={index} style={styles.packageItem}>
                            <Image source={pkg.image} style={styles.packageImage} />
                            <View style={styles.packageLabel}>
                                <Text style={styles.packageLabelText}>{pkg.title}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>

            <Modal visible={isFilterVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Фільтрація</Text>
                        <Text style={styles.filterSectionTitle}>Ціна</Text>
                        <MultiSlider
                            values={priceRange}
                            sliderLength={250}
                            onValuesChange={(values) => setPriceRange(values)}
                            min={0}
                            max={2000}
                            step={100}
                            selectedStyle={{ backgroundColor: '#6fa32b' }}
                            unselectedStyle={{ backgroundColor: '#ddd' }}
                            markerStyle={{ backgroundColor: '#6fa32b' }}
                        />
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                applyFilters();
                                setFilterVisible(false);
                            }}
                        >
                            <Text style={styles.applyButtonText}>Застосувати</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, paddingBottom: 80 },
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60 },
    cityText: { color: '#fff', fontSize: 18 },
    locationIcon: { width: 16, height: 20, marginLeft: 10 },
    bellIcon: { width: 24, height: 24, marginLeft: 'auto' },
    searchAndFilterContainer: { flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10 },
    searchBar: { flex: 1, backgroundColor: '#ffffff80', padding: 10, borderRadius: 10 },
    placeholderText: { color: '#888' },
    filterButton: { marginLeft: 10, alignItems: 'center', justifyContent: 'center' },
    sectionTitle: { fontSize: 24, color: '#fff', marginVertical: 10, paddingHorizontal: 20 },
    categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
    categoryItem: { alignItems: 'center', marginHorizontal: 10 },
    icon: { width: 40, height: 40 },
    topPackages: { paddingHorizontal: 20, marginBottom: 10 },
    packageItem: { width: 150, marginRight: 15, alignItems: 'center' },
    packageImage: { width: 150, height: 150, borderRadius: 20 },
    packageLabel: { position: 'absolute', bottom: 0, backgroundColor: '#6fa32b', width: '100%', paddingVertical: 10 },
    packageLabelText: { color: '#fff', textAlign: 'center' },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#6fa32b', marginBottom: 20 },
    filterSectionTitle: { fontSize: 18, marginVertical: 10 },
    applyButton: { backgroundColor: '#6fa32b', padding: 15, borderRadius: 10, alignItems: 'center' },
    applyButtonText: { color: '#fff', fontSize: 16 },
});