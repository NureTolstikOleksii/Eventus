<<<<<<< Updated upstream
import React from "react";
=======
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
<<<<<<< Updated upstream
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "../components/BottomMenu";

const Wishlist = ({ navigation }) => {
  const wishlistItems = [
    {
      title: "Букет",
      supplier: "Постачальник Василій",
      image: require("../assets/images/roses.png"),
    },
    {
      title: "Букет",
      supplier: "Постачальник Петро",
      image: require("../assets/images/roses2.png"),
    },
    {
      title: "Букет",
      supplier: "Постачальник Іван",
      image: require("../assets/images/roses3.png"),
    },
  ];

  return (
    <LinearGradient
      colors={["#a6cf4a", "#f2e28b", "#ffffff"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/arrow.png")}
=======
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_KEY; // Или ваш актуальный URL бэкенда

const Wishlist = ({ navigation }) => {
  // ----- Список желаний -----
  const [wishlistItems, setWishlistItems] = useState([]); // ИНИЦИАЛИЗИРУЕМ пустым массивом

  // ----- Для модалки (если всё-таки нужно добавить вручную) -----
  const [isModalVisible, setModalVisible] = useState(false);
  const [newServiceId, setNewServiceId] = useState('');

  // ----- Данные сессии, где будет userId -----
  const [sessionData, setSessionData] = useState(null);

  // 1. Получаем данные сессии (userId)
  const fetchSessionData = async () => {
    try {
      const response = await fetch(`${API_URL}/session`, {
        method: 'GET',
        credentials: 'include', // если нужны куки
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Session data:', data);
        setSessionData(data);
      } else {
        console.error('Error fetching session data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching session data:', error.message);
    }
  };

  // 2. Получаем список желаний (wishlist) для текущего userId
  const fetchWishlist = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/get?user_id=${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched wishlist data:', data);
        // Убедимся, что data — массив. Если нет, ставим пустой
        setWishlistItems(Array.isArray(data) ? data : []);
      } else {
        console.error('Error fetching wishlist:', response.statusText);
        setWishlistItems([]); // Чтобы .map не упал
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
      setWishlistItems([]); // Чтобы .map не упал
    }
  };

  // 3. (Опционально) Добавляем элемент в список желаний
  const addItem = async () => {
    if (!newServiceId.trim() || !sessionData?.userId) return;

    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: sessionData.userId,
          service_id: newServiceId,
        }),
      });
      if (response.ok) {
        await fetchWishlist(sessionData.userId); // После добавления обновим список
        setNewServiceId('');
        setModalVisible(false);
        Alert.alert('Успіх', 'Додано до списку бажань!');
      } else {
        const errorData = await response.json();
        Alert.alert('Помилка', errorData.error || 'Не вдалося додати до списку бажань.');
      }
    } catch (error) {
      console.error('Error adding wishlist item:', error.message);
      Alert.alert('Помилка', 'Щось пішло не так. Спробуйте пізніше.');
    }
  };

  // 4. Удаляем элемент из списка желаний
  const removeItem = async (wishlistId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/${wishlistId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Удаляем из локального стейта
        setWishlistItems((prev) =>
          prev.filter((item) => item.wishlist_id !== wishlistId)
        );
        Alert.alert('Успіх', 'Видалено зі списку бажань!');
      } else {
        const errorData = await response.json();
        Alert.alert('Помилка', errorData.error || 'Не вдалося видалити зі списку бажань.');
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error.message);
      Alert.alert('Помилка', 'Щось пішло не так. Спробуйте пізніше.');
    }
  };

  // При первом рендере — забираем сессию
  useEffect(() => {
    fetchSessionData();
  }, []);

  // Как только получили userId, подгружаем wishlist
  useEffect(() => {
    if (sessionData?.userId) {
      fetchWishlist(sessionData.userId);
    }
  }, [sessionData]);

  return (
    <LinearGradient
      colors={['#a6cf4a', '#f2e28b', '#ffffff']}
      style={styles.container}
    >
      {/* Заголовок */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/images/arrow.png')}
>>>>>>> Stashed changes
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Список бажань</Text>
      </View>

<<<<<<< Updated upstream
      <ScrollView
        contentContainerStyle={[
          styles.wishlistContainer,
          { paddingBottom: 100 },
        ]}
      >
        {wishlistItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSupplier}>{item.supplier}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Image
                source={require("../assets/images/minus.png")}
=======
      {/* Список желаний */}
      <ScrollView
        contentContainerStyle={[styles.wishlistContainer, { paddingBottom: 100 }]}
      >
        {wishlistItems.map((item) => (
          <View key={item.wishlist_id} style={styles.itemContainer}>
            <Image
              source={require('../assets/images/roses.png')} // или логика для картинок
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>
                {item.service_name || 'Без назви'}
              </Text>
              <Text style={styles.itemSupplier}>
                {item.provider_name
                  ? `Постачальник ${item.provider_name}`
                  : 'Невідомий постачальник'}
              </Text>
            </View>
            {/* Кнопка удаления */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.wishlist_id)}
            >
              <Image
                source={require('../assets/images/minus.png')}
>>>>>>> Stashed changes
                style={styles.removeIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
<<<<<<< Updated upstream
      {/* Нижнее меню */}
      <BottomMenu />
=======

      {/* Кнопка "+" убрана, так как добавление через сердечко на другом экране */}

      {/* Нижнее меню */}
      <BottomMenu />

      {/* Модальное окно для добавления (если нужно) */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Додати до списку бажань</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Введіть ID сервісу"
              value={newServiceId}
              onChangeText={setNewServiceId}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addItem}>
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
>>>>>>> Stashed changes
    </LinearGradient>
  );
};

<<<<<<< Updated upstream
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 60, // Увеличен отступ сверху
  },
  backIcon: {
    width: 20,
    height: 25,
    tintColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    flex: 1,
  },
  wishlistContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A4C644",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  itemImage: {
    width: 123,
    height: 77,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  itemSupplier: {
    fontSize: 14,
    color: "#ffffff",
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  removeIcon: {
    width: 20,
    height: 5,
  },

  addIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#6fa32b",
  },
  lastMenuItem: {
    borderBottomWidth: 0, // убираем нижнюю границу для последнего элемента
  },
  menuText: { fontSize: 20, color: "#6fa32b" },
  arrowIcon: { width: 15, height: 15, tintColor: "#6fa32b" },
});

=======
>>>>>>> Stashed changes
export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  wishlistContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A4C644',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  itemImage: {
    width: 123,
    height: 77,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemSupplier: {
    fontSize: 14,
    color: '#ffffff',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    width: 20,
    height: 5,
  },

  // ----- Модалка (опционально) -----
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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
    marginBottom: 15,
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
});
