import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView, // ScrollView ekleniyor
} from "react-native";
import ButtonUI from "../components/ui/ButtonUI";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { useRef } from "react";
import { useSelector } from "react-redux";

const AddScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());

  const user = useSelector((state) => state.user.user);
  const userToken = user.token;

  const projectInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setSelectedTime(selectedTime);
  };

  const addProjectHandler = () => {
    const formattedStartDate = startDate.toISOString().slice(0, 10);

    const data = {
      projectName: projectName,
      startDate: formattedStartDate,
      endDate: selectedTime,
      description: description,
    };

    axios
      .post("http://192.168.1.23:3000/project/create", data, {
        headers: {
          Authorization: userToken,
        },
      })
      .catch((error) => {
        // Hata durumu
        console.log(error)
      });
  };

  return (
    <ImageBackground
      source={require("../assets/bg_blur_elips.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <SafeAreaView style={styles.safe}>
          <ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Add Project</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Project Name</Text>
              <TextInput
                style={styles.input}
                value={projectName}
                onChangeText={setProjectName}
                returnKeyType="next"
                ref={projectInputRef}
                onSubmitEditing={() => descriptionInputRef.current.focus()}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity style={styles.startDate}>
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  minimumDate={new Date(2000, 0, 1)}
                  maximumDate={new Date(2030, 11, 31)}
                  onChange={handleStartDateChange}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Time</Text>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={handleStartTimeChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                ref={descriptionInputRef}
              />
            </View>
            <ButtonUI
              title="Add Project"
              transparent={true}
              onPress={addProjectHandler}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    marginTop: 25,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  startDate: {},
});

export default AddScreen;
