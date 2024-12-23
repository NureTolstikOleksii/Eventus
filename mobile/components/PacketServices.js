import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import BottomMenu from '../components/BottomMenu';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const API_URL = Constants.expoConfig?.extra?.API_KEY; // URL из .env

const PacketServices = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Получаем providerId из route.params или ставим 1, если он не передан
  const providerId = route.params?.providerId ?? 1;

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Функция для получения пакетов поставщика
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/provider/${providerId}/packages`, {
        method: 'GET',
        credentials: 'include', // если вам нужны куки, как в checklist
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          // На бэке иногда возвращается { message: 'Нет доступных пакетов услуг.' }
          setPackages([]);
        } else {
          setPackages(data);
        }
      } else {
        console.error('Ошибка при загрузке пакетов:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при загрузке пакетов:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Аналогично checklist.js, вызываем fetchPackages один раз при маунте
  useEffect(() => {
    fetchPackages();
  }, [providerId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a6cf4a', '#f2e28b', '#ffffff']}
        style={styles.gradientContainer}
      >
        {/* Заголовок */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Пакети послуг</Text>
        </View>

        {/* Контейнер пакетов */}
        {loading ? (
          <ActivityIndicator size="large" color="#6fa32b" style={{ marginTop: 50 }} />
        ) : (
          <ScrollView contentContainerStyle={styles.packagesContainer}>
            {packages.length === 0 ? (
              <Text style={styles.emptyText}>Нет доступных пакетов услуг.</Text>
            ) : (
              packages.map((pkg) => (
                <View key={pkg.package_id} style={styles.packageItem}>
                  <Text style={styles.packageName}>
                    {pkg.name || pkg.package_name}
                  </Text>
                  {pkg.price && (
                    <Text style={styles.packagePrice}>
                      Цена: {pkg.price}
                    </Text>
                  )}
                  <Text style={styles.packageDescription}>
                    {pkg.description || 'Без описания'}
                  </Text>
                </View>
              ))
            )}

            {/* Кнопка "Добавить пакет" */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                // Переход на экран добавления пакета (ItemAddScreen)
                // Можем передать providerId, чтобы на том экране тоже знать его
                navigation.navigate('ItemAddScreen', { providerId });
              }}
            >
              <FontAwesome name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          </ScrollView>
        )}
      </LinearGradient>

      {/* Нижнее меню */}
      <BottomMenu />
    </View>
  );
};

<<<<<<< Updated upstream
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backIcon: {
        width: 20,
        height: 25,
        tintColor: '#ffffff',
        marginTop: 25,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
        marginTop: 30,
    },
    servicesContainer: {
        paddingHorizontal: 20,
        paddingTop: 70,
        marginBottom: 30,
        alignItems: 'center', // Центрируем элементы, включая кнопку "+"
    },
    serviceItem: {
        backgroundColor: '#A4C644',
        height: 100, // Фиксированная высота для всех блоков
        width: '100%',
        justifyContent: 'center', // Центрирование текста по вертикали
        borderRadius: 10,
        marginBottom: 15, // Расстояние между блоками
        paddingHorizontal: 15, // Добавлен внутренний отступ для текста
    },
    serviceText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'left', // Текст выравнивается по левому краю
        whiteSpace: 'nowrap', // Отключение переноса текста
    },
    addButton: {
        marginTop: 5, // Отступ сверху для кнопки относительно блоков
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontSize: 50,
        color: '#6fa32b',
        fontWeight: 'bold',
    },
});

=======
>>>>>>> Stashed changes
export default PacketServices;

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 80
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
    marginRight: 10
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    flex: 1,
    textAlign: 'center'
  },
  packagesContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
    marginTop: 40
  },
  packageItem: {
    width: '100%',
    backgroundColor: '#A4C644',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  packageName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5
  },
  packagePrice: {
    color: '#fff',
    marginBottom: 5
  },
  packageDescription: {
    color: '#fff'
  },
  addButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6fa32b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  }
});
