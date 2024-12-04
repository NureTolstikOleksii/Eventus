import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import BottomMenu from '../components/BottomMenu'; // Подключение компонента меню
import { FontAwesome } from '@expo/vector-icons';


const ProviderProfile = ({ navigation }) => { // Добавлено { navigation }
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [userName, setUserName] = useState('Lee Know');
    const [organizationName, setOrganizationName] = useState('Назва організації');
    const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false); // Для уведомлений


    const fields = [
        { label: "Повне ім'я", placeholder: "Нове ім'я" },
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
        console.log(
            `${selectedField} updated to: ${selectedField === 'Категорія послуг' ? selectedCategory : inputValue
            }`
        );
        setModalVisible(false);
        setInputValue('');
        setOldPassword('');
        setSelectedCategory('');
    };

    const toggleNotificationsModal = () => {
        setNotificationsModalVisible(!isNotificationsModalVisible);
    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Заголовок */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/arrow.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Профіль</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Image source={require('../assets/images/pencil.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>

                {/* Информация профиля */}
                <View style={styles.profileContainer}>
                    <Image source={require('../assets/images/providerphoto.png')} style={styles.profileImage} />
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.organizationName}>{organizationName}</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(4)].map((_, index) => (
                            <Image
                                key={index}
                                source={require('../assets/images/star_filled.png')}
                                style={styles.starIcon}
                            />
                        ))}
                        <Image
                            source={require('../assets/images/star_outline.png')}
                            style={styles.starIcon}
                        />
                    </View>
                </View>

                {/* Меню */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')} style={styles.menuItem}>
                        <Text style={styles.menuText}>Послуги</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('PacketServices')} style={styles.menuItem}>
                        <Text style={styles.menuText}>Пакети послуг</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleNotificationsModal} style={[styles.menuItem, styles.lastMenuItem]}>
                        <Text style={styles.menuText}>Сповіщення</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>

                {/* Модальное окно */}
                <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Редагування профілю</Text>

                            {fields.map((field, index) => (
                                <View key={index} style={styles.fieldWrapper}>
                                    <TouchableOpacity onPress={() => setSelectedField(selectedField === field.label ? '' : field.label)}>
                                        <Text style={styles.fieldText}>{field.label}</Text>
                                    </TouchableOpacity>
                                    {selectedField === field.label && (
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.inputPassword}
                                                placeholder={field.placeholder}
                                                value={inputValue}
                                                onChangeText={setInputValue}
                                            />
                                            {field.label === 'Пароль' && (
                                                <TextInput
                                                    style={styles.inputPassword}
                                                    placeholder="Старий пароль"
                                                    secureTextEntry
                                                    value={oldPassword}
                                                    onChangeText={setOldPassword}
                                                />
                                            )}
                                        </View>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Підтвердити</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
            {/* Модальное окно "Сповіщення" */}
            <Modal
                visible={isNotificationsModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleNotificationsModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.notificationsModal}>
                        <Text style={styles.modalTitle}>Сповіщення</Text>
                        <ScrollView>
                            <View style={styles.notificationItem}>
                                <Text style={styles.notificationText}>Ви отримали відгук від ...</Text>
                            </View>
                            <View style={styles.notificationItem}>
                                <Text style={styles.notificationText}>Нове замовлення від n...</Text>
                            </View>
                            <View style={styles.notificationItem}>
                                <Text style={styles.notificationText}>Ви отримали відгук від ...</Text>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleNotificationsModal}>
                            <Text style={styles.closeButtonText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Фиксированное меню */}
            <BottomMenu />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingBottom: 80 },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', paddingTop: 20 },
    title: { fontSize: 20, color: '#ffffff' },
    backIcon: { width: 15, height: 15 },
    editIcon: { width: 28, height: 28 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 119, height: 116, borderRadius: 40 },
    userName: { color: 'white' },
    organizationName: { color: 'white' },
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6fa32b',
        textAlign: 'center',
        marginBottom: 20,
    },
    fieldWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    fieldText: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    saveButton: {
        backgroundColor: '#6fa32b',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 10,
    },
    inputPassword: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#d8e6be',
        fontSize: 16,
    },
    notificationsModal: {
        width: '90%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },
    modalTitle: {
        fontSize: 24,
        color: '#6fa32b',
        textAlign: 'center',
        marginBottom: 20,
    },
    notificationItem: {
        backgroundColor: '#a6cf4a',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    notificationText: { fontSize: 16, color: '#fff' },
    closeButton: {
        backgroundColor: '#6fa32b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
    closeButtonText: { color: '#fff', fontSize: 18 },
});

export default ProviderProfile;
