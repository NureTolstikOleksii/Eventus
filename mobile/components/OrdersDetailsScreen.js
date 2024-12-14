import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = ({ route, navigation }) => {
    const { title, image, price, description, florist, rating } = route.params;

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <FontAwesome name="heart" size={24} color="#fff" />
            </View>

            <Image source={image} style={styles.mainImage} />

            <View style={styles.detailsContainer}>
                <Text style={styles.price}>{price}€</Text>
                <Text style={styles.description}>{description}</Text>

                <Text style={styles.florist}>Флорист: {florist}</Text>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesome
                            key={i}
                            name="star"
                            size={18}
                            color={i < rating ? '#FFD700' : '#BDBDBD'}
                            style={styles.star}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Календар</Text>
                    <FontAwesome name="angle-right" size={24} color="#6fa32b" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Відгуки</Text>
                    <FontAwesome name="angle-right" size={24} color="#6fa32b" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Замовити</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
    },
    mainImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: -30,
        zIndex: 1,
    },
    price: {
        fontSize: 24,
        color: '#6fa32b',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 10,
    },
    florist: {
        fontSize: 14,
        color: '#6fa32b',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    star: {
        marginRight: 4,
    },
    optionsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
        color: '#6fa32b',
    },
    orderButton: {
        backgroundColor: '#6fa32b',
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 30,
        alignItems: 'center',
    },
    orderButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DetailsScreen;
