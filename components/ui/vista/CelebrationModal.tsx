import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onPlayAgain: () => void;
  onGoToMenu: () => void;
}

export default function CelebrationModal({ visible, onPlayAgain, onGoToMenu }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.celebrationOverlay}>
      <View style={styles.celebrationCard}>
        <Image
          source={require("../../../assets/images/star.png")}
          style={styles.starIcon}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onPlayAgain}>
            <Image
              source={require("../../../assets/images/play-again.png")}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onGoToMenu}>
            <Image
              source={require("../../../assets/vista/menu.png")}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  celebrationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  celebrationCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
  },
  actionButton: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  actionIcon: {
    width: 60,
    height: 60,
  },
});