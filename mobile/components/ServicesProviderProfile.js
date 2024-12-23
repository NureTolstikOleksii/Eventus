import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "../components/BottomMenu";

const ServicesScreen = ({ navigation }) => {
  const services = [
    "Букет",
    "Прикраса зали",
    "Прикраса автомобілю",
    "Букет нареченої",
  ];

  return (
    <LinearGradient
      colors={["#a6cf4a", "#f2e28b", "#ffffff"]}
      style={styles.container}
    >
      {/* Заголовок */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Послуги</Text>
      </View>

      {/* Контейнер с услугами */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={styles.serviceItem}>
            <Text style={styles.serviceText}>
              {service
                .split(" ")
                .map((word, idx) => (idx === 1 ? `\n${word}` : word))}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ItemAddScreen")}
        >
          <Text style={styles.addText}>+</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#ffffff",
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    marginBottom: 30,
    alignItems: "center", // Центрируем элементы, включая кнопку "+"
  },
  serviceItem: {
    backgroundColor: "#A4C644",
    height: 100, // Фиксированная высота для всех блоков
    width: "100%",
    justifyContent: "center", // Центрирование текста по вертикали
    borderRadius: 10,
    marginBottom: 15, // Расстояние между блоками
    paddingHorizontal: 15, // Добавлен внутренний отступ для текста
  },
  serviceText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "left", // Текст выравнивается по левому краю
  },
  addButton: {
    marginTop: 5, // Отступ сверху для кнопки относительно блоков
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 50,
    color: "#6fa32b",
    fontWeight: "bold",
  },
});

export default ServicesScreen;
