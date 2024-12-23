import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from '../components/BottomMenu';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';

const API_URL = Constants.expoConfig?.extra?.API_KEY;

const ItemAddScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // providerId передаётся при навигации:
    // navigation.navigate('ItemAddScreen', { providerId: 123 });
    const { providerId } = route.params || { providerId: 1 };

    // Поля для услуги
    const [name, setName] = useState('');              // Название услуги
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // Поля для локации
    const [locationName, setLocationName] = useState('');      // Город (Location.name)
    const [locationAddress, setLocationAddress] = useState(''); // Адрес (Location.address)

    // Для категории (выпадающий список)
    const [categories, setCategories] = useState([]);   // Список всех категорий
    const [selectedCategory, setSelectedCategory] = useState(''); // Выбранная category_id

    // Индикатор загрузки
    const [loading, setLoading] = useState(false);

    // Загружаем список категорий при маунте
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/services/categories`);
            if (response.ok) {
                const data = await response.json();
                // data должен быть массивом вида [{category_id: 1, name: 'Квіти'}, ...]
                setCategories(data);
            } else {
                Alert.alert('Помилка', 'Не вдалося завантажити категорії.');
            }
        } catch (error) {
            Alert.alert('Помилка', `Не вдалося завантажити категорії: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Обработчик сохранения (пример)
    const handleSaveService = async () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Назва послуги обов’язкова!');
            return;
        }
        try {
            const bodyData = {
                name,
                description,
                price: price ? Number(price) : 0,
                // Если нужно, можно добавить provider_id: providerId,
                location_name: locationName.trim(),
                location_address: locationAddress.trim(),
                category_id: selectedCategory ? Number(selectedCategory) : null,
            };

            const response = await fetch(`${API_URL}/services/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert('Успіх', `Послуга додана! ID: ${data.serviceId}`);
                navigation.goBack();
            } else {
                const errData = await response.json();
                Alert.alert('Помилка', errData.error || 'Не вдалося додати послугу');
            }
        } catch (error) {
            Alert.alert('Помилка', `Сталася помилка: ${error.message}`);
        }
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Шапка */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/images/arrow.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Додавання послуги</Text>
                {/* Иконка «галочка» для сохранения */}
                <TouchableOpacity onPress={handleSaveService}>
                    <Image
                        source={require('../assets/images/check.png')}
                        style={styles.saveIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Контент */}
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#A4C644" style={{ marginTop: 50 }} />
                ) : (
                    <>
                        {/* Название услуги */}
                        <TextInput
                            style={styles.input}
                            placeholder="Назва послуги"
                            placeholderTextColor="#333"
                            value={name}
                            onChangeText={setName}
                        />

                        {/* Описание */}
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Опис послуги"
                            placeholderTextColor="#333"
                            multiline
                            value={description}
                            onChangeText={setDescription}
                        />

                        {/* Цена */}
                        <TextInput
                            style={styles.input}
                            placeholder="Ціна"
                            placeholderTextColor="#333"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />

                        {/* Локация: город и адрес */}
                        <TextInput
                            style={styles.input}
                            placeholder="Місто (Location.name)"
                            placeholderTextColor="#333"
                            value={locationName}
                            onChangeText={setLocationName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Адреса (Location.address)"
                            placeholderTextColor="#333"
                            value={locationAddress}
                            onChangeText={setLocationAddress}
                        />

                        {/* Выпадающий список категорий */}
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(val) => setSelectedCategory(val)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Оберіть категорію" value="" />
                                {categories.map((cat) => (
                                    <Picker.Item
                                        key={cat.category_id}
                                        label={cat.name}
                                        value={cat.category_id.toString()}
                                    />
                                ))}
                            </Picker>
                        </View>

                        {/* Кнопка сохранить */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveService}>
                            <Text style={styles.saveButtonText}>Зберегти</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <BottomMenu />
        </LinearGradient>
    );
};

export default ItemAddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#a6cf4a',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: '#ffffff',
    },
    title: {
        fontSize: 22,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    saveIcon: {
        width: 40,
        height: 35,
        tintColor: '#ffffff',
        position: 'absolute',
        top: -10,
        right: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#fff',
        marginBottom: 15,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: '#A4C644',
        borderRadius: 29,
        marginBottom: 15,
    },
    picker: {
        width: '100%',
        color: '#000',
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#6fa32b',
        borderRadius: 29,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
