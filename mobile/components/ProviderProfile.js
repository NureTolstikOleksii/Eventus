import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import BottomMenu from '../components/BottomMenu'; // Подключение компонента меню
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const ProviderProfile = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [inputValue, setInputValue] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);


    const [selectedCategory, setSelectedCategory] = useState('');
    const [userName, setUserName] = useState('Lee Know');
    const [organizationName, setOrganizationName] = useState('Назва організації');
    const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false); // Для уведомлений

    useEffect(() => {
        fetchSessionData();
    }, []);

    const fetchSessionData = async () => {
        try {
            const sessionResponse = await fetch(`${API_KEY}/session`, {
                method: 'GET',
                credentials: 'include', // Отправка cookies для доступа к сессии
            });

            if (sessionResponse.ok) {
                const sessionData = await sessionResponse.json();
                setUserName(sessionData.name);
                setOrganizationName(sessionData.companyName);
                console.log(sessionData.userId);
                console.log(sessionData.companyName);
            } else {
                console.error('Error fetching session data:', sessionResponse.statusText);
            }
        } catch (error) {
            console.error('Error fetching session data:', error.message);
        }
    };

    // Функція для зміни пароля
    const handlePasswordChange = async () => {
        try {
            const response = await fetch(`${API_KEY}/change_data/update_provider_password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    confirmPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Успіх', 'Пароль успішно змінено.');
                setModalVisible(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                Alert.alert('Помилка', result.message || 'Не вдалося змінити пароль.');
            }
        } catch (error) {
            console.error('Error changing password:', error.message);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

    //Зміна назви організації
    const handleOrganizationNameChange = async (newOrganizationName) => {
        try {
            const response = await fetch(`${API_KEY}/change_data/update_organization_name`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ newOrganizationName }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Успіх', 'Назва організації успішно змінена.');
                setOrganizationName(newOrganizationName); // Оновлення назви в інтерфейсі
            } else {
                Alert.alert('Помилка', result.message || 'Не вдалося змінити назву організації.');
            }
        } catch (error) {
            console.error('Error updating organization name:', error.message);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

    //Зміна електр.пошти
    const handleEmailChange = async (newEmail) => {
        try {
            const response = await fetch(`${API_KEY}/change_data/update_provider_email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ newEmail }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Успіх', 'Адресу електронної пошти успішно змінено.');
                setInputValue(''); // Очистка поля вводу
            } else {
                Alert.alert('Помилка', result.message || 'Не вдалося змінити адресу електронної пошти.');
            }
        } catch (error) {
            console.error('Error updating email:', error.message);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

    // Зміна імені постачальника
    const handleNameChange = async (newName) => {
        try {
            const response = await fetch(`${API_KEY}/change_data/update_provider_name`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ newName }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Успіх', "Ім'я успішно змінено.");
                setUserName(newName); // Оновлюємо ім'я в стані
                setInputValue(''); // Очищуємо поле вводу
            } else {
                Alert.alert('Помилка', result.message || "Не вдалося змінити ім'я.");
            }
        } catch (error) {
            console.error('Error updating name:', error.message);
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

//Сповіщення
const fetchNotifications = async () => {
    setLoadingNotifications(true); // Початок завантаження
    try {
        const response = await fetch(`${API_KEY}/profile/notifications`, {
            method: 'GET',
            credentials: 'include', // Включення cookies для сесії
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setNotifications(data); // Збереження сповіщень у стані
        } else {
            console.error('Error fetching notifications:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
    } finally {
        setLoadingNotifications(false); // Завершення завантаження
    }
};

    // Функция выхода из аккаунта
    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                Alert.alert('Успішний вихід', 'Ви вийшли з аккаунту.', [
                    {
                        text: 'Ок',
                        onPress: () => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        }),
                    },
                ]);
            } else {
                const result = await response.json();
                Alert.alert('Помилка', result.message || 'Не вдалося вийти.');
            }
        } catch (error) {
            Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

    const fields = [
        { label: "Повне ім'я", placeholder: "Нове ім'я" },
        { label: 'Адреса електронної пошти', placeholder: 'Нова адреса ел. пошти' },
        { label: 'Пароль', placeholder: 'Новий пароль' },
        { label: 'Назва підприємства', placeholder: 'Нова назва підприємства' },
    ];

    const categories = [
        'Флористика', 'Їжа', 'Локації', 'Зйомка', 'Декор',
        'Розваги', 'Організація', 'Одяг та краса', 'Транспорт', 'Оренда',
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
        if (selectedField === 'Пароль') {
            // Перевіряємо, чи всі поля для зміни пароля заповнені
            if (!oldPassword || !newPassword || !confirmPassword) {
                Alert.alert('Помилка', 'Будь ласка, заповніть усі поля для зміни пароля.');
                return;
            }

            // Перевіряємо, чи новий пароль збігається з підтвердженням
            if (newPassword !== confirmPassword) {
                Alert.alert('Помилка', 'Новий пароль і підтвердження пароля не збігаються.');
                return;
            }

            // Викликаємо функцію зміни пароля
            handlePasswordChange();
        } else if (selectedField === 'Назва підприємства') {
            if (!inputValue) {
                Alert.alert('Помилка', 'Будь ласка, введіть нову назву організації.');
                return;
            }

            handleOrganizationNameChange(inputValue); // Виклик функції для зміни назви організації
        } else if (selectedField === 'Адреса електронної пошти') {
            if (!inputValue) {
                Alert.alert('Помилка', 'Будь ласка, введіть нову адресу електронної пошти.');
                return;
            }
            handleEmailChange(inputValue);
        } else if (selectedField === "Повне ім'я") {
            if (!inputValue) {
                Alert.alert('Помилка', "Будь ласка, введіть нове ім'я.");
                return;
            }
            handleNameChange(inputValue); // Виклик функції для зміни імені 
        } else {
            console.log(
                `${selectedField} updated to: ${selectedField === 'Категорія послуг' ? selectedCategory : inputValue}`
            );
        }

        // Закриваємо модальне вікно і очищаємо поля
        setModalVisible(false);
        setInputValue('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSelectedCategory('');
    };


    const toggleNotificationsModal = () => {
        if (!isNotificationsModalVisible) {
            fetchNotifications(); // Завантаження сповіщень
        }
        setNotificationsModalVisible(!isNotificationsModalVisible);    };

    return (
        <LinearGradient colors={['#a6cf4a', '#f2e28b', '#ffffff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Заголовок */}
                <View style={styles.header}>

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

                    <TouchableOpacity onPress={toggleNotificationsModal} style={styles.menuItem}>
                        <Text style={styles.menuText}>Сповіщення</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderLists')} // Переход на OrderLists.js
                        style={styles.menuItem}
                    >
                        <Text style={styles.menuText}>Замовлення</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={handleLogout}>
                        <Text style={styles.menuText}>Вихід із аккаунту</Text>
                        <Image source={require('../assets/images/arrow_right.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>

                {/* Модальное окно */}
                <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModal}>
                    <View style={styles.modalContainerChange}>
                        <View style={styles.modalContentChange}>
                            <Text style={styles.modalTitleChange}>Редагування профілю</Text>

                            {fields.map((field, index) => (
                                <View key={index} style={styles.fieldWrapper}>
                                    <TouchableOpacity onPress={() => setSelectedField(selectedField === field.label ? '' : field.label)}>
                                        <Text style={styles.fieldText}>{field.label}</Text>
                                    </TouchableOpacity>
                                    {selectedField === field.label && (
                                        <View style={styles.inputContainer}>
                                            {/* Если выбрано редактирование пароля */}
                                            {field.label === 'Пароль' ? (
                                                <>
                                                    <TextInput
                                                        style={styles.inputPassword}
                                                        placeholder="Старий пароль"
                                                        secureTextEntry
                                                        value={oldPassword}
                                                        onChangeText={setOldPassword}
                                                    />
                                                    <TextInput
                                                        style={styles.inputPassword}
                                                        placeholder="Новий пароль"
                                                        secureTextEntry
                                                        value={newPassword}
                                                        onChangeText={setNewPassword}
                                                    />
                                                    <TextInput
                                                        style={styles.inputPassword}
                                                        placeholder="Підтвердження нового паролю"
                                                        secureTextEntry
                                                        value={confirmPassword}
                                                        onChangeText={setConfirmPassword}
                                                    />
                                                </>
                                            ) : (
                                                <TextInput
                                                    style={styles.inputPassword}
                                                    placeholder={field.placeholder}
                                                    value={inputValue}
                                                    onChangeText={setInputValue}
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
    animationType="slide"
    onRequestClose={toggleNotificationsModal}
>
    <View style={styles.modalContainer}>
        <View style={styles.fullWidthModal}>
            <Text style={styles.modalTitle}>Сповіщення</Text>
            {loadingNotifications ? (
                <Text>Завантаження...</Text>
            ) : notifications.length > 0 ? (
                <ScrollView>
                    {notifications.map((notification, index) => (
                        <View key={index} style={styles.notificationItem}>
                            <View style={styles.notificationContent}>
                                <View style={styles.textContainer}>
                                <Text style={styles.notificationInfo}>
                        Замовник: {notification.customer_name}
                    </Text>
                                    <Text style={styles.notificationText}>
                                        {notification.notification_text}
                                    </Text>
                                    <Text style={styles.notificationDate}>
                                        {new Date(notification.notification_time).toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text>Сповіщень немає</Text>
            )}
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
    content: { paddingBottom: 80, paddingTop: 30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', paddingTop: 20 },
    title: {
        textAlign: 'center', marginLeft: 25,
        flex: 1, fontSize: 20, color: "#ffffff"
    },
    backIcon: { width: 15, height: 15 },
    editIcon: { width: 28, height: 28 },
    profileContainer: { alignItems: 'center', marginTop: 20 },
    profileImage: { width: 119, height: 116, borderRadius: 40 },
    userName: { color: 'white', margin: 10, fontSize: 25 },
    organizationName: { color: 'white',fontSize: 15 },
    starsContainer: { flexDirection: 'row', marginTop: 15 },
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
    modalContainerChange: {
        flex: 1,
        justifyContent: 'flex-end', // Розташовує модальне вікно внизу екрана
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Напівпрозорий фон для фону
    },
    modalContentChange: {
        width: '100%', // Ширина модального вікна
        backgroundColor: '#ffffff', // Білий фон для самого модального вікна
        borderTopLeftRadius: 20, // Закруглення верхнього лівого кута
        borderTopRightRadius: 20, // Закруглення верхнього правого кута
        padding: 20, // Відступи всередині модального вікна
        elevation: 5, // Тінь для Android
        shadowColor: '#000', // Колір тіні
        shadowOffset: { width: 0, height: 2 }, // Зміщення тіні
        shadowOpacity: 0.25, // Прозорість тіні
        shadowRadius: 4, // Радіус тіні
        height: '70%',
    },
    modalTitleChange: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6fa32b',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    fullWidthModal: {
        width: '100%', // Встановлюємо ширину на 100% екрану
        height: '70%', // Висота модального вікна
        backgroundColor: '#ffffff', // Білий фон для модального вікна
        borderTopLeftRadius: 20, // Закруглення верхнього лівого кута
        borderTopRightRadius: 20, // Закруглення верхнього правого кута
        paddingHorizontal: 20, // Внутрішній відступ
        paddingTop: 20, // Відступ зверху
        paddingBottom: 20, // Відступ знизу
        paddingBottom: 80, // Додаємо відступ, щоб контент не заходив на кнопку

    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6fa32b',
        textAlign: 'center',
        marginBottom: 20,
    },
    notificationItem: {
        backgroundColor: '#a6cf4a',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    notificationContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationBox: {
        backgroundColor: '#a6cf4a',
        borderRadius: 20,
        padding: 15,
        width: '100%', // Занимает всю ширину экрана
        marginHorizontal: 10, // Добавляем отступы снаружи
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    notificationInfo: {
        fontSize: 14,
        color: '#ffffff',
        marginVertical: 5,
    },
    textContainer: {
        flex: 3,
    },
    notificationText: {
        fontSize: 16,
        color: '#ffffff',
    },
    notificationNumber: {
        fontSize: 14,
        color: '#ffffff',
        marginTop: 5, // Відступ для нового рядка
    },
    notificationDate: {
        fontSize: 14,
        color: '#ffffff',
        flex: 1,
        textAlign: 'right',
    },
    closeButton: {
        position: 'absolute', // Фіксоване положення
        bottom: 20, // Відступ від нижнього краю модального вікна
        left: '30%', // Вирівнювання по центру через 10% від краю
        width: '50%', // Ширина кнопки 80% від ширини модального вікна
        backgroundColor: '#6fa32b', // Зелений фон
        paddingVertical: 12, // Вертикальні відступи всередині кнопки
        borderRadius: 25, // Округлені кути кнопки
        alignItems: 'center', // Вирівнювання тексту по центру
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        position: 'absolute', // Фіксоване положення
        bottom: 20, // Відступ від нижнього краю модального вікна
        left: '30%', // Вирівнювання по центру через 10% від краю
        width: '50%', // Ширина кнопки 80% від ширини модального вікна
        backgroundColor: '#6fa32b', // Зелений фон
        paddingVertical: 12, // Вертикальні відступи всередині кнопки
        borderRadius: 25, // Округлені кути кнопки
        alignItems: 'center', // Вирівнювання тексту по центру
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

    saveButtonText: {
        color: '#ffffff', // Білий колір тексту
        fontSize: 18, // Розмір шрифту
        fontWeight: 'bold', // Жирний текст
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
});

export default ProviderProfile;
