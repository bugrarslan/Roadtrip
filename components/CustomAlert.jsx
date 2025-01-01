import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { theme } from "../constants/theme";

const CustomAlert = ({ visible, onClose, title, message, buttons }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={index === 0 ? styles.buttonLight : styles.buttonDark}
                onPress={button.onPress}
              >
                <Text
                  style={
                    index === 0 ? styles.buttonTextLight : styles.buttonTextDark
                  }
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonDark: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonLight: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonTextDark: {
    color: "white",
    fontWeight: "bold",
  },
  buttonTextLight: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
