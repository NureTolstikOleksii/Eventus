import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import WebView from 'react-native-webview';




const ProviderProfile: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [userName, setUserName] = useState('Lee Know'); // Имя пользователя
    const [organizationName, setOrganizationName] = useState('Назва організації'); // Название организации

    const fields = [
        { label: "Повне ім'я", placeholder: 'Нове ім\'я' },
        { label: 'Адреса електронної пошти', placeholder: 'Нова адреса ел. пошти' },
        { label: 'Пароль', placeholder: 'Новий пароль' },
        { label: 'Назва підприємства', placeholder: 'Нова назва підприємства' },
        { label: 'Категорія послуг', placeholder: '' },
    ];

    const categories = [
        'Флористика', 'Їжа', 'Локації', 'Зйомка', 'Декор',
        'Розваги', 'Організація', 'Одяг та краса', 'Транспорт', 'Оренда',
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
        console.log(`${selectedField} updated to: ${selectedField === 'Категорія послуг' ? selectedCategory : inputValue}`);
        setModalVisible(false);
        setInputValue('');
        setOldPassword('');
        setSelectedCategory('');
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            {/* Заголовок */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/arrow.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Профіль</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Image source={require('../../assets/images/pencil.png')} style={styles.editIcon} />
                </TouchableOpacity>
            </View>

            {/* Інформація профілю */}
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/images/providerphoto.png')} style={styles.profileImage} />
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.organizationName}>{organizationName}</Text>
                <View style={styles.starsContainer}>
                    {[...Array(4)].map((_, index) => (
                        <Image
                            key={index}
                            source={require('../../assets/images/star_filled.png')}
                            style={styles.starIcon}
                        />
                    ))}
                    <Image
                        source={require('../../assets/images/star_outline.png')}
                        style={styles.starIcon}
                    />
                </View>
            </View>

            {/* Меню з опціями */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Послуги</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Пакети послуг</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
                    <Text style={styles.menuText}>Сповіщення</Text>
                    <Image source={require('../../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
            </View>

            {/* Модальне вікно для редагування */}
            <Modal visible={isModalVisible} transparent={true} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Редагування профілю</Text>
                    {fields.map((field, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedField === field.label && styles.optionButtonSelected,
                            ]}
                            onPress={() => setSelectedField(field.label)}
                        >
                            <Text style={styles.optionText}>{field.label}</Text>
                        </TouchableOpacity>
                    ))}

                    {selectedField === 'Пароль' && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Старий пароль"
                                secureTextEntry
                                onChangeText={text => setOldPassword(text)}
                                value={oldPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Новий пароль"
                                secureTextEntry
                                onChangeText={text => setInputValue(text)}
                                value={inputValue}
                            />
                        </>
                    )}

                    {selectedField === 'Категорія послуг' && (
                        <Picker
                            selectedValue={selectedCategory}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        >
                            <Picker.Item label="Оберіть категорію" value="" />
                            {categories.map((category, index) => (
                                <Picker.Item key={index} label={category} value={category} />
                            ))}
                        </Picker>
                    )}

                    {selectedField !== 'Пароль' && selectedField !== 'Категорія послуг' && selectedField && (
                        <TextInput
                            style={styles.input}
                            placeholder={fields.find(field => field.label === selectedField)?.placeholder}
                            onChangeText={text => setInputValue(text)}
                            value={inputValue}
                        />
                    )}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Підтвердити</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', paddingTop: 60 },
    title: { fontSize: 20, color: '#ffffff' },
    backIcon: { width: 15, height: 15 },
    editIcon: { width: 28, height: 28 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 119, height: 116, borderRadius: 40 },
    starsContainer: { flexDirection: 'row', marginTop: 5 },
    starIcon: { width: 25, height: 25, marginHorizontal: 8 },
    menuContainer: { marginTop: 20 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6fa32b',
    },
    lastMenuItem: { borderBottomWidth: 0 },
    menuText: { fontSize: 20, color: '#6fa32b' },
    arrowIcon: { width: 15, height: 15, tintColor: '#6fa32b' },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        color: '#6fa32b',
        textAlign: 'center',
        width: '100%',
    },
    optionButton: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#cde2a6',
        marginBottom: 10,
    },
    optionButtonSelected: { backgroundColor: '#6fa32b' },
    optionText: { fontSize: 16, color: '#ffffff' },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#cde2a6',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        marginTop: 15,
        backgroundColor: '#f5f9e9',
    },
    saveButton: {
        backgroundColor: '#6fa32b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    saveButtonText: { color: 'white', fontSize: 16 },
    picker: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#cde2a6',
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: '#f5f9e9',
    },

    userName: {
        fontSize: 24, // Увеличенный размер текста для имени
        fontWeight: 'bold', // Сделать текст жирным
        color: '#FFFFFF', // Белый цвет текста
        marginTop: 10, // Отступ сверху
        textAlign: 'center', // Выравнивание текста по центру
        fontFamily: 'Kurale_400Regular', // Шрифт Kurale
    },
    organizationName: {
        fontSize: 16, // Чуть меньший размер текста
        color: '#FFFFFF', // Белый цвет текста
        marginTop: 5, // Небольшой отступ сверху
        textAlign: 'center', // Выравнивание текста по центру
        fontFamily: 'Kurale_400Regular', // Шрифт Kurale
    },

    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bottomMenuItem: { alignItems: 'center' },
    menuIcon: { width: 24, height: 24 },
    bottomMenuText: { fontSize: 12, color: '#6fa32b', fontFamily: 'Kurale_400Regular' },
});

export default ProviderProfile;