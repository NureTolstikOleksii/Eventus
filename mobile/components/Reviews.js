import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const ReviewsScreen = () => {
    return (
        <LinearGradient colors={['#78A519', '#a6cf4a']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Відгуки</Text>
                </View>

                {[1, 2, 3].map((_, index) => (
                    <View key={index}>
                        <View style={styles.reviewCard}>
                            <Image source={require('../assets/images/navalny.png')} style={styles.avatar} />
                            <View style={styles.reviewContent}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>Дмитро</Text>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesome
                                                key={i}
                                                name="star"
                                                size={18}
                                                color={i < (index === 2 ? 1 : 3) ? "#FFD700" : "#BDBDBD"}
                                                style={styles.star}
                                            />
                                        ))}
                                    </View>
                                </View>
                                <Text style={styles.reviewDate}>14.11.2024</Text>
                                <Text style={styles.reviewText}>
                                    {index === 0
                                        ? "Отримав букет для особливого свята. Загальний вигляд був симпатичним, але квіти не простояли навіть декілька днів. Здається, що використовувались вже не найсвіжіші квіти."
                                        : index === 1
                                            ? "Прекрасний букет! Квіти свіжі, ароматні, оформлення стильне. Дуже задоволена, обов’язково замовлятиму ще!"
                                            : "Я розчарована сервісом. Квіти доставили в жахливому стані – зв'ялі й зламані. Від такого подарунка не залишилось жодних позитивних емоцій."
                                    }
                                </Text>
                            </View>
                        </View>
                        {index < 2 && <View style={styles.separator} />}
                    </View>
                ))}
                <View style={styles.separator} />
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
        width: 18,
        height: 18,
        tintColor: '#ffffff',
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
});