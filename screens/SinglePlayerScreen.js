import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SinglePlayerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Difficulty</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TicTacToeGame", {
            mode: "single",
            difficulty: "easy",
          })
        }
      >
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TicTacToeGame", {
            mode: "single",
            difficulty: "medium",
          })
        }
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TicTacToeGame", {
            mode: "single",
            difficulty: "hard",
          })
        }
      >
        <Text style={styles.buttonText}>Hard</Text>
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
    color: "#00FF00", // Neon green text
    marginBottom: 30,
    fontFamily: "PressStart2P-Regular", // Retro pixel font
    textTransform: "uppercase",
    textShadowColor: "#003300", // Adds a pixelated shadow effect
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ffcc00", // Classic arcade yellow
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 220,
    alignItems: "center",
    borderRadius: 2, // No rounded edges for a blocky pixel feel
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#ff6600", // Orange border for contrast
    shadowColor: "#222",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
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
    shadowColor: "#111",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "PressStart2P-Regular", // Retro arcade font
    textTransform: "uppercase",
    textAlign: "center",
  },
});
