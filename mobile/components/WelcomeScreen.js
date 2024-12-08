import React, { useState } from 'react';
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
} from 'react-native';

export default function WelcomeScreen({ navigation }) { // Добавлен параметр navigation
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isProvider, setIsProvider] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

    const categories = ['Флористика', 'Їжа', 'Локації', 'Зйомка', 'Декор', 'Розваги', 'Організація', 'Одяг та краса', 'Транспорт', 'Оренда'];

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsProvider(false);
        navigation.navigate('Home');
    };

    const toggleProvider = () => {
        setIsProvider(!isProvider);
    };

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
        setIsModalVisible(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
        navigation.navigate('Home');
    };

    const openCategoryModal = () => {
        setIsCategoryModalVisible(true);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalVisible(false);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
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
                            <Text style={styles.label}>Повне ім'я</Text>
                            <TextInput style={styles.input} placeholder="" />
                            <Text style={styles.label}>Адреса ел. пошти</Text>
                            <TextInput style={styles.input} placeholder="" keyboardType="email-address" />
                            <Text style={styles.label}>Пароль</Text>
                            <TextInput style={styles.input} placeholder="" secureTextEntry />

                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity onPress={toggleProvider} style={styles.checkbox}>
                                    {isProvider && <View style={styles.checkboxInner} />}
                                </TouchableOpacity>
                                <Text style={styles.checkboxText}>Зареєструватися як постачальник</Text>
                            </View>

                            {isProvider && (
                                <>
                                    <Text style={styles.label}>Назва підприємства</Text>
                                    <TextInput style={styles.input} placeholder="" />

                                    <Text style={styles.label}>Категорія послуг</Text>
                                    <TouchableOpacity style={styles.input} onPress={openCategoryModal}>
                                        <Text style={styles.selectedCategoryText}>
                                            {selectedCategory || ''}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}

                            <TouchableOpacity style={styles.formButton} onPress={handleCloseModal}>
                                <View style={styles.simpleFormButton}>
                                    <Text style={styles.buttonText}>Зареєструватися</Text>
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.orText}>or</Text>
                            <View style={styles.socialContainer}>
                                {/* Иконки социальных сетей */}
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
                <View style={styles.categoryModalContainer}>
                    <View style={styles.categoryModalContent}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.categoryItem} onPress={() => selectCategory(item)}>
                                    <Text style={styles.categoryText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={isLoginModalVisible} transparent animationType="slide" onRequestClose={closeLoginModal}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { maxHeight: '70%' }]}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.label}>Адреса ел. пошти</Text>
                            <TextInput style={styles.input} placeholder="" keyboardType="email-address" />
                            <Text style={styles.label}>Пароль</Text>
                            <TextInput style={styles.input} placeholder="" secureTextEntry />
                            <TouchableOpacity style={styles.formButton} onPress={closeLoginModal}>
                                <View style={styles.simpleFormButton}>
                                    <Text style={styles.buttonText}>Увійти</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.socialContainer}>
                                {/* Иконки социальных сетей */}
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
        resizeMode: 'cover', // Покрывает весь экран
        width: '100%', // Ширина экрана
        height: '100%', // Высота экрана
        position: 'absolute', // Фиксирует изображение на заднем плане
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
});

