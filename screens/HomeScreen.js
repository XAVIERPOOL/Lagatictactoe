import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LAGATICTACTOE</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SinglePlayer")}
      >
        <Text style={styles.buttonText}>Single Player</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MultiPlayer")}
      >
        <Text style={styles.buttonText}>Multiplayer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111", // Darker background for a retro look
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00FF00", // Classic green arcade text
    marginBottom: 30,
    fontFamily: "PressStart2P-Regular", // Pixel font
    textShadowColor: "#003300", // Retro shadow effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: "#ffcc00", // Retro yellow button
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 200,
    alignItems: "center",
    borderRadius: 2, // Blocky button for retro effect
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#ff6600", // Orange border for contrast
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "PressStart2P-Regular",
    textTransform: "uppercase",
  },
});
