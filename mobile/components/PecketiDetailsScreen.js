import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu';

const PecketiDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const {
        image,
        title = 'Пакет “Ніжність”',
        florist = 'Василій',
        numberOfServices = 5,
        price = 10000,
        rating = 4,
        description = 'Пакет “Ніжність” від флориста Василія — це витончений набір композицій із білих та червоних букетів троянд, півоній та зелені, ідеально підійде для весілля або романтичної події.',
    } = route.params || {};

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.gradient}>
            <ScrollView>
                {/* Верхняя панель */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={require('../assets/images/backarrow.png')} style={styles.iconImage} resizeMode="contain" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>{title}</Text>
                    <TouchableOpacity style={styles.favoriteButton}>
                        <Image source={require('../assets/images/Vector.png')} style={styles.iconImage} resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                {/* Подзаголовки */}
                <View style={styles.subheaderContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileOrder', { florist })}>
                        <Text style={styles.florist}>Флорист: {florist}</Text>
                    </TouchableOpacity>
                    <Text style={styles.servicesText}>{numberOfServices} послуг</Text>
                </View>

                {/* Рейтинг */}
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesome
                            key={i}
                            name="star"
                            size={24}
                            color={i < rating ? '#FFD700' : '#BDBDBD'} // Желтый для рейтинга
                            style={styles.starIcon}
                        />
                    ))}
                </View>

                {/* Изображение */}
                <View style={styles.imageContainer}>
                    {image && <Image source={image} style={styles.mainImage} resizeMode="cover" />}
                </View>

                {/* Цена и описание */}
                <Text style={styles.priceText}>{price} грн</Text>
                <Text style={styles.descriptionText}>{description}</Text>

                {/* Меню пунктов */}
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Переглянути послуги</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} resizeMode="contain" />
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Календар</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} resizeMode="contain" />
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Відгуки</Text>
                    <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} resizeMode="contain" />
                </TouchableOpacity>


                {/* Кнопка "Замовити" */}
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Замовити</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* Нижнее меню */}
            <BottomMenu />
        </LinearGradient >

    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    florist: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        marginVertical: 10,
    },
    pageTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 26,
        color: '#fff',
        fontFamily: 'Kurale',
    },
    favoriteButton: {
        padding: 10,
    },
    subheaderContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    floristText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Kurale',
    },
    servicesText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Kurale',
        marginTop: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    starIcon: {
        marginHorizontal: 2,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    priceText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#83B620',
        fontWeight: 'normal',
        marginBottom: 10,
        fontFamily: 'Kurale',
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4F4F4F',
        marginHorizontal: 10,
        marginBottom: 20,
        fontFamily: 'Kurale',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        marginVertical: 5,
        padding: 15,
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 20,
        color: '#83B620',
        fontFamily: 'Kurale',
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#83B620',
        marginHorizontal: 0,
    },
    orderButton: {
        backgroundColor: '#83B620',
        margin: 15,
        height: 50, // Фиксированная высота
        justifyContent: 'center', // Центрируем текст по вертикали
        borderRadius: 30, // Округляем края
        width: 250, // Увеличиваем ширину кнопки
        alignSelf: 'center', // Центрируем кнопку
    },
    orderButtonText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#fff',
    },
});

export default PecketiDetailsScreen;
