import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomMenu from '../components/BottomMenu';

const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('home'); // Для отслеживания текущей вкладки

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        console.log(`Перешли на вкладку: ${tab}`); // Здесь можно добавить логику перехода
    };

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

    const [filteredPackages, setFilteredPackages] = useState(topPackages);

    const categories = [
        'Флористика',
        'Їжа',
        'Локації',
        'Зйомка',
        'Декор',
        'Розваги',
        'Організація',
        'Одяг та краса',
        'Транспорт',
        'Оренда',
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
       
       <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
       <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
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
                <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={styles.topPackagesWrapper}>
                    {filteredPackages.map((pkg, index) => (
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
                                            color={i < pkg.rating ? "#FFD700" : "#ccc"}
                                            style={{ marginRight: 4 }}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            
            {/* Modal for Filters */}
            <Modal visible={isFilterVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Фільтрація</Text>

                        <Text style={styles.filterSectionTitle}>Категорія</Text>
                        <View style={styles.checkboxContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={styles.checkboxItem}
                                    onPress={() => toggleCategory(category)}
                                >
                                    <FontAwesome
                                        name={selectedCategories[category] ? 'check-square' : 'square-o'}
                                        size={24}
                                        color={selectedCategories[category] ? '#83B620' : '#ccc'}
                                    />
                                    <Text style={styles.checkboxText}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.filterSectionTitle}>Рейтинг</Text>
                        <View style={styles.ratingContainer}>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <TouchableOpacity
                                    key={rating}
                                    style={styles.ratingItem}
                                    onPress={() => toggleRating(rating)}
                                >
                                    <FontAwesome
                                        name={selectedRating === rating ? 'check-square' : 'square-o'}
                                        size={24}
                                        color={selectedRating === rating ? '#83B620' : '#ccc'}
                                    />
                                    <View style={styles.ratingStars}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={20}
                                                color={i < rating ? '#6fa32b' : '#ddd'}
                                                style={{ marginRight: 4 }}
                                            />
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.filterSectionTitle}>Ціна</Text>
                        <View style={styles.priceSliderContainer}>
                            <View style={styles.sliderValues}>
                                <Text style={styles.sliderText}>{priceRange[0]} грн</Text>
                                <Text style={styles.sliderText}>{priceRange[1]} грн</Text>
                            </View>
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
                        </View>

                        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                            <Text style={styles.applyButtonText}>Застосувати</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
                
            </Modal>
            </ScrollView>
           
        </LinearGradient>
        <BottomMenu />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
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
    topServices: { paddingHorizontal: 20, marginBottom: 20 },
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    serviceLabelText: {
        color: '#fff',
        fontSize: 16,
    },
    greenSectionTitle: { fontSize: 24, color: '#335237', marginVertical: 10, paddingHorizontal: 20 },
    topPackagesWrapper: { paddingHorizontal: 20, marginBottom: 10 },
    topPackageCard: { borderRadius: 15, overflow: 'hidden', backgroundColor: '#83B620', marginBottom: 10 },
    topPackageImage: { width: '100%', height: 100 },
    topPackageDetails: { padding: 15, backgroundColor: '#6fa32b', flexDirection: 'row', justifyContent: 'space-between' },
    topPackageTitle: { color: '#fff', fontSize: 16 },
    topPackagePrice: { color: '#fff', fontSize: 16 },
    topPackageRating: { flexDirection: 'row' },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#83B620',
        marginBottom: 20,
    },
    filterSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#83B620',
        marginVertical: 10,
        alignSelf: 'flex-start',
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: '48%',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    ratingContainer: {
        width: '100%',
        alignItems: 'left',
    },
    ratingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    ratingStars: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    priceSliderContainer: {
        marginVertical: 20,
        width: '100%',
    },
    sliderValues: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sliderText: {
        fontSize: 16,
        color: '#000',
    },
    applyButton: {
        backgroundColor: '#83B620',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginTop: 20,
    },

// Place for bottom navigation

    applyButtonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
   
    
});
