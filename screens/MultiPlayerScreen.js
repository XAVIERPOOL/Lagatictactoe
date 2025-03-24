import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MultiPlayerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multiplayer</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TicTacToeGame", {
            mode: "multiplayer",
          })
        }
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111", // Dark CRT-like background
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FF00", // Classic neon green text
    marginBottom: 30,
    fontFamily: "PressStart2P-Regular", // Retro pixel font
    textTransform: "uppercase",
    textShadowColor: "#003300", // Adds a pixelated shadow effect
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: "#ffcc00", // Classic arcade-style yellow
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 220,
    alignItems: "center",
    borderRadius: 2, // No rounded edges for a blocky pixel feel
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#ff6600", // Orange border for contrast
  },
  backButton: {
    backgroundColor: "#555", // Darker gray for a retro look
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 220,
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 4,
    borderColor: "#aaa", // Light gray border
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "PressStart2P-Regular",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
