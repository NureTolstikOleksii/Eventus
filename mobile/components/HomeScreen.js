import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'; // Убедитесь, что axios установлен
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomMenu from '../components/BottomMenu';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('home');
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [selectedOption, setSelectedOption] = useState(null); // Хранит "Послуга" или "Пакет"
    const [isServiceModalVisible, setServiceModalVisible] = useState(false); // Для модального окна
    const navigation = useNavigation(); // Инициализация навигации{
    const [topServices, setTopServices] = useState([]);
    const [topPackages, setTopPackages] = useState([]); // Добавляем состояние для топ-пакетов
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Для отображения статуса поиска

    useEffect(() => {
        const loadTopPackages = async () => {
            const packages = await fetchTopPackages();
            setTopPackages(packages || []); // Устанавливаем пустой массив, если данные отсутствуют
        };

        loadTopPackages();
    }, []);
    
    useEffect(() => {
        if (searchText.length > 0) { // Начать поиск после ввода первой буквы
            performSearch(searchText);
        } else {
            setSearchResults([]); // Очистить результаты поиска, если текст пустой
        }
    }, [searchText]);

    const performSearch = async (keyword) => {
        try {
            setIsSearching(true);
            const response = await axios.get(`${API_KEY}/search`, { params: { keyword } });
            console.log('Результаты поиска:', response.data);
            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Ошибка при поиске услуг:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };
    

    const fetchTopPackages = async () => {
        try {
            const response = await axios.get(`${API_KEY}/main_screen/top-packages`);
            return response.data.data || []; // Берём массив из поля data
        } catch (error) {
            console.error('Ошибка при получении топ-пакетов:', error);
            return [];
        }
    };

    
    useEffect(() => {
        const loadTopServices = async () => {
            const services = await fetchTopServices();
            setTopServices(services || []); // Устанавливаем пустой массив, если данные отсутствуют
        };
    
        loadTopServices();
    }, []);
    // Получение топ-услуг
    const fetchTopServices = async () => {
        try {
            const response = await axios.get(`${API_KEY}/main_screen/top_services`);
            return response.data.data || []; // Берём массив из поля data
        } catch (error) {
            console.error('Ошибка при получении топ-услуг:', error);
            return [];
        }
    };
    

    const categoryIcons = [
        { key: 'flower', image: require('../assets/images/flower.png') },
        { key: 'house', image: require('../assets/images/house.png') },
        { key: 'eat', image: require('../assets/images/eat.png') },
        { key: 'hb', image: require('../assets/images/hb.png') },
        { key: 'velo', image: require('../assets/images/velo.png') },
    ];
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
    const packageCards = [
        {
            title: 'Пакет “Ніжність”',
            image: require('../assets/images/flowerspackages.png'), // Проверь путь
            price: 10000,
            rating: 3,
        },
        {
            title: 'Пакет “Краса”',
            image: require('../assets/images/flowerspackages.png'),
            price: 12000,
            rating: 4,
        },
        {
            title: 'Пакет “Весна”',
            image: require('../assets/images/flowerspackages.png'),
            price: 8000,
            rating: 5,
        },
    ];
    // Пример данных для отображения услуг
    const services = [
        {
            title: 'Букет “Ніжність”',
            image: require('../assets/images/flowers.png'),
            price: 230,
            description: 'Опис послуги: Букет “Ніжність”...',
            florist: 'Василія',
            rating: 4,
        },
        {
            title: 'Букет “Краса”',
            image: require('../assets/images/flowers.png'),
            price: 250,
            description: 'Опис послуги: Букет “Краса”...',
            florist: 'Олена',
            rating: 5,
        },
    ];


    const toggleServiceModal = () => {
        setServiceModalVisible(!isServiceModalVisible);
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const filteredResults =
        selectedOption === 'Послуга'
            ? topServices
            : selectedOption === 'Пакет'
                ? topPackages
                : [];

    const toggleRating = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    const applyFilters = () => {
        console.log('Filters applied:', { selectedCategories, selectedRating, priceRange });
        setFilterVisible(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Основной контент */}
            <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={[styles.gradient, { flex: 1, position: 'relative' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                    style={styles.topPackages}
                >
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <Text style={styles.cityText}>Харків</Text>
                        <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
                        <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} />
                    </View>

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

                                <Text style={styles.ratingFilterTitle}>Рейтинг</Text>
                                <View style={styles.ratingListContainer}>
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <View key={rating} style={styles.ratingRow}>
                                            <TouchableOpacity onPress={() => toggleRating(rating)} style={styles.ratingCheckbox}>
                                                <FontAwesome
                                                    name={selectedRating === rating ? 'check-square' : 'square-o'}
                                                    size={24}
                                                    color={selectedRating === rating ? '#83B620' : '#ccc'}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.starsContainer}>
                                                {[...Array(5)].map((_, i) => (
                                                    <FontAwesome
                                                        key={i}
                                                        name="star"
                                                        size={20}
                                                        color={i < rating ? '#6fa32b' : '#ddd'}
                                                        style={styles.starIcon}
                                                    />
                                                ))}
                                            </View>
                                        </View>
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

    
                    {/* Search Bar */}
                    <View style={styles.searchAndFilterContainer}>
                        <View style={styles.searchBarContainer}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Пошук"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                                <FontAwesome name="bars" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
    
                        {/* Результаты поиска */}
                        {searchText.length > 0 ? (
                            <View style={styles.resultsContainer}>
                            {isSearching ? (
                                <Text style={{ textAlign: 'center', marginTop: 20 }}>Пошук...</Text>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.cardContainer}
                                        onPress={() => {
                                            navigation.navigate('ServiceDetailsScreen', {
                                                serviceId: result.service_id,
                                                title: result.name,
                                                description: result.description,
                                                price: result.price,
                                                rating: result.rating,
                                            });
                                        }}
                                    >
                                        {/* Проверка наличия photo_url */}
                                        <Image
                                            source={
                                                result.photo_url
                                                    ? { uri: result.photo_url } // URL фото из результата
                                                    : require('../assets/images/placeholder.jpg') // Плейсхолдер, если фото отсутствует
                                            }
                                            style={styles.serviceSearchImage}
                                        />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.cardTitle}>{result.name}</Text>
                                            <Text style={styles.cardPrice}>{result.price} грн</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={{ textAlign: 'center', marginTop: 20 }}>Нічого не знайдено</Text>
                            )}
                        </View>
                        ) : (
                            <>
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
                                    {Array.isArray(topServices) && topServices.length > 0 ? (
                                        topServices.map((service, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.serviceItem}
                                                onPress={() => {
                                                    navigation.navigate('ServiceDetailsScreen', {
                                                        serviceId: service.service_id,
                                                        title: service.name,
                                                        description: service.description,
                                                        photoUrl: service.photo_url,
                                                        price: service.price,
                                                        rating: service.rating,
                                                    });
                                                }}
                                            >
                                                <Image
                                                    source={
                                                        service.photo_url
                                                            ? { uri: service.photo_url }
                                                            : require('../assets/images/placeholder.jpg')
                                                    }
                                                    style={styles.serviceImage}
                                                />
                                                <View style={styles.serviceLabel}>
                                                    <Text style={styles.serviceLabelText}>{service.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Завантаження послуг...</Text>
                                    )}
                                </ScrollView>
    
                                {/* Top Packages */}
                                <Text style={styles.greenSectionTitle}>Топ пакетів:</Text>
                                <ScrollView style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        {topPackages.map((pkg, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.topPackageCard}
                                                onPress={() => {
                                                    navigation.navigate('PackageDetailsScreen', {
                                                        packageId: pkg.package_id,
                                                        title: pkg.name,
                                                        description: pkg.description,
                                                        photoUrl: pkg.photo_url,
                                                        price: pkg.price,
                                                        duration: pkg.duration,
                                                        services: pkg.services,
                                                    });
                                                }}
                                            >
                                                <Image
                                                    source={
                                                        pkg.photo_url
                                                            ? { uri: pkg.photo_url }
                                                            : require('../assets/images/placeholder.jpg')
                                                    }
                                                    style={styles.topPackageImage}
                                                />
                                                <View style={styles.topPackageDetails}>
                                                    <Text style={styles.topPackageTitle}>{pkg.name}</Text>
                                                    <Text style={styles.topPackagePrice}>{pkg.price} грн</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </>

                            
                        )}
                    </View>
                </ScrollView>
                <View style={styles.bottomMenu}>
                    <BottomMenu />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomMenu: {
        position: 'absolute', // Фиксированное позиционирование
        bottom: 0,           // Привязываем к нижнему краю
        left: 0,
        right: 0,
        height: 60,          // Высота меню (измените по необходимости)
        backgroundColor: '#fff', // Цвет фона для видимости (опционально)
        zIndex: 10,          // Убедиться, что меню выше остальных компонентов
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gradient: {
        flex: 1,
        paddingTop: 30, 
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
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    selectedOptionButton: {
        borderWidth: 5, // Толщина рамки
        borderColor: '#83B620', // Зеленый цвет рамки
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Иконка и строка поиска на одной линии
        justifyContent: 'space-between',
    },

    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    toggleButton: {
        flex: 1,
        height: 30, // Устанавливает фиксированную высоту кнопки
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#6fa32b',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButtonSelected: {
        backgroundColor: '#6fa32b',
    },
    toggleButtonText: {
        fontSize: 18,
        color: '#6fa32b',
    },
    toggleButtonTextSelected: {
        color: '#fff',
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#ffffff80',
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        color: '#000',
        marginRight: 10, // Отступ для иконки фильтрации

    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Равномерное распределение кнопок
        marginTop: 10,
        marginRight: 50,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#ccc', // Рамка по умолчанию
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 30,
        backgroundColor: '#ffffff80', // Бледный зеленый фон
        justifyContent: 'center', // Центрирование текста по вертикали
        alignItems: 'center', // Центрирование текста по горизонтали
    },
    placeholderText: {
        color: '#888',
    },
    filterButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        fontSize: 16,
        color: '#000',
    },
    optionText: {
        color: '#83B620',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 24,
        color: '#fff',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    categoryContainer: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginBottom: 10,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    icon: {
        width: 53,
        height: 53,
    },
    topServices: {
        marginBottom: 20,
        paddingHorizontal: 0,
        marginHorizontal: 0,
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

    serviceSearchImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        marginLeftt: 0,
        margin: 0, // Убираем отступы
        padding: 0,
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
    serviceLabelText: {
        color: '#fff',
        fontSize: 16,
    },
    greenSectionTitle: {
        fontSize: 24,
        color: '#83B620',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    topPackageCard: {
        width: '100%', // Ширина 90% от экрана, чтобы учесть отступы
        marginHorizontal: '5%', // Отступы по бокам
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#83B620',
        marginBottom: 10,
        paddingHorizontal: 0,
        marginHorizontal: 0,
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
    resultsContainer: {
        marginTop: 20,
    },
    cardContainer: {
        width: 340,
        height: 99,
        backgroundColor: '#A4C644',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderColor: '#78A519',
        borderWidth: 1,
        padding: 0, 
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

    packageCardContainer: {
        width: '100%', // Занимает всю ширину экрана
        backgroundColor: '#A4C644',
        borderRadius: 15,
        alignItems: 'center',
        padding: 0,
        marginVertical: 10,
        borderColor: '#78A519',
        borderWidth: 1,
        
    },
    packageCardImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    packageTextContainer: {
        width: '100%',
        padding: 10
    },
    packageCardTitle: {
        fontSize: 22,
        fontFamily: 'Kurale',
        color: '#fff',
    },
    packageCardPrice: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    packageRatingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    packageStar: {
        marginRight: 4
    },
    packageArrowIcon: {
        width: 36,
        height: 26,
        position: 'absolute',
        right: 40,
        top: 150,
    },
    ratingFilterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#83B620',
        marginVertical: 10,
        textAlign: 'left', // Выравнивание текста заголовка влево
        alignSelf: 'flex-start', // Заголовок "Рейтинг" будет выровнен по левому краю контейнера
        marginLeft: 0, // Отступ слева для заголовка
    },

    ratingListContainer: {
        flexDirection: 'column', // Расположение рейтингов вертикально
        alignItems: 'flex-start', // Выравнивание всего списка рейтингов по левому краю
        alignSelf: 'flex-start', // Заголовок "Рейтинг" будет выровнен по левому краю контейнера
        marginLeft: 0, // Отступ слева для заголовка
    },

    ratingRow: {
        flexDirection: 'row', // Расположение чекбокса и звёзд в одной строке
        alignItems: 'center',
        marginBottom: 10, // Отступ между строками рейтинга
    },

    ratingCheckbox: {
        justifyContent: 'center', // Центрирование чекбокса по вертикали
        alignItems: 'center',
        marginRight: 10, // Отступ между чекбоксом и звёздами
    },

    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    starIcon: {
        marginHorizontal: 2, // Отступ между звёздами
    },
    topPackages: {
        width: '100%',
        paddingHorizontal: 0,
        marginHorizontal: 0,
    },
});

export default HomeScreen;
