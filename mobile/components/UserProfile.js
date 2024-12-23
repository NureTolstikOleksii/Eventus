import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import BottomMenu from "../components/BottomMenu";

const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const UserProfile = () => {
  const navigation = useNavigation();

  // Стан для імені та фото користувача
  const [userName, setUserName] = useState(""); // Назва функції має бути `setUserName`
  const [userPhoto, setUserPhoto] = useState(null);

  // Функція для отримання даних профілю
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/customer/profile`, {
        method: "GET",
        credentials: "include", // Передача сесії
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched profile data:", data); // Логування отриманих даних
        setUserName(data.name); // Оновлюємо ім'я користувача
        setUserPhoto(data.photo); // Оновлюємо фото користувача
      } else {
        const result = await response.json();
        Alert.alert(
          "Помилка",
          result.message || "Не вдалося завантажити дані профілю."
        );
      }
    } catch (error) {
      console.error("Fetch profile error:", error.message);
      Alert.alert("Помилка", "Щось пішло не так. Спробуйте ще раз.");
    }
  };

  // Викликаємо fetchProfileData при завантаженні компоненту
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Функция выхода из аккаунта
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/logout`, {
        // Добавлен `/` перед profile
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        Alert.alert("Успішний вихід", "Ви вийшли з аккаунту.", [
          {
            text: "Ок",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              }),
          },
        ]);
      } else {
        const result = await response.json();
        Alert.alert("Помилка", result.message || "Не вдалося вийти.");
      }
    } catch (error) {
      Alert.alert("Помилка", "Щось пішло не так. Спробуйте ще раз.");
    }
  };

  return (
    <LinearGradient
      colors={["#a6cf4a", "#f2e28b", "#ffffff"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Профіль</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/pencil.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        {/* Відображення фото */}
        <Image
          source={
            userPhoto
              ? { uri: userPhoto }
              : require("../assets/images/userphoto.png")
          }
          style={styles.profileImage}
        />
        {/* Відображення імені */}
        <Text style={styles.userName}>{userName || "Ім'я не завантажено"}</Text>
      </View>
      <View style={styles.menuContainer}>
        {/* Список бажань */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Wishlist")}
        >
          <Text style={styles.menuText}>Список бажань</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        {/* Чек-лист */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("CheckList")}
        >
          <Text style={styles.menuText}>Чек-лист</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        {/* Мої замовлення */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("OrdersScreen")}
        >
          <Text style={styles.menuText}>Мої замовлення</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        {/* Чат (заглушка) */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert("Чат", "Ця функція поки що у розробці.")}
        >
          <Text style={styles.menuText}>Чат</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        {/* Сповіщення (заглушка) */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert("Сповіщення", "Ця функція поки що у розробці.")
          }
        >
          <Text style={styles.menuText}>Сповіщення</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>{" "}
        */
        {/* Модальное окно "Сповіщення"
            <Modal
                visible={isNotificationsModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleNotificationsModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.fullWidthModal}>
                        <Text style={styles.modalTitle}>Сповіщення</Text>
                        <ScrollView>
                            {[
                                { text: 'Відгук від Валєра', number: '№34528745', date: '30.11.2024' },
                                { text: 'Відгук від Валєра', number: '№34528745', date: '29.11.2024' },
                                { text: 'Відгук від Валєра', number: '№34528745', date: '28.11.2024' },
                            ].map((notification, index) => (
                                <View key={index} style={styles.notificationItem}>
                                    <View style={styles.notificationContent}>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.notificationText}>{notification.text}</Text>
                                            <Text style={styles.notificationNumber}>{notification.number}</Text>
                                        </View>
                                        <Text style={styles.notificationDate}>{notification.date}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleNotificationsModal}>
                            <Text style={styles.closeButtonText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Вихід із аккаунту */}
        <TouchableOpacity
          style={[styles.menuItem, styles.lastMenuItem]}
          onPress={handleLogout}
        >
          <Text style={styles.menuText}>Вихід із аккаунту</Text>
          <Image
            source={require("../assets/images/arrow_right.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      {/* Нижнее меню */}
      <BottomMenu />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    paddingTop: 60,
  },
  title: { textAlign: 'center', marginLeft:25,
    flex: 1, fontSize: 20, color: "#ffffff" },
  backIcon: { width: 20, height: 25 },
  editIcon: { width: 28, height: 28 },
  profileContainer: { alignItems: "center", marginTop: 20 },
  profileImage: { width: 130, height: 130, borderRadius: 40 },
  userName: { fontSize: 22, color: "#ffffff", marginTop: 10 },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#6fa32b",
  },
  lastMenuItem: {
    borderBottomWidth: 0, // убираем нижнюю границу для последнего элемента
  },
  menuText: { fontSize: 20, color: "#6fa32b" },
  arrowIcon: { width: 15, height: 15, tintColor: "#6fa32b" },
});

export default UserProfile;
