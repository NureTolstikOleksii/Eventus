import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const OrdersDetailsScreen = ({ route }) => {
    const { title, image, price, description, florist, rating } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price} грн</Text>
            <Text style={styles.florist}>Флорист: {florist}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <FontAwesome
                        key={i}
                        name="star"
                        size={18}
                        color={i < rating ? '#FFD700' : '#BDBDBD'}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#83B620',
        marginBottom: 10,
    },
    florist: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
});

export default OrdersDetailsScreen;
