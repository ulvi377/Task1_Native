import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Task1_Native() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState(false);

  function playMove(index: number) {
    if (board[index] || winner || draw) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    const winningLine = WINNING_LINES.find(([a, b, c]) =>
      updatedBoard[a] &&
      updatedBoard[a] === updatedBoard[b] &&
      updatedBoard[a] === updatedBoard[c]
    );

    setBoard(updatedBoard);

    if (winningLine) {
      setWinner(currentPlayer);
    } else if (updatedBoard.every((cell) => cell !== null)) {
      setDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setDraw(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.subtitle}>X ve O ile novbe ile oyna</Text>

      <View style={styles.statusBox}>
        <Text style={styles.status}>
          {winner ? `${winner} qalib oldu!` : draw ? "Beraberlik!" : `Novbe: ${currentPlayer}`}
        </Text>
      </View>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              cell === "X" && styles.xCell,
              cell === "O" && styles.oCell,
            ]}
            onPress={() => playMove(index)}
            activeOpacity={0.75}
          >
            <Text style={[styles.cellText, cell === "X" ? styles.xText : styles.oText]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.restartButton} onPress={restartGame} activeOpacity={0.8}>
        <Text style={styles.restartText}>Yeniden oyna</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#172554",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 8,
    marginBottom: 30,
  },
  statusBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginBottom: 22,
    elevation: 2,
  },
  status: {
    color: "#1E293B",
    fontSize: 19,
    fontWeight: "700",
  },
  board: {
    width: 312,
    height: 312,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  xCell: {
    backgroundColor: "#DBEAFE",
  },
  oCell: {
    backgroundColor: "#FCE7F3",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "800",
  },
  xText: {
    color: "#2563EB",
  },
  oText: {
    color: "#DB2777",
  },
  restartButton: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 28,
  },
  restartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
