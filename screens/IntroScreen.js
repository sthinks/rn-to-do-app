import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import ButtonUI from "../components/ui/ButtonUI";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/bg_blur_elips.png")}
      style={styles.backgroundImage}
    >
      <Image source={require("../assets/plant.png")} style={styles.plant} />
      <View style={styles.container}>
        <Image
          source={require("../assets/young-man.png")}
          style={styles.manImage}
        />
        <Text style={styles.title}>Now it's easier to plan</Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonUI
            title="Login"
            transparent={true}
            onPress={() => navigation.navigate("Login")}
          />
          <ButtonUI
            title="Sign Up"
            transparent={false}
            page="SignUp"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Arka plan resmi boyutunu ayarlar (cover, contain, stretch vb.)
  },
  plant: {
    position: "absolute",
    right: 0,
    top: "25%",
    width: 112,
    height: 189,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  manImage: {
    resizeMode: "contain", // Görsel boyutunu ayarlar (cover, contain, stretch vb.)
    width: 265,
    height: 456,
  },
  title: {
    color: "#4669b9",
    fontSize: 35,
  },
  subTitle: {
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 50,
  },
});

export default IntroScreen;
