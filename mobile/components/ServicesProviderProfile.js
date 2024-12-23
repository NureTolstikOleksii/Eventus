<<<<<<< Updated upstream
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "../components/BottomMenu";

const ServicesScreen = ({ navigation }) => {
  const services = [
    "Букет",
    "Прикраса зали",
    "Прикраса автомобілю",
    "Букет нареченої",
  ];

  return (
    <LinearGradient
      colors={["#a6cf4a", "#f2e28b", "#ffffff"]}
      style={styles.container}
    >
      {/* Заголовок */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Послуги</Text>
      </View>

      {/* Контейнер с услугами */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={styles.serviceItem}>
            <Text style={styles.serviceText}>
              {service
                .split(" ")
                .map((word, idx) => (idx === 1 ? `\n${word}` : word))}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ItemAddScreen")}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Нижнее меню */}
      <BottomMenu />
    </LinearGradient>
  );
=======
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';
import { useRoute, useNavigation } from '@react-navigation/native';

const API_URL = Constants.expoConfig?.extra?.API_KEY;

const ServicesProviderProfile = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // Состояние для providerId, который мы будем тянуть из сессии
    const [providerId, setProviderId] = useState(null);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');

    // 1) Загружаем session, чтобы узнать provider_id
    useEffect(() => {
        fetchSessionData();
    }, []);

    const fetchSessionData = async () => {
        try {
            const res = await fetch(`${API_URL}/session`, {
                method: 'GET',
                credentials: 'include', // Чтобы передавались cookies
            });
            if (res.ok) {
                const data = await res.json();
                // Предположим, data.provider_id доступен
                setProviderId(data.provider_id);
            } else {
                console.error('Error fetching session:', res.statusText);
            }
        } catch (err) {
            console.error('Error fetching session:', err.message);
        }
    };

    // 2) После того, как providerId будет известен, можно грузить услуги
    useEffect(() => {
        if (providerId) {
            fetchServices(providerId);
        }
    }, [providerId]);

    const fetchServices = async (provId) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/provider/${provId}/services`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // если нужно
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message) {
                    setServices([]);
                } else {
                    setServices(data);
                }
            } else {
                console.error('Error fetching services:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching services:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Удаление услуги (пример)
    const removeService = async (serviceId) => {
        try {
            const response = await fetch(`${API_URL}/services/${serviceId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                setServices((prev) => prev.filter((s) => s.service_id !== serviceId));
            } else {
                console.error('Error deleting service:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting service:', error.message);
        }
    };

    // Пример добавления услуги прямо из модалки
    const addService = async () => {
        if (!newServiceName.trim()) return;
        if (!providerId) {
            console.error('No providerId found');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/services/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: newServiceName,
                    provider_id: providerId, // <-- взяли из сессии
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setServices((prev) => [
                    ...prev,
                    { service_id: data.serviceId, name: newServiceName },
                ]);
                setNewServiceName('');
                setModalVisible(false);
            } else {
                console.error('Error adding service:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding service:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#a6cf4a', '#f2e28b', '#ffffff']}
                style={styles.contentContainer}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#A4C644" style={{ marginTop: 50 }} />
                ) : (
                    <ScrollView contentContainerStyle={styles.servicesContainer}>
                        {services.length === 0 ? (
                            <Text style={styles.noServicesText}>Немає послуг</Text>
                        ) : (
                            services.map((service) => (
                                <View key={service.service_id} style={styles.serviceItem}>
                                    <Text style={styles.serviceText}>{service.name}</Text>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => removeService(service.service_id)}
                                    >
                                        <FontAwesome name="minus" size={20} color="#6fa32b" />
                                    </TouchableOpacity>
                                </View>
                            ))
                        )}

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                                // Переходим на ItemAddScreen.js
                                // и передаём providerId, если там нужно
                                navigation.navigate('ItemAddScreen', { providerId });
                            }}
                        >
                            <FontAwesome name="plus" size={30} color="#fff" />
                        </TouchableOpacity>
                    </ScrollView>
                )}
            </LinearGradient>

            <BottomMenu />

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Додати послугу</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Назва послуги"
                            value={newServiceName}
                            onChangeText={setNewServiceName}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={addService}>
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
>>>>>>> Stashed changes
};

export default ServicesProviderProfile;

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#ffffff",
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    marginBottom: 30,
    alignItems: "center", // Центрируем элементы, включая кнопку "+"
  },
  serviceItem: {
    backgroundColor: "#A4C644",
    height: 100, // Фиксированная высота для всех блоков
    width: "100%",
    justifyContent: "center", // Центрирование текста по вертикали
    borderRadius: 10,
    marginBottom: 15, // Расстояние между блоками
    paddingHorizontal: 15, // Добавлен внутренний отступ для текста
  },
  serviceText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "left", // Текст выравнивается по левому краю
  },
  addButton: {
    marginTop: 5, // Отступ сверху для кнопки относительно блоков
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 50,
    color: "#6fa32b",
    fontWeight: "bold",
  },
=======
    container: { 
        flex: 1, 
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 80,
    },
    servicesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    noServicesText: {
        marginTop: 30,
        fontSize: 16,
        color: '#333',
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-between',
    },
    serviceText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    removeButton: {
        padding: 5,
        borderRadius: 10,
    },
    addButton: {
        alignSelf: 'center',
        marginTop: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#6fa32b',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
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
    modalTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
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
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalCloseButton: {
        alignItems: 'center',
        padding: 10,
    },
    modalCloseButtonText: {
        color: '#6fa32b',
        fontSize: 16,
    },
>>>>>>> Stashed changes
});

