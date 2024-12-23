import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu';

const ReviewsScreen = ({ navigation }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const reviews = [
        {
            id: 1,
            userName: 'Дмитро',
            date: '14.11.2024',
            comment: 'Це був чудовий досвід, дуже задоволений!',
            rating: 4,
            avatar: require('../assets/images/navalny.png'),
            image: require('../assets/images/flowers.png'),
        },
        {
            id: 2,
            userName: 'Дмитро',
            date: '14.11.2024',
            comment: 'Чудова послуга, рекомендую всім!',
            rating: 4,
            avatar: require('../assets/images/navalny.png'),
            image: require('../assets/images/flowers.png'),
        },
        {
            id: 3,
            userName: 'Дмитро',
            date: '14.11.2024',
            comment: 'Все було добре, але є деякі зауваження.',
            rating: 3,
            avatar: require('../assets/images/navalny.png'),
            image: require('../assets/images/flowers.png'),
        },
    ];

    const openModal = (review) => {
        setSelectedReview(review);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedReview(null);
    };

    const handleChatPress = () => {
        // Здесь вы можете добавить навигацию к экрану чата или любую другую логику
        navigation.navigate('Chat'); // Убедитесь, что экран 'Chat' существует в вашем навигационном стеке
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/gradient.png')} style={styles.backgroundImage} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack(); // Возврат на предыдущую страницу
                            } else {
                                navigation.navigate('ProfileOrder'); // Укажите основной экран, если нет предыдущего
                            }
                        }}
                    >
                        <Image source={require('../assets/images/backarrow.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Відгуки</Text>

                </View>

                {reviews.map((review) => (
                    <TouchableOpacity key={review.id} onPress={() => openModal(review)} style={styles.reviewCard}>
                        <Image source={review.avatar} style={styles.avatar} />
                        <View style={styles.reviewContent}>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{review.userName}</Text>
                                <View style={styles.ratingContainer}>
                                    {[...Array(5)].map((_, i) => (
                                        <FontAwesome
                                            key={i}
                                            name="star"
                                            size={18}
                                            color={i < review.rating ? '#FFD700' : '#BDBDBD'}
                                            style={styles.star}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Text style={styles.reviewDate}>{review.date}</Text>
                            <Text style={styles.reviewText}>{review.comment}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedReview && (
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                                <Text style={styles.modalCloseText}>×</Text>
                            </TouchableOpacity>
                            <Image source={selectedReview.image} style={styles.modalImage} />
                            <View style={styles.modalHeader}>
                                <Image source={selectedReview.avatar} style={styles.modalAvatar} />
                                <Text style={styles.modalUserName}>{selectedReview.userName}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesome
                                        key={i}
                                        name="star"
                                        size={18}
                                        color={i < selectedReview.rating ? '#FFD700' : '#BDBDBD'}
                                        style={styles.star}
                                    />
                                ))}
                            </View>
                            <Text style={styles.modalComment}>{selectedReview.comment}</Text>
                        </View>
                    </View>
                </Modal>
            )}
            {/* Нижнее меню */}
            <BottomMenu />
        </View>
    );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    scrollContainer: { paddingBottom: 80 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Распределяем пространство между элементами
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: { padding: 5 },
    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 26,
        fontFamily: 'Kurale',
        color: '#fff',
        textAlign: 'center',
        marginBottom:5,
        flex: 1, // Занимает оставшееся пространство между кнопками
    },
    chatButton: {
        padding: 5,
    },
    chatIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    reviewCard: {
        flexDirection: 'row',
        padding: 25,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#A4C644',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    reviewContent: { flex: 1 },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    reviewDate: {
        fontSize: 14,
        color: '#f0f0f0',
        marginTop: 5,
    },
    ratingContainer: { flexDirection: 'row' },
    star: { marginRight: 4 },
    reviewText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        height: '50%',
        alignItems: 'center', // Центрирование по горизонтали
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
    },
    modalCloseText: {
        fontSize: 24,
        color: '#000',
    },
    modalImage: {
        width: '80%',
        height: 150,
        borderRadius: 30,
        marginBottom: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center', // Центрирование заголовка по горизонтали
    },
    modalAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        textAlign: 'center', // Выравнивание текста по центру
    },
    modalUserName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Выравнивание текста по центру
    },
    modalComment: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        textAlign: 'center', // Выравнивание текста по центру
    },
});
