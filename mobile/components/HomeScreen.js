import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Убедитесь, что axios установлен
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomMenu from '../components/BottomMenu';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const HomeScreen = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const navigation = useNavigation(); // Инициализация навигации{
    const [topServices, setTopServices] = useState([]);
    const [topPackages, setTopPackages] = useState([]); // Добавляем состояние для топ-пакетов
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Для отображения статуса поиска
    const [categories, setCategories] = useState([]); // Данные категорий из БД
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_KEY}/filtering/categories`);
                setCategories(response.data || []);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const loadTopPackages = async () => {
            const packages = await fetchTopPackages();
            setTopPackages(packages || []); // Устанавливаем пустой массив, если данные отсутствуют
        };

        loadTopPackages();
    }, []);

    useEffect(() => {
        const loadTopServices = async () => {
            const services = await fetchTopServices();
            setTopServices(services || []); // Устанавливаем пустой массив, если данные отсутствуют
        };

        loadTopServices();
    }, []);

    useEffect(() => {
        if (searchText.length > 0) { // Начать поиск после ввода первой буквы
            performSearch(searchText);
        } else {
            setSearchResults([]); // Очистить результаты поиска, если текст пустой
        }
    }, [searchText]);

    useEffect(() => {
        console.log('Updated searchResults:', searchResults);
    }, [searchResults]);

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

    const fetchTopServices = async () => {
        try {
            const response = await axios.get(`${API_KEY}/main_screen/top_services`);
            return response.data.data || []; // Берём массив из поля data
        } catch (error) {
            console.error('Ошибка при получении топ-услуг:', error);
            return [];
        }
    };

    const applyFilters = async () => {
        setIsFiltering(true); // Увімкнути індикатор
        const filters = {
            category_ids: Object.keys(selectedCategories).filter((key) => selectedCategories[key]),
            rating: selectedRating,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        };
        console.log('Applying filters:', filters);
        try {
            const response = await axios.post(`${API_KEY}/filtering`, filters);
            console.log('Filtered results:', response.data);

            // Зберігаємо результати фільтрації
            setFilteredResults(response.data || []);
            setIsFiltered(true); // Позначаємо, що результати фільтрації активні
        } catch (error) {
            console.error('Помилка при застосуванні фільтрів:', error);
            setFilteredResults([]); // У разі помилки показати порожній список
        } finally {
            setIsFiltering(false); // Вимкнути індикатор
            setFilterVisible(false);
        }
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const toggleRating = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };

    const categoryIcons = [
        { key: 'flower', image: require('../assets/images/flower.png') },
        { key: 'house', image: require('../assets/images/house.png') },
        { key: 'eat', image: require('../assets/images/eat.png') },
        { key: 'hb', image: require('../assets/images/hb.png') },
        { key: 'velo', image: require('../assets/images/velo.png') },
    ];

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
                        <Image source={require('../assets/images/capibara.png')} style={styles.locationIcon} />
                        <Text style={styles.cityText}>Eventus</Text>
                        <TouchableOpacity onPress={() => alert('Ця функція поки що в розробці!')} style={styles.bellIcon} >
                            <Image source={require('../assets/images/bell.png')} style={styles.bellIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Modal for Filters */}
                    <Modal visible={isFilterVisible} transparent animationType="slide">
                        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
                            <View style={styles.modalContainer}>
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Фільтрація</Text>

                                        <Text style={styles.filterSectionTitle}>Категорія</Text>
                                        <View style={styles.checkboxContainer}>
                                            {categories.map((category) => (
                                                <TouchableOpacity
                                                    key={category.category_id}
                                                    style={styles.checkboxItem}
                                                    onPress={() => toggleCategory(category.category_id)}
                                                >
                                                    <FontAwesome
                                                        name={selectedCategories[category.category_id] ? 'check-square' : 'square-o'}
                                                        size={24}
                                                        color={selectedCategories[category.category_id] ? '#83B620' : '#ccc'}
                                                    />
                                                    <Text style={styles.checkboxText}>{category.name}</Text>
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
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
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
                        {isFiltered ? (
                            <View style={styles.resultsContainer}>
                                {/* Кнопка для скидання фільтрів */}
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={() => {
                                        setIsFiltered(false); // Скидаємо стан фільтрації
                                        setFilteredResults([]); // Очищуємо результати фільтрації
                                    }}
                                >
                                    <Text style={styles.resetButtonText}>Скинути фільтри</Text>
                                </TouchableOpacity>

                                {/* Відображення результатів фільтрації */}
                                {filteredResults.length > 0 ? (
                                    filteredResults.map((result, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.cardContainer}
                                            onPress={() => {
                                                navigation.navigate('OrdersDetailsScreen', {
                                                    serviceId: result.service_id,
                                                    title: result.name,
                                                    description: result.description,
                                                    photoUrl: result.photo_url || '../assets/images/placeholder.jpg',
                                                    price: result.price,
                                                    rating: result.rating,
                                                    florist: result.provider_name
                                                });
                                            }}
                                        >
                                            <Image
                                                source={
                                                    result.photo_url
                                                        ? { uri: result.photo_url }
                                                        : require('../assets/images/placeholder.jpg')
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
                        ) : searchText.length > 0 ? (
                            <View style={styles.resultsContainer}>
                                {isSearching ? (
                                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Пошук...</Text>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((result, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.cardContainer}
                                            onPress={() => {
                                                navigation.navigate('OrdersDetailsScreen', {
                                                    serviceId: result.service_id,
                                                    title: result.name,
                                                    description: result.description,
                                                    photoUrl: result.photo_url || '../assets/images/placeholder.jpg',
                                                    price: result.price,
                                                    rating: result.rating,
                                                    florist: result.provider_name
                                                });
                                            }}
                                        >
                                            <Image
                                                source={
                                                    result.photo_url
                                                        ? { uri: result.photo_url }
                                                        : require('../assets/images/placeholder.jpg')
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
                                                    navigation.navigate('OrdersDetailsScreen', {
                                                        serviceId: service.service_id,
                                                        title: service.name,
                                                        description: service.description,
                                                        photoUrl: service.photo_url || '../assets/images/placeholder.jpg',
                                                        price: service.price,
                                                        rating: service.rating,
                                                        florist: service.provider_name
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
    applyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#a6cf4a', // Салатовий фон
        paddingVertical: 8, // Зменшена висота
        paddingHorizontal: 15, // Зменшена ширина
        borderRadius: 15, // Менший радіус для закруглення
        alignSelf: 'flex-start', // Розташування зліва
        marginBottom: 10, // Відступ унизу
        marginLeft: 10, // Відступ зліва
        marginTop: 10, // Відступ зверху
        borderWidth: 0.3, // Товщина рамки
        borderColor: '#000', // Чорна рамка
    },
    resetButtonText: {
        color: '#fff', // Білий текст
        fontSize: 14, // Зменшений розмір шрифту
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        zIndex: 10,
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
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    cityText: {
        color: '#fff', // Зелений колір
        fontSize: 20,
        fontWeight: 'bold', // Жирний текст
    },
    locationIcon: {
        width: 30,
        height: 30,
        marginLeft: 0,
        marginRight: 5,
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
        paddingLeft: 5,
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
        paddingHorizontal: 5,
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
        paddingHorizontal: 5,
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
        flex: 2,
        justifyContent: 'flex-end', // Розташування внизу
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Напівпрозорий фон
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
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
