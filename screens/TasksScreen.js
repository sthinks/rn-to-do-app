import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const user = useSelector((state) => state.user.user);
  const userToken = user.token;
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.23:3000/project/all", {
        headers: {
          Authorization: userToken
        },
      });
      const filteredTasks = response.data.projects.filter((task) => {
        const startDate = new Date(task.startDate);
        const today = new Date();
        return (
          startDate.getDate() === today.getDate() &&
          startDate.getMonth() === today.getMonth() &&
          startDate.getFullYear() === today.getFullYear()
        );
      });

      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://192.168.1.23:3000/project/delete/${projectId}`, {
        headers: {
          Authorization: userToken,
        },
      });
      // Silme işleminden sonra verileri güncelle
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    const startDateObj = new Date(item.startDate);
    const startFormattedDate = `${startDateObj.getFullYear()}-${startDateObj.getMonth() + 1}-${startDateObj.getDate()}`;

    const startTimeObj = new Date(item.endDate);
    startTimeObj.setHours(startTimeObj.getHours() + 3); // UTC+3 dönüşümü
    const hours = startTimeObj.getUTCHours();
    const minutes = startTimeObj.getUTCMinutes();
    const startTimeFormatted = `${hours}:${minutes}`;

    return (
      <View style={styles.task} key={item._id}>
        <Text style={styles.taskTitle}>{item.projectName}</Text>
        <Text style={{ marginTop: 10 }}>{item.description}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.clock}>
            <Ionicons name="time" color="#fff" size={20} />
          </View>
          <Text style={styles.time}>{startTimeFormatted}</Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.clock}>
            <Ionicons name="calendar" color="#fff" size={20} />
          </View>
          <Text style={styles.time}>{startFormattedDate}</Text>
        </View>
      </View>
    )
  }

  const renderHiddenItem = ({ item }) => (
    <View style={styles.deleteButton}>
      <Text style={styles.deleteButtonText} onPress={() => deleteProject(item._id)}>Delete</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/bg_blur_elips.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Today's Tasks</Text>
          </View>
          <SwipeListView
            style={styles.taskContainer}
            data={tasks}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75} // Kaydırma mesafesi
            disableRightSwipe={true} // Sadece sola kaydırmayı etkinleştir
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </View>
      </SafeAreaView>
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
  taskContainer: {
    marginTop: 25,
  },
  task: {
    marginBottom: 25,
    backgroundColor: "#fff",
    shadowColor: "#003BAA",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    borderRadius: 20,
  },
  taskTitle: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  time: {
    marginLeft: 5,
    color: "#5F33E1",
    fontSize: 15,
    fontWeight: "500",
  },
  clock: {
    backgroundColor: "#5F33E1",
    borderRadius: 25,
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
  },
  deleteButtonText: {
    color: "red",
  },
});

export default TasksScreen;
