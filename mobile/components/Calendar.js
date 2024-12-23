import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "react-native-calendar-picker";
import BottomMenu from "../components/BottomMenu";

const Calendar = ({ navigation }) => {
  const [events, setEvents] = useState([
    { date: "30.11.2024", time: "18:00" },
    { date: "01.12.2024", time: "14:00" },
    { date: "02.12.2024", time: "10:30" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("18:00");

  const handleAddEvent = () => {
    if (selectedDate && selectedTime) {
      setEvents([...events, { date: selectedDate, time: selectedTime }]);
      setModalVisible(false);
    } else {
      alert("Please select a date and time before saving!");
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
          <TouchableOpacity  key={index}
          style={styles.eventItem}
          onPress={() => navigation.navigate('BeforePayScreen')}>
            <Text style={styles.eventText}>Дата: {event.date}</Text>
            <Text style={styles.eventText}>Час: {event.time}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Оберіть дату:</Text>
            <DatePicker
              onDateChange={(date) => {
                if (date) {
                  const formattedDate = date.format("DD.MM.YYYY");
                  setSelectedDate(formattedDate);
                }
              }}
              selectedStartDate={selectedDate ? new Date(selectedDate) : null}
              width={300}
              height={300}
            />
            <Text style={styles.modalTitle}>Оберіть час:</Text>
            <TouchableOpacity onPress={() => setSelectedTime("10:00")}>
              <Text style={styles.timeText}>10:00</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedTime("14:00")}>
              <Text style={styles.timeText}>14:00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddEvent}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomMenu />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  eventItem: {
    backgroundColor: "#83B620",
    height: 70,
    width: "100%",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
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
  timeText: {
    fontSize: 18,
    color: "#83B620",
    marginBottom: 20,
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
