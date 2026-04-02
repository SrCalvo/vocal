import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Modal, Text } from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function VocalesScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState({ image: null, name: "" });

  // Mapeo de animales por cada vocal
  const animalData = {
    A: { image: require("../assets/images/vista/abeja.png"), name: "Abeja" },
    E: { image: require("../assets/images/vista/elefante.png"), name: "Elefante" },
    I: { image: require("../assets/images/vista/iguana.png"), name: "Iguana" },
    O: { image: require("../assets/images/vista/oso.png"), name: "Oso" },
    U: { image: require("../assets/images/vista/uva.png"), name: "Uva" },
  };

  const playSound = async (soundFile: any, vocal: string) => {
    try {
      // Mostrar modal con la imagen del animal
      const animal = animalData[vocal as keyof typeof animalData];
      if (animal) {
        setCurrentAnimal(animal);
        setModalVisible(true);
      }

      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      
      // Liberar recursos después de reproducir y cerrar modal
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          setModalVisible(false);
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      setModalVisible(false);
    }
  };

  const data = [
    { letra: require("../assets/letras/A.png"), sonido: require("../assets/sounds/abeja.mp3"), vocal: "A" },
    { letra: require("../assets/letras/E.png"), sonido: require("../assets/sounds/elefante.mp3"), vocal: "E" },
    { letra: require("../assets/letras/I.png"), sonido: require("../assets/sounds/iguana.mp3"), vocal: "I" },
    { letra: require("../assets/letras/O.png"), sonido: require("../assets/sounds/oso.mp3"), vocal: "O" },
    { letra: require("../assets/letras/U.png"), sonido: require("../assets/sounds/uva.mp3"), vocal: "U" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Image
        source={require("../assets/images/tacto-bg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.centerContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* La letra completa es táctil */}
            <TouchableOpacity 
              onPress={() => playSound(item.sonido, item.vocal)}
              activeOpacity={0.7}
              style={styles.letterContainer}
            >
              <Image source={item.letra} style={styles.letterImage} resizeMode="contain" />
            </TouchableOpacity>
            
            {/* Botón de bocina independiente */}
            <TouchableOpacity 
              onPress={() => playSound(item.sonido, item.vocal)}
              activeOpacity={0.7}
              style={styles.speakerButton}
            >
              <Image
                source={require("../assets/images/bocina.png")}
                style={styles.speakerIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/back.png")}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push("/menu")} 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/back.png")}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Modal para mostrar la imagen del animal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {currentAnimal.image && (
              <>
                <Image 
                  source={currentAnimal.image} 
                  style={styles.animalImage}
                  resizeMode="contain"
                />
                <Text style={styles.animalName}>{currentAnimal.name}</Text>
              </>
            )}
            <Text style={styles.listeningText}>🔊 Escuchando... 🔊</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  centerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: width * 0.03,
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.08,
    flex: 1,
  },

  letterContainer: {
    padding: 10,
  },

  letterImage: {
    width: width * 0.12,
    height: width * 0.12,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 120,
    maxHeight: 120,
  },

  speakerButton: {
    padding: 10,
  },

  speakerIcon: {
    width: width * 0.08,
    height: width * 0.08,
    minWidth: 35,
    minHeight: 35,
    maxWidth: 70,
    maxHeight: 70,
  },

  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  navButton: {
    width: width * 0.1,
    height: width * 0.1,
    minWidth: 40,
    minHeight: 40,
    maxWidth: 60,
    maxHeight: 60,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  navIcon: {
    width: "60%",
    height: "60%",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.7,
    minWidth: 250,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  animalImage: {
    width: width * 0.4,
    height: width * 0.4,
    minWidth: 150,
    minHeight: 150,
    maxWidth: 250,
    maxHeight: 250,
    marginBottom: 20,
  },

  animalName: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },

  listeningText: {
    fontSize: width * 0.04,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});