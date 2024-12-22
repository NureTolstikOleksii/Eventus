import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Picker,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';

const ItemAddScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [service, setService] = useState(''); // Для выпадающего списка услуг

    const handleSave = () => {
        if (!name || !description || !price || !service) {
            Alert.alert('Помилка', 'Будь ласка, заповніть усі поля.');
            return;
        }
        Alert.alert('Успіх', `Назва: ${name}, Опис: ${description}, Ціна: ${price} €, Послуга: ${service}`);
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                    <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Додавання</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PecketiDetailsScreen')}>
        <Image source={require('../assets/images/check.png')} style={styles.saveIcon} />
        </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                                <TouchableOpacity style={styles.addPhotoButton}>
                                <Text style={styles.addPhotoText}>Додати фото</Text>
                                <Text style={styles.addServiceIcon}>+</Text>
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
                        placeholder="Ціна €"
                        placeholderTextColor="#333"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                        
                    />
                    
                    </View>
                    
                    {/* Выпадающее меню Послуги + */}
               
                    <View style={styles.dropdownContainer}>
                    <Picker
                    selectedValue={service}
                    onValueChange={(itemValue) => setService(itemValue)}
                    style={styles.dropdown}
                    dropdownIconColor="#A4C644" // Цвет стрелки в iOS/Android
                            >
                              <Picker.Item label="Оберіть послугу" value="" />
                                    <Picker.Item label="Кейтеринг" value="Кейтеринг" />
                                 <Picker.Item label="Квіти" value="Квіти" />
                              <Picker.Item label="Декор" value="Декор" />
                            <Picker.Item label="Музика" value="Музика" />
                        </Picker>
                    <Image source={require('../assets/images/plus.png')} style={styles.dropdownIcon} />
                </View>

            {/* Bottom Menu */}
            <BottomMenu />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#a6cf4a',
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
        width: 40, // Ширина галочки
        height: 35, // Высота галочки
        tintColor: '#ffffff', // Белый цвет, чтобы соответствовать дизайну
        position: 'absolute', // Абсолютная позиция для корректного слоя
        opacity: 1, // Убедитесь, что галочка видима
        top: -10, // Расстояние от верхнего края
        right: 10, // Расстояние от правого края
    
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    addPhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        width: 310, // Ширина згідно з дизайном
        height: 47, // Висота згідно з дизайном
    },
    addPhotoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    flowerImage: {
        width: 250,
        height: 180,
        borderRadius: 15,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: '90%',
        fontSize: 16,
        marginBottom: 15,
        color: '#ffffff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
    },
    priceInput: {
        flex: 1,
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#ffffff',
    },
    currency: {
        fontSize: 16,
        color: '#ffffff',
        marginLeft: 10,
    },
    addServiceButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: '90%',
        marginTop: 15,
    },
    addServiceText: {
        fontSize: 16,
        color: '#ffffff',
    },
    addServiceIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#A4C644',
        borderRadius: 29,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15,
        width: '90%',
        height: 50,
        borderWidth: 0, // Убираем границы
        alignSelf: 'center',
    },
    dropdown: {
        flex: 1,
        color: '#000000', // Цвет текста в списке
        fontSize: 16,
        borderWidth: 0, // Убираем границы
        backgroundColor: '#A4C644', // Фон списка
    },
    dropdownItem: {
        backgroundColor: '#A4C644', // Фон для каждого элемента списка
        color: '#000000', // Белый текст
        fontSize: 16,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 0, // Убираем границы
        paddingVertical: 5,
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        borderWidth: 0, // Убираем границы
        tintColor: '#A4C644',
    },

});

export default ItemAddScreen;