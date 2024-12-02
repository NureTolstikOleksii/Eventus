import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const WishlistScreen = () => {
    const [wishlistItems, setWishlistItems] = useState([
        { id: 1, title: 'Замовити букет', completed: true },
        { id: 2, title: 'Зарезервувати місце для дня народження', completed: false },
        { id: 3, title: 'Зарезервувати місце для весілля', completed: false },
    ]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newItem, setNewItem] = useState('');

    const toggleComplete = (id) => {
        setWishlistItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const addItem = () => {
        if (newItem.trim()) {
            setWishlistItems([
                ...wishlistItems,
                { id: wishlistItems.length + 1, title: newItem, completed: false },
            ]);
            setNewItem('');
            setModalVisible(false);
        }
    };

    const removeItem = (id) => {
        setWishlistItems((items) => items.filter((item) => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.contentContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Чек-лист</Text>
                </View>

                {/* Checklist Items */}
                <ScrollView contentContainerStyle={styles.wishlistContainer}>
                    {wishlistItems.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => toggleComplete(item.id)}
                            >
                                <FontAwesome
                                    name={item.completed ? 'check-square' : 'square-o'}
                                    size={24}
                                    color="#6fa32b"
                                />
                            </TouchableOpacity>
                            <Text
                                style={[
                                    styles.itemText,
                                    item.completed && styles.completedText,
                                ]}
                            >
                                {item.title}
                            </Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeItem(item.id)}
                            >
                                <FontAwesome name="minus" size={20} color="#6fa32b" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Add Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <FontAwesome name="plus" size={30} color="#6fa32b" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Modal for Adding Item */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Додати пункт</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Назва пункту"
                            value={newItem}
                            onChangeText={setNewItem}
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={addItem}
                        >
                            <Text style={styles.modalButtonText}>Додати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Скасувати</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default WishlistScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    contentContainer: { flex: 1, paddingBottom: 80 },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#a6cf4a',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: { fontSize: 24, color: '#fff' },
    wishlistContainer: { paddingHorizontal: 20, paddingVertical: 10 },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
    },
    checkbox: { marginRight: 10 },
    itemText: { flex: 1, fontSize: 16, color: '#333' },
    completedText: { textDecorationLine: 'line-through', color: '#aaa' },
    removeButton: {
        padding: 5,
        borderRadius: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    modalTitle: { fontSize: 18, color: '#333', marginBottom: 10 },
    modalInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#6fa32b',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtonText: { color: '#fff', fontSize: 16 },
    modalCloseButton: { alignItems: 'center', padding: 10 },
    modalCloseButtonText: { color: '#6fa32b', fontSize: 16 },
});
