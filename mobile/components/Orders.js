import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu'; // Подключаем компонент нижнего меню

const Orders = ({ navigation }) => {
    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack(); // Возвращаемся на предыдущий экран
        } else {
            navigation.navigate('ProfileOrder'); // Если нет предыдущего экрана, переходим на ProfileOrder
        }
    };

    // Данные о букете (можно заменить на динамические данные или получать из API)
    const bouquet = {
        title: 'Букет “Ніжність”',
        price: '10 000 грн',
        rating: 4, // Количество заполненных звезд
        image: require('../assets/images/flowers.png'),
        description: 'Цей букет створений з найкращих квітів для вираження ніжності та любові.',
        florist: 'Василь', // Имя флориста
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress} // Обработчик для кнопки "Назад"
                    >
                        <Image
                            source={require('../assets/images/backarrow.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Послуги</Text>
                </View>

                {/* Карточка букета с обработчиком нажатия */}
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => navigation.navigate('OrdersDetailsScreen', bouquet)} // Передаем все параметры
                >
                    <Image
                        source={bouquet.image}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{bouquet.title}</Text>
                        <Text style={styles.cardPrice}>{bouquet.price}</Text>
                        <View style={styles.ratingContainer}>
                            {[...Array(5)].map((_, index) => (
                                <FontAwesome
                                    key={index}
                                    name="star"
                                    size={18}
                                    color={index < bouquet.rating ? '#FFD700' : '#BDBDBD'}
                                    style={styles.star}
                                />
                            ))}
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Нижнее меню */}
            <BottomMenu />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80, alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        zIndex: 10,
        padding: 10,
    },
    icon: { width: 24, height: 24 },
    headerText: {
        fontSize: 26,
        fontFamily: 'Kurale',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
    cardContainer: {
        width: 340,
        backgroundColor: '#A4C644',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 20,
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
});

export default Orders;
