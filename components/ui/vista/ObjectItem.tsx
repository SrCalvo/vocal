import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  obj: any;
  onPress: (obj: any, event: any) => void;
  onLayout: (obj: any, event: any) => void;
}

export default function ObjectItem({ obj, onPress, onLayout }: Props) {
  return (
    <TouchableOpacity
      onPress={(e) => onPress(obj, e)}
      onLayout={(e) => onLayout(obj, e)}
      style={styles.objectCard}
    >
      <Image source={obj.img} style={styles.objectImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  objectCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12,
    borderRadius: 25,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  objectImage: {
    width: 85,
    height: 85,
    resizeMode: "contain",
  },
});