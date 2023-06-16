import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonUI = ({ title, transparent, onPress }) => {
  return (
    <TouchableOpacity
      style={transparent ? styles.loginButton : styles.signUpButton}
      onPress={onPress}
    >
      <Text
        style={transparent ? styles.loginButtonText : styles.signUpButtonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#008FFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  signUpButtonText: {
    color: "#1A2744",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ButtonUI;
