import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomMenu from '../components/BottomMenu';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('home');
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedRating, setSelectedRating] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); // Хранит "Послуга" или "Пакет"
    const [isServiceModalVisible, setServiceModalVisible] = useState(false); // Для модального окна


    const topPackages = [
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 4, price: 500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 4, price: 500 },
        { title: 'День народження', image: require('../assets/images/birthday.png'), rating: 4, price: 500 },

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
            <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={[styles.gradient, { flex: 1, position: 'relative' }]}
            >
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

                    {/* Search and Filter */}
                    <View style={styles.searchAndFilterContainer}>
                        {/* Пошуковий рядок */}
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

                        {/* Опции */}
                        {searchText.length > 0 && (
                            <View style={styles.optionsContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        selectedOption === 'Послуга' && styles.selectedOptionButton,
                                    ]}
                                    onPress={() => setSelectedOption('Послуга')}
                                >
                                    <Text style={styles.optionButtonText}>Послуга</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.optionButton,
                                        selectedOption === 'Пакет' && styles.selectedOptionButton,
                                    ]}
                                    onPress={() => setSelectedOption('Пакет')}
                                >
                                    <Text style={styles.optionButtonText}>Пакет</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Результаты */}
                        {selectedOption === 'Послуга' && searchText && (
                            <ScrollView style={styles.resultsContainer}>
                                {services
                                    .filter(service =>
                                        service.title.toLowerCase().includes(searchText.toLowerCase())
                                    )
                                    .map((service, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.cardContainer}
                        onPress={() => {
                            navigation.navigate('OrdersDetailsScreen', {
                                image: service.image,
                                title: service.title,
                                price: service.price,
                                florist: service.florist || 'Невідомий',
                                description: service.description || 'Опис цієї послуги недоступний',
                                rating: service.rating,
                            });
                        }}
    >
                        {/* Обертка вокруг картинки с событием onPress */}
                        <View style={styles.imageWrapper}>
                            <Image source={service.image} style={styles.cardImage} />
                        </View>

                        {/* Текстовая информация */}
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle} onPress={() => navigation.navigate('OrdersDetailsScreen', {
                                image: service.image,
                                title: service.title,
                                price: service.price,
                                florist: service.florist || 'Невідомий',
                                description: service.description || 'Опис цієї послуги недоступний',
                                rating: service.rating,
                            })}>{service.title}</Text>
                            <Text style={styles.cardPrice}>{service.price} грн</Text>
                        </View>
                    </TouchableOpacity>
                                    ))}
                            </ScrollView>
                        )}
                        {selectedOption === 'Пакет' && searchText && (
                            <ScrollView style={styles.resultsContainer}>
                                {packageCards.map((pkg, index) => (
                                    <View key={index} style={styles.packageCardContainer}>
                                        <Image source={pkg.image} style={styles.packageCardImage} resizeMode="cover" />
                                        <View style={styles.packageTextContainer}>
                                            <Text style={styles.packageCardTitle}>{pkg.title}</Text>
                                            <Text style={styles.packageCardPrice}>{pkg.price} грн</Text>
                                            <View style={styles.packageRatingContainer}>
                                                {[...Array(5)].map((_, i) => (
                                                    <FontAwesome
                                                        key={i}
                                                        name="star"
                                                        size={18}
                                                        color={i < pkg.rating ? '#FFD700' : '#BDBDBD'}
                                                        style={styles.packageStar}
                                                    />
                                                ))}
                                            </View>
                                        </View>
                                        <Image source={require('../assets/images/rightarrow.png')} style={styles.packageArrowIcon} />
                                    </View>
                                ))}
                            </ScrollView>
                        )}
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
                    <View style={{ height: 300 }}> {/* Установите желаемую высоту */}
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
                </ScrollView>
                {/* Нижнее меню */}
                <BottomMenu />
            </LinearGradient>


        </View>
    );
};

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
        width: 340,
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


});
export default HomeScreen;
