//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.
//ВРЕМЕННОЕ РЕШЕНИЕ, РАЗКОМЕНТИРОВАТЬ КОД НИЖЕ.


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = () => {
    const navigation = useNavigation();

    const menuItems = [
        { route: 'Home', icon: require('../assets/images/home.png'), label: 'Головна' },
        { route: 'Chat', icon: require('../assets/images/chat.png'), label: 'Чат' }, // Заглушка для чата
        { route: 'CheckList', icon: require('../assets/images/book.png'), label: 'Чек-лист' }, // Открытие CheckList
        { route: 'AddService', icon: require('../assets/images/add_plus.png'), label: 'Додати' }, // Открытие AddService
    ];

    return (
        <View style={styles.bottomMenu}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.bottomMenuItem}
                    onPress={() => navigation.navigate(item.route)}
                >
                    <Image source={item.icon} style={styles.menuIcon} />
                    <Text style={styles.bottomMenuText}>{item.label}</Text>
                </TouchableOpacity>
            ))}

            {/* Пункт "Профіль" */}
            <TouchableOpacity
                style={styles.bottomMenuItem}
                onPress={() => navigation.navigate('UserProfile')} // Общий профиль
            >
                <Image source={require('../assets/images/user.png')} style={styles.menuIcon} />
                <Text style={styles.bottomMenuText}>Профіль</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        zIndex: 10,
    },
    bottomMenuItem: {
        alignItems: 'center',
    },
    menuIcon: {
        width: 28,
        height: 28,
    },
    bottomMenuText: {
        fontSize: 14,
        color: '#6fa32b',
        marginTop: 5,
    },
});

export default BottomMenu;




// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import Constants from 'expo-constants';
// const API_KEY = Constants.expoConfig?.extra?.API_KEY;

// const BottomMenu = () => {
//     const navigation = useNavigation();
//     const [userRole, setUserRole] = useState(null);

//     // Функция для получения роли пользователя из сессии
//     const fetchUserRole = async () => {
//         try {
//             const response = await fetch(`${API_KEY}/session`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch session');
//             }

//             const data = await response.json();
//             setUserRole(data.role);
//         } catch (error) {
//             console.error('Error fetching user role:', error);
//             setUserRole(null);
//         }
//     };

//     useEffect(() => {
//         fetchUserRole();
//     }, []);

//     const handleProfilePress = () => {
//         if (userRole === 'customer') {
//             navigation.navigate('UserProfile'); // Переход на профиль клиента
//         } else if (userRole === 'provider') {
//             navigation.navigate('ProviderProfile'); // Переход на профиль поставщика
//         } else {
//             alert('Неизвестная роль пользователя. Обратитесь в поддержку.');
//         }
//     };

//     const handleRoleSpecificPress = () => {
//         if (userRole === 'customer') {
//             navigation.navigate('CheckList');
//         } else if (userRole === 'provider') {
//             navigation.navigate('AddService'); //добавить страничку добавления услуги
//         } else {
//             alert('Неизвестная роль пользователя. Обратитесь в поддержку.');
//         }
//     };

//     const menuItems = [
//         { route: 'Home', icon: require('../assets/images/home.png'), label: 'Головна' },
//         { route: 'Chat', icon: require('../assets/images/chat.png'), label: 'Чат' }, // добавить страничку чата (типа в разработке)
//     ];

//     return (
//         <View style={styles.bottomMenu}>
//             {menuItems.map((item, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     style={styles.bottomMenuItem}
//                     onPress={() => navigation.navigate(item.route)}
//                 >
//                     <Image source={item.icon} style={styles.menuIcon} />
//                     <Text style={styles.bottomMenuText}>{item.label}</Text>
//                 </TouchableOpacity>
//             ))}

//             {/* Пункт меню, зависящий от роли */}
//             <TouchableOpacity style={styles.bottomMenuItem} onPress={handleRoleSpecificPress}>
//                 <Image
//                     source={
//                         userRole === 'customer'
//                             ? require('../assets/images/book.png') // Иконка для клиента
//                             : require('../assets/images/add_plus.png') // Иконка для поставщика
//                     }
//                     style={styles.menuIcon}
//                 />
//                 <Text style={styles.bottomMenuText}>
//                     {userRole === 'customer' ? 'Чек-лист' : 'Додати'}
//                 </Text>
//             </TouchableOpacity>

//             {/* Пункт "Профіль" */}
//             <TouchableOpacity style={styles.bottomMenuItem} onPress={handleProfilePress}>
//                 <Image source={require('../assets/images/user.png')} style={styles.menuIcon} />
//                 <Text style={styles.bottomMenuText}>Профіль</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     bottomMenu: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 60,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         backgroundColor: '#ffffff',
//         paddingVertical: 12,
//         alignItems: 'center',
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//         zIndex: 10,
//     },
//     bottomMenuItem: {
//         alignItems: 'center',
//     },
//     menuIcon: {
//         width: 28,
//         height: 28,
//     },
//     bottomMenuText: {
//         fontSize: 14,
//         color: '#6fa32b',
//         marginTop: 5,
//     },
// });

// export default BottomMenu;
