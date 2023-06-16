import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ButtonUI from "../components/ui/ButtonUI";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const [showErrorHandler, setshowErrorHandler] = useState(null);

  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter your name");
    }

    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://192.168.1.23:3000/auth/login", data)
      .then((response) => {
        // Başarılı giriş durumu
        dispatch(setUser(response.data));
        AsyncStorage.setItem('userData', JSON.stringify(response.data));
        setShowError("Başarıyla giriş yapıldı. Yönlendiriliyorsunuz...");
        setshowErrorHandler(true);
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        // Hata durumu
        setShowError("Kullacı adı veya şifre yanlış!");
        setshowErrorHandler(false);
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
        <Text style={styles.title}>Let's Get Started</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            ref={usernameInputRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            ref={passwordInputRef}
          />
          <Text
            style={
              showErrorHandler ? styles.showErrorTrue : styles.showErrorFalse
            }
          >
            {showError}
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonUI title="Login" transparent={true} onPress={handleLogin} />
            <ButtonUI
              title="Don't have an account? Sign up"
              transparent={false}
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Arka plan resmi boyutunu ayarlar (cover, contain, stretch vb.)
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  title: {
    color: "#4669b9",
    fontSize: 35,
  },
  formContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  showErrorTrue: {
    marginTop: 25,
    color: "green",
    fontSize: 24,
    fontWeight: 500,
  },
  showErrorFalse: {
    marginTop: 25,
    color: "red",
    fontSize: 24,
    fontWeight: 500,
  },
});

export default LoginScreen;
