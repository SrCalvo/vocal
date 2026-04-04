import { Modal, View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function AnimalModal({ visible, animal, onClose }: any) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          {animal?.image && (
            <>
              <Image source={animal.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.name}>{animal.name}</Text>
            </>
          )}
          <Text style={styles.text}></Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(2, 2, 2, 0.3)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    width: width * 0.7,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  name: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: {
    marginTop: 1,
    color: "rgb(216, 130, 130)fff",
  },
});