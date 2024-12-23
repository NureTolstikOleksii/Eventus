import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import BottomMenu from "../components/BottomMenu";

const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const UserProfile = () => {
  const navigation = useNavigation();

  // Стан для імені та фото користувача// Назва функції має бути `setUserName`
  const [userPhoto, setUserPhoto] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("Ім'я користувача");
  const [userEmail, setUserEmail] = useState("email@example.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Функція для отримання даних профілю
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/customer/profile`, {
        method: "GET",
        credentials: "include",
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

  const handleSave = () => {
    console.log("Имя:", userName);
    console.log("Email:", userEmail);
    console.log("Пароль:", newPassword);
    setModalVisible(false); // Закрыть модальное окно после сохранения
  };

  return (
    <LinearGradient
      colors={["#a6cf4a", "#f2e28b", "#ffffff"]}
      style={styles.container}
    >
    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainerChange}>
        <View style={styles.modalContentChange}>
          <Text style={styles.modalTitleChange}>Редагування профілю</Text>

          {/* Поле для редактирования имени */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldText}>Ім'я</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Введіть нове ім'я"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
          </View>

          {/* Поле для редактирования электронной почты */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldText}>Електронна пошта</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Введіть нову пошту"
                value={userEmail}
                onChangeText={setUserEmail}
              />
            </View>
          </View>

          {/* Поля для редактирования пароля */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldText}>Пароль</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Старий пароль"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Новий пароль"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Підтвердження нового паролю"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          {/* Кнопка сохранения */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>Профіль</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require("../assets/images/pencil.png")} style={styles.editIcon} />
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
        </TouchableOpacity>
        
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
  modalContainerChange: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContentChange: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitleChange: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6fa32b",
    marginBottom: 20,
    textAlign: "center",
  },
  fieldWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  fieldText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6fa32b",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
  },
  inputField: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#6fa32b",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
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
