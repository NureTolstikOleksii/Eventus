import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';


const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const OrdersDetailsScreen = ({ route, navigation }) => {
    const { serviceId, title, price, photoUrl, description, florist, rating } = route.params;
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [sessionData, setSessionData] = useState(null); 
    const [wishlistItemId, setWishlistItemId] = useState(null); // ID для удаления

    useEffect(() => {
        fetchSessionData();
    }, []);
    
    useEffect(() => {
        if (sessionData?.userId) {
            console.log('Calling checkWishlist with userId:', sessionData.userId);
            checkWishlist(sessionData.userId);
        }
    }, [sessionData]);
    
    const fetchSessionData = async () => {
        try {
            const sessionResponse = await fetch(`${API_KEY}/session`, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (sessionResponse.ok) {
                const data = await sessionResponse.json();
                setSessionData(data); // Сохраняем данные сессии
                console.log('Session data:', data);
            } else {
                console.error('Error fetching session data:', sessionResponse.statusText);
            }
        } catch (error) {
            console.error('Error fetching session data:', error.message);
        }
    };
    
    const checkWishlist = async (userId) => {
        try {
            const response = await fetch(`${API_KEY}/wishlist/get?user_id=${userId}`, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (response.ok) {
                const wishlist = await response.json();
                console.log('Wishlist:', wishlist);
    
                const item = wishlist.find((item) => item.service_id === serviceId);
                if (item) {
                    setIsInWishlist(true);
                    setWishlistItemId(item.wishlist_id);
                } else {
                    setIsInWishlist(false);
                    setWishlistItemId(null);
                }
            } else {
                console.error('Error fetching wishlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error.message);
        }
    };
    

    const handleToggleWishlist = async () => {
        try {
            if (!isInWishlist) {
                // Додаємо до списку бажань
                const response = await fetch(`${API_KEY}/wishlist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: sessionData.userId, service_id: serviceId }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setIsInWishlist(true);
                    setWishlistItemId(result.id); // Зберігаємо ID для видалення
                    Alert.alert('Успіх', 'Додано до списку бажань!');
                } else {
                    const errorData = await response.json();
                    Alert.alert('Помилка', errorData.error || 'Не вдалося додати до списку бажань.');
                }
            } else {
                // Видаляємо зі списку бажань
                const response = await fetch(`${API_KEY}/wishlist/${wishlistItemId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setIsInWishlist(false);
                    setWishlistItemId(null);
                    Alert.alert('Успіх', 'Видалено зі списку бажань!');
                } else {
                    const errorData = await response.json();
                    Alert.alert('Помилка', errorData.error || 'Не вдалося видалити зі списку бажань.');
                }
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

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
                <TouchableOpacity
                    style={styles.heartContainer}
                    onPress={handleToggleWishlist}
                >
                    <FontAwesome
                        name={isInWishlist ? 'heart' : 'heart-o'}  
                        size={24}
                        color={isInWishlist ? 'red' : '#fff'}
                    />
                </TouchableOpacity>
                {/* Заголовок */}
                <Text style={styles.title}>{title}</Text>
                {/* Флорист */}
                <TouchableOpacity onPress={() => navigation.navigate('ProfileOrder', { florist })}>
                    <Text style={styles.florist}>Флорист: {florist}</Text>
                </TouchableOpacity>

                {/* Картинка */}
                <Image
                    source={photoUrl ? { uri: photoUrl } : require('../assets/images/placeholder.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Цена и рейтинг */}
                <Text style={styles.price}>Ціна: {price} грн</Text>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => {
                        const fullStar = Math.floor(rating); // Ціла частина рейтингу
                        const hasHalfStar = rating - fullStar >= 0.5; // Чи є половина зірки

                        // Визначаємо тип зірки (заповнена, половина, порожня)
                        const starType =
                            i < fullStar
                                ? 'star' // Заповнена
                                : i === fullStar && hasHalfStar
                                ? 'star-half-full' // Наполовину заповнена
                                : 'star-o'; // Порожня

                        return (
                            <FontAwesome
                                key={i}
                                name={starType}
                                size={20}
                                color={starType !== 'star-o' ? '#FFD700' : '#BDBDBD'} // Золотий для заповнених зірок
                                style={styles.star}
                            />
                        );
                    })}
                </View>

                {/* Описание */}
                <Text style={styles.description}>{description}</Text>

                {/* Ссылки: Календарь и Отзывы */}
                <View style={styles.linkContainer}>
                    <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('Calendar')}>
                        <Text style={styles.linkText}>Календар</Text>
                        <FontAwesome name="angle-right" size={24} color="#83B620" />
                    </TouchableOpacity >
                    <View style={styles.separator} /> {/* Линия-разделитель */}
                    <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('Reviews')}>
                        <Text style={styles.linkText}>Відгуки</Text>
                        <FontAwesome name="angle-right" size={24} color="#83B620" />
                    </TouchableOpacity>
                </View>

                {/* Кнопка заказать */}
                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => navigation.navigate('DisplayOrder', {
                        orderId: serviceId, // Передаем ID услуги как orderId
                    })}
                >
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
        paddingTop: 20,
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
        marginTop: 60,
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
        width: '85%', // Сделать ширину чуть меньше, чтобы добавить отступы
        height: 200, // Увеличить высоту для большего масштаба
        alignSelf: 'center',
        borderRadius: 20, // Закругленные углы
        marginVertical: 20, // Отступы сверху и снизу
        borderWidth: 2, // Толщина рамки
        borderColor: '#83B620', // Цвет рамки
        shadowColor: '#000', // Цвет тени
        shadowOffset: { width: 0, height: 2 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 5, // Радиус тени
        elevation: 5, // Тень для Android
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
