import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "./BottomMenu";

const BeforePayScreen = ({ navigation }) => {
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
          <Text style={styles.infoText}>Назва: Букет "Лохина"</Text>
          <Text style={styles.infoText}>Дата: 10.11.2024 13:00</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Особливі побажання</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Тут типо текст (поле для ввода)"
          placeholderTextColor="#A9A9A9"
          multiline={true}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Мої дані</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Ім'я: Тут теж</Text>
          <Text style={styles.infoText}>Номер телефону: Тут теж</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.totalText}>Сума: 10 000 грн</Text>
        <TouchableOpacity style={styles.payButton}>
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
  },
  backIcon: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 10,
    width:15,
    height:20
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#83B620",
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
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    height: 80,
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
    marginBottom: 10,
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
