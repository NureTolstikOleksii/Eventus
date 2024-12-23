import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_KEY; // URL до вашего бэка

const Wishlist = ({ navigation }) => {
  // Для данных сессии (userId, и т.п.)
  const [sessionData, setSessionData] = useState(null);

  // Список желаний
  const [wishlistItems, setWishlistItems] = useState([]);

  // 1. Получаем сессию
  const fetchSessionData = async () => {
    try {
      const response = await fetch(`${API_URL}/session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
        console.log('Session data:', data);
      } else {
        console.error('Error fetching session data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching session data:', error.message);
    }
  };

  // 2. Получаем весь список желаний для этого userId
  const fetchWishlist = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/get?user_id=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Wishlist array:', data);
        // Проверим, что это действительно массив, чтобы не упасть на .map
        setWishlistItems(Array.isArray(data) ? data : []);
      } else {
        console.error('Error fetching wishlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
    }
  };

  // 3. (Опционально) Удалить элемент из списка желаний
  const removeItemFromWishlist = async (wishlistId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/${wishlistId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Удаляем локально
        setWishlistItems((prev) => prev.filter((item) => item.wishlist_id !== wishlistId));
        Alert.alert('Успіх', 'Видалено зі списку бажань!');
      } else {
        const errorData = await response.json();
        Alert.alert('Помилка', errorData.error || 'Не вдалося видалити.');
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error.message);
      Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
    }
  };

  // --- Лайфциклы ---
  useEffect(() => {
    // Сперва грузим сессию
    fetchSessionData();
  }, []);

  useEffect(() => {
    // Когда userId станет известен, загружаем wishlist
    if (sessionData?.userId) {
      fetchWishlist(sessionData.userId);
    }
  }, [sessionData]);

  // --- Рендер ---
  return (
    <LinearGradient
      colors={['#a6cf4a', '#f2e28b', '#ffffff']}
      style={styles.container}
    >
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/images/arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Список бажань</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {wishlistItems.map((item) => {
          // photoUrl — как в OrdersDetailsScreen
          const imageSource = item.photoUrl
            ? { uri: item.photoUrl }
            : require('../assets/images/placeholder.jpg');

          return (
            <View key={item.wishlist_id} style={styles.itemContainer}>
              {/* Картинка */}
              <Image source={imageSource} style={styles.itemImage} />

              {/* Текстовые данные */}
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

              {/* Кнопка удаления (минус) */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItemFromWishlist(item.wishlist_id)}
              >
                <Image
                  source={require('../assets/images/minus.png')}
                  style={styles.removeIcon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Нижнее меню */}
      <BottomMenu />
    </LinearGradient>
  );
};

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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
});
