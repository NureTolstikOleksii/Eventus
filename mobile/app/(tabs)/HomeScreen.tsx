import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const HomeScreen: React.FC = () => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const toggleRating = (rating: number) => {
        setSelectedRating(rating === selectedRating ? null : rating);
    };


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

                <Text style={styles.sectionTitle}>Топ пакетів</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.topPackages}>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/birthday.png')} style={styles.packageImage} />
                        <Text style={styles.packageText}></Text>
                    </View>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/wedding.png')} style={styles.packageImage} />
                        <Text style={styles.packageText}></Text>
                    </View>
                    <View style={styles.packageItem}>
                        <Image source={require('../../assets/images/rip.png')} style={styles.packageImage} />
                        <Text style={styles.packageText}></Text>
                    </View>
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
            {/* Модальное окно фильтрации */}
            <Modal visible={isFilterVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Фільтрація</Text>

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
                                        color={selectedCategories[category] ? "#6fa32b" : "#FF7043"}
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
                                        color={selectedRating === rating ? "#6fa32b" : "#FF7043"}
                                    />
                                    <View style={styles.ratingStars}>
                                        {[...Array(rating)].map((_, i) => (
                                            <FontAwesome key={i} name="star" size={20} color="orange" />
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>


                        <TouchableOpacity style={styles.applyButton} onPress={() => setFilterVisible(false)}>
                            <LinearGradient colors={['#FFA726', '#FB8C00']} style={styles.applyGradientButton}>
                                <Text style={styles.applyButtonText}>Застосувати</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Нижнее меню с пользовательскими иконками */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require('../../assets/images/home.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Головна</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require('../../assets/images/book.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Чек-лист</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require('../../assets/images/chat.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Чат</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require('../../assets/images/user.png')} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Профіль</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, paddingBottom: 80 },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    cityText: { color: '#fff', fontSize: 18 },
    locationIcon: { width: 16, height: 20, marginBottom: 10, alignSelf: 'flex-start', marginTop: 5 },
    bellIcon: { width: 24, height: 24, marginLeft: 'auto' },
    searchAndFilterContainer: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 20 },
    searchBar: { flex: 1, backgroundColor: '#ffffff80', padding: 10, borderRadius: 10 },
    placeholderText: { color: '#888' },
    filterButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
    filterIcon: { width: 24, height: 24 },
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
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    menuItem: {
        alignItems: 'center',
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    menuText: {
        fontSize: 12,
        color: '#6fa32b',
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
        color: '#6fa32b',
        marginBottom: 10,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
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
        flexDirection: 'column', // Устанавливаем элементы в колонку
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    ratingItem: {
        flexDirection: 'row', // Для расположения чекбокса и звезд в строку
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingStars: {
        flexDirection: 'row', // Для расположения звезд в строку
        marginLeft: 8, // Отступ между чекбоксом и звездами
    },
    applyButton: {
        marginTop: 20,
        width: '100%',
    },
    applyGradientButton: {
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#FFA726',
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});

