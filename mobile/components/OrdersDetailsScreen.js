import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OrdersDetailsScreen = ({ route, navigation }) => {
    const { title, image, price, description, florist, rating } = route.params;

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView>
                {/* Кнопка назад */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>

                {/* Заголовок */}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.florist}>Флорист: {florist}</Text>

                {/* Картинка */}
                <Image source={image} style={styles.image} resizeMode="contain" />

                {/* Цена и рейтинг */}
                <Text style={styles.price}>{price}€</Text>
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
        </LinearGradient>
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
        marginVertical: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    star: {
        marginHorizontal: 2,
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    linkContainer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    linkText: {
        fontSize: 18,
        color: '#83B620',
    },
    orderButton: {
        backgroundColor: '#83B620',
        margin: 20,
        paddingVertical: 15,
        borderRadius: 25,
    },
    orderButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
