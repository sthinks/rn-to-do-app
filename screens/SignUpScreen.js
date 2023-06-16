import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import ButtonUI from "../components/ui/ButtonUI";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ImageCropPicker from "react-native-image-crop-picker";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorHandler, setErrorHandler] = useState(null);

  const fullNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const navigation = useNavigation();

  const selectPhoto = () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
      cropping: true,
    })
      .then((image) => {
        setProfilePhoto(image);
      })
      .catch((error) => {
        console.log("Fotoğraf seçme hatası:", error);
      });
  };

  const handleSubmit = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      fullName.trim() === "" ||
      email.trim() === ""
    ) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }
    const data = {
      username: username,
      password: password,
      fullName: fullName,
      email: email,
    };
    axios
      .post("http://192.168.1.23:3000/auth/register", data)
      .then((response) => {
        // Başarılı kayıt durumu
        setErrorHandler(true);
        setError("Kaydınız başarıyla oluşturulu. Yönlendiriliyorsunuz..");
        navigation.navigate("Login");
      })
      .catch((error) => {
        // Hata durumu
        setErrorHandler(false);
        setError("Kaydınızı oluştururken bir hata oluştu.");
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
            placeholder="Fullname"
            value={fullName}
            onChangeText={(text) => setFullname(text)}
            required
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current.focus()}
            ref={fullNameInputRef}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            required
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => usernameInputRef.current.focus()}
            ref={emailInputRef}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            required
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
            ref={usernameInputRef}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            required
            autoCapitalize="none"
            returnKeyType="next"
            ref={passwordInputRef}
          />
          <Text style={errorHandler ? styles.success : styles.error}>
            {error}
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonUI
              title="Sign Up"
              transparent={true}
              onPress={handleSubmit}
            />
            <ButtonUI
              title="Already have a account? Login"
              transparent={false}
              onPress={() => navigation.navigate("Login")}
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
  error: {
    marginTop: 25,
    color: "red",
    fontSize: 24,
    fontWeight: 500,
  },
  success: {
    marginTop: 25,
    color: "green",
    fontSize: 24,
    fontWeight: 500,
  },
});

export default SignUpScreen;
