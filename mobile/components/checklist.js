import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_KEY; // URL из .env

const CheckList = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newItem, setNewItem] = useState('');

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getNotes`, {
                method: 'GET',
                credentials: 'include', // Для отправки cookies (если требуется)
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setWishlistItems(
                    data.notes.map((note) => ({
                        id: note.checklist_id,
                        title: note.note,
                        completed: false, // Обновите, если нужно передавать статус completed
                    }))
                );
            } else {
                console.error('Error fetching notes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };
    
    const addItem = async () => {
        if (!newItem.trim()) return;
        try {
            const response = await fetch(`${API_URL}/api/createNote`, {
                method: 'POST',
                credentials: 'include', // Для отправки cookies (если требуется)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note: newItem }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setWishlistItems([
                    ...wishlistItems,
                    {
                        id: data.checklist.checklist_id,
                        title: newItem,
                        completed: false,
                    },
                ]);
                setNewItem('');
                setModalVisible(false);
            } else {
                console.error('Error adding note:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding note:', error.message);
        }
    };
    
    const removeItem = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/deleteNote/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Для отправки cookies (если требуется)
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                setWishlistItems((items) => items.filter((item) => item.id !== id));
            } else {
                console.error('Error deleting note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    };
    

    useEffect(() => {
        fetchNotes();
    }, []);

    const toggleComplete = (id) => {
        setWishlistItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
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

                    {/* Add Button */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome name="plus" size={30} color="#83B620" />
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>

            {/* Bottom Menu */}
            <BottomMenu />

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

export default CheckList;



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    contentContainer: { flex: 1, paddingBottom: 80 },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
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
        alignSelf: 'center', // Выравнивание по центру
        marginTop: 20, // Отступ сверху
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
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
