import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  Modal,
  Alert
} from "react-native";

import Login from "./login";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(true);

  const onPress = () => {
    navigation.navigate("Order");
  };

  const handleLogin = (username, password) => {
    console.log(username, password);
    if (username !== "user" || password !== "123456") {
      Alert.alert("OOPS!", "Username or password is invalid", [
        { text: "Understood", onPress: () => console.log("Alert closed") }
      ]);
    } else {
      setModalOpen(false);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Modal visible={modalOpen} animationType="slide">
        <Login handleLogin={handleLogin} />
      </Modal>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Order</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 24,
    width: 100,
    backgroundColor: "#f01d71",
    marginTop:5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center"
  }
});
