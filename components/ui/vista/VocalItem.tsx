import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  letra: string;
  img: any;
  isSelected: boolean;
  onPress: (letra: string, event: any) => void;
  onLayout: (letra: string, event: any) => void;
}

export default function VocalItem({ letra, img, isSelected, onPress, onLayout }: Props) {
  return (
    <TouchableOpacity
      onPress={(e) => onPress(letra, e)}
      onLayout={(e) => onLayout(letra, e)}
      style={[styles.letterCard, isSelected && styles.selectedLetterCard]}
    >
      <Image source={img} style={styles.letterImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  letterCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12,
    borderRadius: 25,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  selectedLetterCard: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.05 }],
    borderWidth: 2,
    borderColor: "#FF6B6B",
  },
  letterImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
});