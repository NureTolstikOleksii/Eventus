import { useState, useEffect } from "react";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "./BottomMenu";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.API_KEY;

const BeforePayScreen = ({ route, navigation }) => {
  const { orderId, title, price } = route.params; // Получаем переданный orderId
  const [sessionData, setSessionData] = useState(null);
  const [specialRequests, setSpecialRequests] = useState("");

  // Получаем текущую дату и время
  const now = new Date();
  const formattedDate = now.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = now.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const sessionResponse = await fetch(`${API_KEY}/session`, {
        method: "GET",
        credentials: "include",
      });

      if (sessionResponse.ok) {
        const data = await sessionResponse.json();
        setSessionData(data); // Сохраняем данные сессии
        console.log("Session data:", data);
      } else {
        console.error(
          "Error fetching session data:",
          sessionResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching session data:", error.message);
    }
  };

  const handleOrderCreation = async () => {
    try {
      const response = await fetch(`${API_KEY}/order/createOrder/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          special_requests: specialRequests,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Перенаправление на экран оплаты
        navigation.navigate("PaymentScreen", {
          orderId: result.order.orderId,
          title: result.order.name,
          price: result.order.total_price,
        });
      } else {
        const errorData = await response.json();
        Alert.alert("Помилка", errorData.message || "Не вдалося створити замовлення.");
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
      Alert.alert("Помилка", "Щось пішло не так. Спробуйте ще раз.");
    }
  };

  return (
    <LinearGradient
      colors={["#83B620", "#F2E28B", "#FFFFFF"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Замовлення</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Замовлення</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Назва: {title || "Назва відсутня"}</Text>
          <Text style={styles.infoText}>
            Дата: {formattedDate} {formattedTime}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Особливі побажання</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Введіть ваші побажання"
          placeholderTextColor="#A9A9A9"
          multiline={true}
          value={specialRequests}
          onChangeText={setSpecialRequests}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Мої дані</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Ім'я: {sessionData?.name || "Не вдалося завантажити ім'я"}
          </Text>
          <Text style={styles.infoText}>
            Номер телефону:{" "}
            {sessionData?.phone || "Не вдалося завантажити телефон"}
          </Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.totalText}>Сума: {price || "Не вдалося отримати ціну"} грн</Text>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handleOrderCreation}
        >
          <Text style={styles.payButtonText}>Оплатити</Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backIcon: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 10,
    width: 15,
    height: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
  },
  sectionContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#649c11",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#DFF0C6",
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 5,
  },
  inputBox: {
    backgroundColor: "#DFF0C6",
    padding: 10,
    borderRadius: 10,
    height: 150,
    textAlignVertical: "top",
    borderColor: "#83B620",
    borderWidth: 1,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 40,
  },
  payButton: {
    backgroundColor: "#83B620",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  payButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default BeforePayScreen;
