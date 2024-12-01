import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen: React.FC = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [minPrice, setMinPrice] = useState<string>(''); // Для минимальной цены
    const [maxPrice, setMaxPrice] = useState<string>(''); // Для максимальной цены
    const topPackages = [
        { title: 'День народження', image: require('../../assets/images/birthday.png'), rating: 4, price: 500 },
        { title: 'День народження', image: require('../../assets/images/birthday.png'), rating: 5, price: 1500 },
        { title: 'День народження', image: require('../../assets/images/birthday.png'), rating: 3, price: 1200 },
        { title: 'День народження', image: require('../../assets/images/birthday.png'), rating: 3, price: 1200 },

    ];


    

    const [filteredPackages, setFilteredPackages] = useState(topPackages);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const toggleRating = (rating: number) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };
    const [priceRange, setPriceRange] = useState([0, 2000]);

    // Функция фильтрации
    const applyFilters = () => {
        const [min, max] = priceRange; // Минимальная и максимальная цена из слайдера
        const filtered = topPackages.filter(
            (pkg) =>
                pkg.price >= min &&
                pkg.price <= max &&
                (selectedRating === null || pkg.rating === selectedRating)
        );
        setFilteredPackages(filtered); // Обновляем отображаемые пакеты
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
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
                    {/* Используем FontAwesome временно для фильтрации */}
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
                </ScrollView>

                <Text style={styles.sectionTitle}>Топ послуг</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topPackages}>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/birthday.png')} style={styles.packageImage} />
                        <View style={styles.packageLabel}>
                            <Text style={styles.packageLabelText}>День народження</Text>
                        </View>
                    </View>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/birthday.png')} style={styles.packageImage} />
                        <View style={styles.packageLabel}>
                            <Text style={styles.packageLabelText}>День народження</Text>
                        </View>
                    </View>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/birthday.png')} style={styles.packageImage} />
                        <View style={styles.packageLabel}>
                            <Text style={styles.packageLabelText}>День народження</Text>
                        </View>
                    </View>
                </ScrollView>

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.greenSectionTitle}>Топ пакетів:</Text>
                    <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={styles.topPackagesWrapper}>
                        {topPackages.map((pkg, index) => (
                            <View key={index} style={styles.topPackageCard}>
                                <Image source={pkg.image} style={styles.topPackageImage} />
                                <View style={styles.topPackageDetails}>
                                    <Text style={styles.topPackageTitle}>{pkg.title}</Text>
                                    <Text style={styles.topPackageTitle}>{pkg.price} грн</Text>
                                    <View style={styles.topPackageRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={16}
                                                color={i < pkg.rating ? "#FFD700" : "#ccc"} // Жёлтые звёзды для рейтинга, серые для отсутствующих
                                                style={{ marginRight: 4 }} // Добавляем отступы между звёздами
                                            />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </ScrollView>


            </ScrollView>
            {/* Модальное окно фильтрации */}
            <Modal visible={isFilterVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Фільтрація</Text>

                        {/* Фильтр по категориям */}
                        <Text style={styles.filterSectionTitle}>Категорія</Text>
                        <View style={styles.checkboxContainer}>
                            {["Флористика", "Їжа", "Локації", "Зйомка", "Декор", "Розваги", "Організація", "Одяг та краса", "Транспорт", "Оренда"].map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={styles.checkboxItem}
                                    onPress={() => toggleCategory(category)}
                                >
                                    <FontAwesome
                                        name={selectedCategories[category] ? "check-square" : "square-o"}
                                        size={24}
                                        color={selectedCategories[category] ? "#83B620" : "#ccc"}
                                    />
                                    <Text style={{ marginLeft: 8 }}>{category}</Text>
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
                                        name={selectedRating === rating ? "check-square" : "square-o"}
                                        size={24}
                                        color={selectedRating === rating ? "#83B620" : "#ccc"}
                                    />
                                    <View style={styles.ratingStars}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={20}
                                                color={i < rating ? "#6fa32b" : "#ddd"} // Зелёные звезды для рейтинга, серые для оставшихся
                                                style={styles.starIcon}

                                            />
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* Слайдер для выбора диапазона цен */}
                        <Text style={styles.filterSectionTitle}>Ціна</Text>
                        <View style={styles.sliderContainer}>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>{priceRange[0]} грн</Text>
                                <Text style={styles.priceLabel}>{priceRange[1]} грн</Text>
                            </View>
                            <MultiSlider
                                values={priceRange}
                                sliderLength={250} // Длина слайдера
                                onValuesChange={(values) => setPriceRange(values)} // Обновляем диапазон цен
                                min={0} // Минимальное значение
                                max={2000} // Максимальное значение
                                step={100} // Шаг изменения значений
                                selectedStyle={{
                                    backgroundColor: '#6fa32b', // Цвет активной линии
                                }}
                                unselectedStyle={{
                                    backgroundColor: '#ddd', // Цвет неактивной линии
                                }}
                                markerStyle={{
                                    backgroundColor: '#6fa32b', // Цвет маркеров
                                }}
                            />
                        </View>
                        {/* Кнопка "Застосувати" */}
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                applyFilters();
                                setFilterVisible(false);
                            }}
                        >
                            <LinearGradient colors={['#83B620', '#83B620']} style={styles.applyGradientButton}>
                                <Text style={styles.applyButtonText}>Застосувати</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            

        </LinearGradient>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1, // Занимает всё пространство экрана
        backgroundColor: '#fff', // Белый фон (или любой нужный)
    },

    scrollContainer: { flexGrow: 1, paddingBottom: 80 },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    cityText: { color: '#fff', fontSize: 18 },
    locationIcon: { width: 16, height: 20, marginBottom: 10, alignSelf: 'flex-start', marginTop: 5 },
    bellIcon: { width: 24, height: 24, marginLeft: 'auto' },
    searchAndFilterContainer: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 20 },
    searchBar: { flex: 1, backgroundColor: '#ffffff80', padding: 10, borderRadius: 10 },
    placeholderText: { color: '#888' },
    filterButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
    filterIcon: { width: 24, height: 24 },
    sectionTitle: { fontSize: 24, color: '#fff', marginVertical: 10, paddingHorizontal: 20 },
    topServicesTitle: {
        fontSize: 18,
        color: '#335237',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
    categoryItem: { alignItems: 'center', marginHorizontal: 10 },
    icon: { width: 40, height: 40 },
    topPackages: { paddingHorizontal: 20, marginBottom: 10 },
    packageItem: {
        width: 150,
        marginRight: 15,
        alignItems: 'center',
    },
    packageImage: { width: 150, height: 150, borderRadius: 20 },
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


    // Стили для модального окна фильтрации
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#83B620',
        marginBottom: 10,
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%'
    },
    filterSectionTitle: {
        fontSize: 24,
        color: '#333',
        marginVertical: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    ratingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingStars: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    starIcon: {
        marginRight: 5, // Расстояние между звездами
    },
    applyButton: {
        marginTop: 20,
        width: '100%',
    },
    applyGradientButton: {
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    packageLabel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#6fa32b',
        paddingVertical: 10, // Увеличено для толщины полосы
        borderBottomLeftRadius: 15, // Увеличено для большего закругления
        borderBottomRightRadius: 15, // Увеличено для большего закругления
        alignItems: 'center',
    },
    packageLabelText: {
        color: '#fff',
        fontSize: 16, // Сделано крупнее для лучшей видимости
        textAlign: 'center',
    },
    topPackagesTitle: {
        fontSize: 24,
        color: '#335237',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    topPackagesWrapper: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    topPackageCard: {
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#83B620',
        marginBottom: 10,
    },
    topPackageImage: {
        width: '100%',
        height: 100, // Уменьшенная высота изображения
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    topPackageDetails: {
        padding: 15, // Увеличены отступы
        backgroundColor: '#6fa32b',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topPackageTitle: {
        color: '#fff',
        fontSize: 16,
    },
    topPackageRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    priceFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: '45%',
        textAlign: 'center',
    },
    sliderContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceLabel: {
        fontSize: 14,
        color: 'black', // Цвет текста
    },
    slider: {
        flex: 1,
        marginHorizontal: 10, // Расстояние между ползунками и текстом
    },

    sliderValues: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Разместить элементы по краям
        paddingHorizontal: 20, // Отступы от краёв
        marginBottom: 10,
    },
    priceText: {
        fontSize: 16, // Размер текста
        color: '#333', // Цвет текста
    },
    priceValue: {
        fontWeight: 'bold', // Выделение чисел
        color: '#6fa32b', // Цвет чисел
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Расположить текстовые элементы по краям
        width: 250, // Ширина контейнера с текстом должна соответствовать слайдеру
        marginBottom: 10, // Отступ от текста до слайдера
    },
    greenSectionTitle: {
        fontSize: 24, // Размер текста
        color: '#335237', // Зеленый цвет
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    

});

