import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CalendarPicker from "react-native-calendar-picker";
import BottomMenu from "../components/BottomMenu";

const Calendar = ({ route, navigation }) => {
  const { role } = route.params; // Отримуємо роль із route.params
  const [events, setEvents] = useState([
    { date: "30.11.2024", time: "18:00" },
    { date: "01.12.2024", time: "14:00" },
    { date: "02.12.2024", time: "10:30" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleAddEvent = () => {
    if (selectedDate && selectedTime) {
      setEvents([...events, { date: selectedDate, time: selectedTime }]);
      setModalVisible(false);
      setSelectedDate("");
      setSelectedTime("");
    } else {
      alert("Будь ласка, виберіть дату та час перед збереженням!");
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setSelectedDate(formattedDate);
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
        <Text style={styles.title}>Календар</Text>
      </View>

      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventText}>Дата: {event.date}</Text>
              <Text style={styles.eventText}>Час: {event.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setEvents(events.filter((_, i) => i !== index)); // Видаляємо елемент
              }}
            >
              <Text style={styles.deleteButtonText}>−</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Показуємо кнопку додавання лише для ролі 'provider' */}
        {role === "provider" && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Хрестик для закриття */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Оберіть дату:</Text>
            <CalendarPicker
              onDateChange={handleDateChange}
              width={300}
              height={300}
              previousTitle="Попередній" // Текст для кнопки "Previous"
              nextTitle="Наступний" // Текст для кнопки "Next"
              textStyle={{
                color: "#83B620", // Стиль тексту заголовків і кнопок
                fontWeight: "bold",
              }}
              previousTitleStyle={{
                color: "#83B620", // Стиль кнопки "Previous"
              }}
              nextTitleStyle={{
                color: "#83B620", // Стиль кнопки "Next"
              }}
              monthTitleStyle={{
                color: "#4A4A4A", // Стиль заголовка місяця
                fontWeight: "bold",
              }}
              yearTitleStyle={{
                color: "#4A4A4A", // Стиль заголовка року
                fontWeight: "bold",
              }}
              todayBackgroundColor="#DFF0C6" // Виділення для сьогоднішньої дати
            />

            <Text style={styles.modalTitle}>Оберіть час:</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="Введіть час (наприклад, 14:30)"
              placeholderTextColor="#A9A9A9"
              value={selectedTime}
              onChangeText={(text) => {
                let formattedText = text.replace(/[^0-9]/g, ""); // Видаляємо всі символи, крім цифр
                if (formattedText.length > 2) {
                  formattedText =
                    formattedText.slice(0, 2) + ":" + formattedText.slice(2, 4);
                }
                setSelectedTime(formattedText);
              }}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
              <Text style={styles.saveButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomMenu />
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  eventItem: {
    backgroundColor: "#83B620",
    height: 70,
    width: "100%",
    flexDirection: "row", // Вирівнюємо елементи в ряд
    alignItems: "center",
    justifyContent: "space-between", // Текст зліва, кнопка справа
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  eventDetails: {
    flex: 1, // Щоб текст займав весь простір
  },
  deleteButton: {
    width: 40, // Задана ширина кнопки
    height: 40, // Задана висота кнопки
    alignItems: "center", // Центрування тексту по горизонталі
    justifyContent: "center", // Центрування тексту по вертикалі
  },
  
  deleteButtonText: {
    color: "#FFFFFF", // Білий колір тексту
    fontSize: 24, // Розмір тексту
    fontWeight: "bold", // Жирний текст
  },
    
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#83B620",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: { flex: 1, paddingTop: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#FFFFFF",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
    marginTop: 30,
  },
  eventsContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  eventText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "left",
  },
  addButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    elevation: 5,
  },
  addText: {
    fontSize: 30,
    color: "#83B620",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeInput: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderColor: "#83B620",
    borderWidth: 1,
    width: "100%",
    textAlign: "center",
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#83B620",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Calendar;
