import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    FlatList,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';

const API_KEY = Constants.expoConfig?.extra?.API_KEY;

export default function WelcomeScreen({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isProvider, setIsProvider] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loginErrors, setLoginErrors] = useState({});
    
    // логін
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleLoginInputChange = (field, value) => {
        setLoginData((prev) => ({ ...prev, [field]: value }));
        setLoginErrors((prev) => ({ ...prev, [field]: null })); // Очистка ошибок
    };


    //пропускаем ошибки логина
    // const handleLoginSubmit = async () => {
    //     try {
    //         // Временное решение: пропустить проверку логина
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Home' }], // Перенаправление на главную страницу
    //         });
    //     } catch (error) {
    //         setLoginErrors({ general: 'Something went wrong. Please try again later.' });
    //     }
    // };
    
    const handleLoginSubmit = async () => {
        try {
            setLoginErrors({});
            const response = await fetch(`${API_KEY}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
    
            const result = await response.json();
            if (!response.ok) {
                setLoginErrors({ general: result.message || 'Login failed. Please try again.' });
                if (result.errors) {
                    setLoginErrors(result.errors);
                }
            } else {
                alert('Login successful!');
                closeLoginModal();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } catch (error) {
            setLoginErrors({ general: 'Something went wrong. Please try again later.' });
        }
    };
    
    //категорії
    useEffect(() => {
        const loadCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };
        loadCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_KEY}/register/categories`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Не вдалося завантажити категорії. Перевірте зʼєднання з інтернетом.');
            return [];
        }
    };
    
   // реєстрація    
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        company_name: '',
        service_category: '',
    });
        
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null })); // Очистка ошибок
    };
    
    const handleSubmit = async () => {
        try {
            setErrors({});
            const endpoint = isProvider ? '/provider' : '/customer';
            const response = await fetch(`${API_KEY}/register${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            if (!response.ok) {
                if (result.missingFields) {
                    setErrors(result.missingFields);
                } else {
                    setErrors({ general: result.message });
                }
            } else {
                alert('Registration successful!');
                handleCloseModal();
                navigation.navigate('Welcome');
            }
        } catch (error) {
            setErrors({ general: 'Something went wrong. Please try again later.' });
        }
    };
   
    const handleOpenModal = () => {
        setErrors({}); // Сбрасываем все ошибки
        setFormData({
            name: '',
            email: '',
            password: '',
            phone_number: '',
            company_name: '',
            service_category: '',
        });
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setErrors({});
        setFormData({
            name: '',
            email: '',
            password: '',
            phone_number: '',
            company_name: '',
            service_category: '',
        });
        setIsModalVisible(false);
        setIsProvider(false);
    };

    const toggleProvider = () => {
        setIsProvider(!isProvider);
    };

    const openLoginModal = () => {
        setLoginErrors({}); 
        setLoginData({
            email: '',
            password: '',
        });
        setIsLoginModalVisible(true);
        setIsModalVisible(false);
    };

    const closeLoginModal = () => {
        setLoginErrors({}); 
        setLoginData({
            email: '',
            password: '',
        });
        setIsLoginModalVisible(false);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalVisible(false);
    };

    const selectCategory = (category) => {
        setFormData((prev) => ({ ...prev, service_category: category.id }));
        setSelectedCategory(category.name);
        closeCategoryModal();
    };

    return (
        <ImageBackground source={require('../assets/images/gradient.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            {/* Основное изображение */}           
            <Image source={require('../assets/images/capibara.png')} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
                    <View style={styles.simpleButton}>
                        <Text style={styles.buttonText}>Зареєструватися</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.loginText}>
                    Якщо ви вже зареєстровані <Text style={styles.loginLink} onPress={openLoginModal}>Увійдіть</Text>
                </Text>
            </View>

            <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={handleCloseModal}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { maxHeight: '70%' }]}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {/* Полное имя */}
                            <Text style={styles.label}>Повне ім'я</Text>
                            <TextInput
                                style={[styles.input, errors.name && styles.inputError]}
                                placeholder=""
                                value={formData.name}
                                onChangeText={(value) => handleInputChange('name', value)}
                            />
                            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                            {/* Email */}
                            <Text style={styles.label}>Адреса ел. пошти</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="example@gmail.com"
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            {/* Пароль */}
                            <Text style={styles.label}>Пароль</Text>
                            <TextInput
                                style={[styles.input, errors.password && styles.inputError]}
                                placeholder=""
                                secureTextEntry
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                            {/* Номер телефона */}
                            <Text style={styles.label}>Номер телефону</Text>
                            <TextInput
                                style={[styles.input, errors.phone_number && styles.inputError]}
                                placeholder=""
                                keyboardType="phone-pad"
                                value={formData.phone_number}
                                onChangeText={(value) => handleInputChange('phone_number', value)}
                            />
                            {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number}</Text>}

                            {/* Регистрация как поставщик */}
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity onPress={toggleProvider} style={styles.checkbox}>
                                    {isProvider && <View style={styles.checkboxInner} />}
                                </TouchableOpacity>
                                <Text style={styles.checkboxText}>Зареєструватися як постачальник</Text>
                            </View>



                            {/* Для поставщиков */}
                            {isProvider && (
                                <>
                                    <Text style={styles.label}>Назва підприємства</Text>
                                    <TextInput
                                        style={[styles.input, errors.company_name && styles.inputError]}
                                        placeholder=""
                                        value={formData.company_name}
                                        onChangeText={(value) => handleInputChange('company_name', value)}
                                    />
                                    {errors.company_name && <Text style={styles.errorText}>{errors.company_name}</Text>}

                                    <Text style={styles.label}>Категорія послуг</Text>
                                    <TouchableOpacity style={styles.input} onPress={() => setIsCategoryModalVisible(true)}>
                                    <Text style={styles.selectedCategoryText} >
                                        {selectedCategory || 'Виберіть категорію'}
                                    </Text>
                                    </TouchableOpacity>
                                    {errors.service_category && <Text style={styles.errorText}>{errors.service_category}</Text>}
                                </>
                            )}

                            {/* Кнопка Зареєструватися */}
                            <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
                                <View style={styles.simpleFormButton}>
                                    <Text style={styles.buttonText}>Зареєструватися</Text>
                                </View>
                            </TouchableOpacity>

                                    {/* Новая кнопка "Пропустить логин УДАЛИТЬ КАК И СТИЛЬ simpleButton" */}
                                    <TouchableOpacity
                                        style={[styles.simpleButton, { marginTop: 20 }]} // Новый стиль
                                        onPress={() => navigation.navigate('ProviderProfile')} // Переход на Welcome
                                    >
                                        <Text style={styles.buttonText}>Пропустить Provider</Text>
                                    </TouchableOpacity>

                                    {/* Новая кнопка "Пропустить логин УДАЛИТЬ КАК И СТИЛЬ simpleButton" */}
                                    <TouchableOpacity
                                        style={[styles.simpleButton, { marginTop: 20 }]} // Новый стиль
                                        onPress={() => navigation.navigate('UserProfile')} // Переход на Welcome
                                    >
                                        <Text style={styles.buttonText}>Пропустить User</Text>
                                    </TouchableOpacity>

                            {/* Общие ошибки */}
                            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

                            <Text style={styles.orText}>or</Text>
                            <View style={styles.socialContainer}>
                                <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
                                <Image source={require('../assets/images/Facebook.png')} style={styles.socialIcon} />
                            </View>

                            <Text style={styles.linkText}>
                                Вже маєте акаунт? <Text style={styles.registerText} onPress={openLoginModal}>Увійдіть</Text>
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={isCategoryModalVisible} transparent animationType="slide" onRequestClose={closeCategoryModal}>
                <TouchableWithoutFeedback onPress={closeCategoryModal}>
                    <View style={styles.categoryModalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.categoryModalContent}>
                                <FlatList
                                    data={categories}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.categoryItem}
                                            onPress={() => selectCategory(item)}
                                        >
                                            <Text style={styles.categoryText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal visible={isLoginModalVisible} transparent animationType="slide" onRequestClose={closeLoginModal}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { maxHeight: '70%' }]}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.label}>Адреса ел. пошти</Text>
                            <TextInput
                                style={[styles.input, loginErrors.email && styles.inputError]}
                                placeholder=""
                                keyboardType="email-address"
                                value={loginData.email}
                                onChangeText={(value) => handleLoginInputChange('email', value)}
                            />
                            {loginErrors.email && <Text style={styles.errorText}>{loginErrors.email}</Text>}

                            <Text style={styles.label}>Пароль</Text>
                            <TextInput
                                style={[styles.input, loginErrors.password && styles.inputError]}
                                placeholder=""
                                secureTextEntry
                                value={loginData.password}
                                onChangeText={(value) => handleLoginInputChange('password', value)}
                            />
                            {loginErrors.password && <Text style={styles.errorText}>{loginErrors.password}</Text>}
                            {loginErrors.general && <Text style={styles.errorText}>{loginErrors.general}</Text>}

                            <TouchableOpacity style={styles.formButton} onPress={handleLoginSubmit}>
                                <View style={styles.simpleFormButton}>
                                    <Text style={styles.buttonText}>Увійти</Text>
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.orText}>or</Text>
                            <View style={styles.socialContainer}>
                                <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
                                <Image source={require('../assets/images/Facebook.png')} style={styles.socialIcon} />
                            </View>

                            <Text style={styles.linkText}>
                                Не маєте акаунту? <Text style={styles.registerText} onPress={handleOpenModal}>Зареєструйтесь</Text>
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View> 
        
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    button: {
        borderRadius: 25,
        marginTop: 20,
        width: '120%',
    },
    simpleButton: {
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#8BC34A', // Цвет кнопки
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    loginText: {
        color: '#444',
        marginTop: 20,
        fontSize: 14,
    },
    loginLink: {
        color: '#6da72f',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollContent: {
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#CDE2A6',
        marginBottom: 10,
        borderRadius: 30,
        paddingHorizontal: 10,
        width: '100%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'flex-start',
        paddingLeft: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#83B620',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#83B620',
    },
    checkboxText: {
        fontSize: 15,
        color: '#333',
    },
    formButton: {
        borderRadius: 25,
        marginTop: 20,
        width: '80%',
    },
    simpleFormButton: {
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#83B620', // Цвет кнопки формы
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 24,
        color: '#86B826',
        textShadowColor: '#B0B5A5',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        width: '50%',
    },
    socialIcon: {
        width: 50,
        height: 50,
    },
    linkText: {
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    registerText: {
        color: '#83B620',
    },
    selectedCategoryText: {
        color: '#333',
        textAlignVertical: 'center',
        textAlign: 'center',
        height: '100%',   
        fontSize: 16,
    },
    categoryModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryModalContent: {
        width: '80%',
        maxHeight: '50%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    categoryItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    categoryText: {
        fontSize: 18,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: -5,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },


    simpleButton: {
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#83B620', //  И нужный цвет который был - #83B620  '#FFD700',
    },
});
