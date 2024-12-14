import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';

const ItemAddScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSave = () => {
        if (!name || !description || !price) {
            Alert.alert('Помилка', 'Будь ласка, заповніть усі поля.');
            return;
        }
        Alert.alert('Успіх', 'Дані успішно збережено!');
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Додавання</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Image source={require('../assets/images/check.png')} style={styles.saveIcon} />
                </TouchableOpacity>
            </View>


            {/* ДОДАВАННЯ ПОСЛУГИ */}
            <View style={styles.content}>
            <TouchableOpacity 
    style={styles.addButton} 
    onPress={() => navigation.navigate('Додати послугу')}
><Text style={styles.addText}>+</Text>


</TouchableOpacity>

                {/* Photo Preview */}
                <Image source={require('../assets/images/flowers.png')} style={styles.flowerImage} />

                {/* Input Fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Назва"
                    placeholderTextColor="#333"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Опис"
                    placeholderTextColor="#333"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
                <View style={styles.priceContainer}>
                    <TextInput
                        style={[styles.input, styles.priceInput]}
                        placeholder="Ціна"
                        placeholderTextColor="#333"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                    <Text style={styles.currency}>€</Text>
                </View>
            </View>

            {/* Bottom Menu */}
            <BottomMenu />
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
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    saveIcon: {
        width: 20,
        height: 20,
        tintColor: '#6fa32b',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    addPhotoButton: {
        backgroundColor: '#d4e7af',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    addPhotoText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    flowerImage: {
        width: 200,
        height: 150,
        borderRadius: 15,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#d4e7af',
        borderRadius: 15,
        width: '100%',
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    priceInput: {
        flex: 1,
    },
    currency: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
});

export default ItemAddScreen;