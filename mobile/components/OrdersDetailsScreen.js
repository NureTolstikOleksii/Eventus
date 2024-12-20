import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';

const OrdersDetailsScreen = ({ route, navigation }) => {
    const { title, image, price, description, florist, rating } = route.params;

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView>
                {/* Кнопка назад */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        source={require('../assets/images/backarrow.png')} // Вкажи шлях до свого зображення
                        style={styles.backImage}
                    />
                </TouchableOpacity>
                {/* Сердце в правом верхнем углу */}
                <View style={styles.heartContainer}>
                    <FontAwesome name="heart-o" size={24} color="#fff" />
                </View>
                {/* Заголовок */}
                <Text style={styles.title}>{title}</Text>
                {/* Флорист */}
                <TouchableOpacity onPress={() => navigation.navigate('ProfileOrder', { florist })}>
                    <Text style={styles.florist}>Флорист: {florist}</Text>
                </TouchableOpacity>

                {/* Картинка */}
                <Image source={image} style={styles.image} resizeMode="contain" />

                {/* Цена и рейтинг */}
                <Text style={styles.price}>{price}</Text>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesome
                            key={i}
                            name="star"
                            size={20}
                            color={i < rating ? '#FFD700' : '#BDBDBD'}
                            style={styles.star}
                        />
                    ))}
                </View>

                {/* Описание */}
                <Text style={styles.description}>{description}</Text>

                {/* Ссылки: Календарь и Отзывы */}
                <View style={styles.linkContainer}>
                    <TouchableOpacity style={styles.linkItem}>
                        <Text style={styles.linkText}>Календар</Text>
                        <FontAwesome name="angle-right" size={24} color="#83B620" />
                    </TouchableOpacity>
                    <View style={styles.separator} /> {/* Линия-разделитель */}
                    <TouchableOpacity style={styles.linkItem}>
                        <Text style={styles.linkText}>Відгуки</Text>
                        <FontAwesome name="angle-right" size={24} color="#83B620" />
                    </TouchableOpacity>
                </View>

                {/* Кнопка заказать */}
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Замовити</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Нижнее меню */}
            <BottomMenu />
        </LinearGradient >
    );
};

export default OrdersDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    heartContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 10,
        padding: 10,
        borderRadius: 20, // Круглая форма
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 80,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    florist: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        borderRadius: 15,
    },
    price: {
        fontSize: 22,
        color: '#83B620',
        textAlign: 'center',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
    star: {
        marginHorizontal: 2,
    },
    description: {
        textAlign: 'center', // Выравнивание текста по центру
        fontSize: 16,
        color: '#333',
        marginHorizontal: 20,
        marginVertical: 10,
        lineHeight: 22,
        flexShrink: 1, // Уменьшает размер текста, чтобы уместить его в пределах
        flexWrap: 'wrap', // Перенос текста на новую строку
    },
    linkContainer: {
        marginTop: 20,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#83B620',
        marginHorizontal: 0,
    },
    linkText: {
        fontSize: 18,
        color: '#83B620',
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
