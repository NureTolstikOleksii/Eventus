import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const BASE_URL = 'https://eventus-deployment-c4551676d56a.herokuapp.com';

const ReviewsScreen = ({ route }) => {
    const { serviceId } = route.params; // Отримуємо serviceId з параметрів навігації
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BASE_URL}/reviews?serviceId=${serviceId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const responseBody = await response.text();
                    console.error(`Помилка: ${response.status} - ${response.statusText}, Тіло: ${responseBody}`);
                    throw new Error(`Помилка: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Помилка завантаження відгуків:', error);
                setError('Не вдалося завантажити відгуки. Спробуйте пізніше.');
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            fetchReviews();
        } else {
            setError('Service ID is missing.');
            setLoading(false);
        }
    }, [serviceId]);

    if (loading) {
        return (
            <LinearGradient colors={['#78A519', '#a6cf4a']} style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>
        );
    }

    if (error) {
        return (
            <LinearGradient colors={['#78A519', '#a6cf4a']} style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#78A519', '#a6cf4a']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Відгуки</Text>
                </View>

                {reviews.map((review) => (
                    <View key={review.review_id}>
                        <View style={styles.reviewCard}>
                            <Image source={{ uri: review.avatar || 'default_avatar_url' }} style={styles.avatar} />
                            <View style={styles.reviewContent}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{review.user_id}</Text>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={18}
                                                color={i < review.rating ? "#FFD700" : "#BDBDBD"}
                                                style={styles.star}
                                            />
                                        ))}
                                    </View>
                                </View>
                                <Text style={styles.reviewDate}>{review.review_date}</Text>
                                <Text style={styles.reviewText}>{review.comment}</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { paddingBottom: 80 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: { padding: 5 },
    backIcon: {
        fontSize: 18,
        color: '#ffffff',
    },
    headerText: {
        fontSize: 26,
        fontFamily: 'Kurale',
        color: '#fff',
        marginLeft: -35,
        textAlign: 'center',
        flex: 1,
    },
    reviewCard: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewContent: { flex: 1 },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 16,
        fontFamily: 'Kurale',
        color: '#fff',
    },
    reviewDate: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    ratingContainer: { flexDirection: 'row' },
    reviewText: {
        fontSize: 17,
        color: '#fff',
        marginTop: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 10,
        marginHorizontal: 0,
    },
    star: { marginHorizontal: 2 },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
});
