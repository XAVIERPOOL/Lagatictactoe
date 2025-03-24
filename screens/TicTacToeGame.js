import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function TicTacToeGame({ route, navigation }) {
  const { mode, difficulty } = route.params || { mode: "multiplayer" };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  useEffect(() => {
    if (mode === "single" && !isXTurn && !gameOver) {
      setTimeout(() => aiMove(board, difficulty), 500);
    }
  }, [isXTurn, gameOver, board, mode, difficulty]);

  function handlePress(index) {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    const isDraw = checkDraw(newBoard);

    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
      setGameOver(true);
      updateScore(winner);
    } else if (isDraw) {
      setGameStatus("It's a draw!");
      setGameOver(true);
      updateScore("draw");
    } else {
      setIsXTurn(!isXTurn);
      setGameStatus(`Player ${!isXTurn ? "X" : "O"}'s turn`);
    }
  }

  function updateScore(result) {
    if (result === "draw") {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setScores(prev => ({ ...prev, [result]: prev[result] + 1 }));
    }
  }

  function aiMove(currentBoard, aiDifficulty) {
    if (gameOver) return;

    let move;
    
    switch (aiDifficulty) {
      case "hard":
        move = getBestMove(currentBoard);
        break;
      case "medium":
        // 70% chance to make the best move, 30% chance to make a random move
        if (Math.random() < 0.7) {
          move = getBestMove(currentBoard);
        } else {
          move = getRandomMove(currentBoard);
        }
        break;
      case "easy":
      default:
        move = getRandomMove(currentBoard);
        break;
    }

    if (move !== null) {
      const newBoard = [...currentBoard];
      newBoard[move] = "O";
      setBoard(newBoard);
      
      const winner = checkWinner(newBoard);
      const isDraw = checkDraw(newBoard);

      if (winner) {
        setGameStatus(`Player ${winner} wins!`);
        setGameOver(true);
        updateScore(winner);
      } else if (isDraw) {
        setGameStatus("It's a draw!");
        setGameOver(true);
        updateScore("draw");
      } else {
        setIsXTurn(true);
        setGameStatus("Player X's turn");
      }
    }
  }

  function getRandomMove(currentBoard) {
    const availableMoves = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
    
    if (availableMoves.length === 0) return null;
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  function getBestMove(currentBoard) {
    // Minimax algorithm for optimal move
    const availableMoves = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
    
    if (availableMoves.length === 0) return null;
    
    // Try to win first
    for (let i of availableMoves) {
      const boardCopy = [...currentBoard];
      boardCopy[i] = "O";
      if (checkWinner(boardCopy) === "O") {
        return i;
      }
    }
    
    // Block player from winning
    for (let i of availableMoves) {
      const boardCopy = [...currentBoard];
      boardCopy[i] = "X";
      if (checkWinner(boardCopy) === "X") {
        return i;
      }
    }
    
    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }
    
    // Take corners if available
    const corners = [0, 2, 6, 8].filter(index => availableMoves.includes(index));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
    
    // Take sides if available
    const sides = [1, 3, 5, 7].filter(index => availableMoves.includes(index));
    if (sides.length > 0) {
      return sides[Math.floor(Math.random() * sides.length)];
    }
    
    return availableMoves[0];
  }

  function checkWinner(currentBoard) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    
    return null;
  }

  function checkDraw(currentBoard) {
    return !currentBoard.includes(null) && !checkWinner(currentBoard);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameStatus("Player X's turn");
    setGameOver(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.modeText}>
        {mode === "single" ? `Single Player (${difficulty})` : "Multiplayer"}
      </Text>
      
      <Text style={styles.statusText}>{gameStatus}</Text>
      
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              cell === "X" ? styles.xCell : cell === "O" ? styles.oCell : null,
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>X: {scores.X}</Text>
        <Text style={styles.scoreText}>Draws: {scores.draws}</Text>
        <Text style={styles.scoreText}>O: {scores.O}</Text>
      </View>
      
      {gameOver && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111", // Dark arcade background
    padding: 20,
  },
  modeText: {
    fontSize: 14,
    color: "#FFA500", // Retro orange
    marginBottom: 10,
    fontFamily: "PressStart2P-Regular",
    textTransform: "uppercase",
    textAlign: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00FF00", // Bright neon green
    marginBottom: 20,
    fontFamily: "PressStart2P-Regular",
    textAlign: "center",
  },
  board: {
    width: 312, // Ensures perfect alignment (3 * 102px)
    height: 312,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 4,
    borderColor: "#FFD700", // Golden outline
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#FF4500", // Orange-red border
    justifyContent: "center",
    alignItems: "center",
  },
  xCell: {
    backgroundColor: "#0033FF", // Deep blue for X
  },
  oCell: {
    backgroundColor: "#FF0000", // Bright red for O
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFF00", // Neon yellow
    fontFamily: "PressStart2P-Regular",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 14,
    color: "#FFD700", // Golden color
    fontWeight: "bold",
    fontFamily: "PressStart2P-Regular",
    textTransform: "uppercase",
  },
  resetButton: {
    backgroundColor: "#FF1493", // Retro neon pink
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 220,
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 4,
    borderColor: "#8B0000", // Dark red border
    shadowColor: "#222",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#555", // Dark gray
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 220,
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 4,
    borderColor: "#AAA",
    shadowColor: "#111",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
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
