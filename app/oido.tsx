// app/oido.tsx (o donde tengas OidoScreen)
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter } from 'expo-router'; // Si usas Expo Router
// import { useNavigation } from '@react-navigation/native'; // Si usas React Navigation

import VocalCard from "../components/ui/oido/VocalCard";
import AnimalModal from "../components/ui/oido/AnimalModal";
import NavigationButtons from "../components/ui/NavigationButtons";
import { useSound } from "../components/ui/oido/useSound";
import { vocales, animalData } from "../components/ui/oido/data";

const { width, height } = Dimensions.get("window");

export default function OidoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState<any>(null);
  
  // Para Expo Router
  const router = useRouter();
  
  // Para React Navigation estándar:
  // const navigation = useNavigation();

  const { play } = useSound();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const handlePress = (soundFile: any, vocal: string) => {
    const animal = animalData[vocal];
    setCurrentAnimal(animal);
    setModalVisible(true);
    play(soundFile, () => setModalVisible(false));
  };

  // Funciones de navegación
  const goToMenu = () => {
    router.push('/menu'); // Expo Router
    // navigation.navigate('Menu'); // React Navigation estándar
  };

  const goToNextScreen = () => {
    // Por ejemplo, ir a la siguiente actividad
    router.push('/tacto'); // O donde quieras
  };

  // Posiciones personalizadas
  const positions = {
    A: { position: 'absolute', top: "50%", left: "10%" },
    E: { position: 'absolute', top: "35%", left: "30%" },
    I: { position: 'absolute', top: "50%", left: "48%" },
    O: { position: 'absolute', top: "35%", right: "30%" },
    U: { position: 'absolute', top: "50%", right: "10%" },
  };

  // Tamaños personalizados para cada letra
  const letterSizes = {
    A: { width: width * 0.12, height: width * 0.12 },
    E: { width: width * 0.12, height: width * 0.12 },
    I: { width: width * 0.12, height: width * 0.12 },
    O: { width: width * 0.12, height: width * 0.12 },
    U: { width: width * 0.12, height: width * 0.12 },
  };

  // Posiciones personalizadas para cada bocina
  const speakerPositions = {
    A: { marginTop: height * 0.02 },
    E: { marginTop: height * 0.02 },
    I: { marginTop: height * 0.02 },
    O: { marginTop: height * 0.02 },
    U: { marginTop: height * 0.02 },
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../assets/images/tacto-bg.png")}
        style={styles.background}
      />

      <View style={styles.absoluteContainer}>
        <VocalCard
          {...vocales[0]}
          onPress={handlePress}
          cardStyle={positions.A}
          letterStyle={letterSizes.A}
          speakerStyle={speakerPositions.A}
        />

        <VocalCard
          {...vocales[1]}
          onPress={handlePress}
          cardStyle={positions.E}
          letterStyle={letterSizes.E}
          speakerStyle={speakerPositions.E}
        />

        <VocalCard
          {...vocales[2]}
          onPress={handlePress}
          cardStyle={positions.I}
          letterStyle={letterSizes.I}
          speakerStyle={speakerPositions.I}
        />

        <VocalCard
          {...vocales[3]}
          onPress={handlePress}
          cardStyle={positions.O}
          letterStyle={letterSizes.O}
          speakerStyle={speakerPositions.O}
        />

        <VocalCard
          {...vocales[4]}
          onPress={handlePress}
          cardStyle={positions.U}
          letterStyle={letterSizes.U}
          speakerStyle={speakerPositions.U}
        />
      </View>

      {/* Botones de navegación */}
      <NavigationButtons
        onLeftPress={goToMenu}  // Botón izquierdo va al menú
        onRightPress={goToNextScreen}  // Botón derecho va a siguiente pantalla
        leftPosition={{ left: "3%", top: "45%" }}
        rightPosition={{ right: "3%", top: "45%" }}
        buttonSize={55}
      />

      <AnimalModal
        visible={modalVisible}
        animal={currentAnimal}
        onClose={() => setModalVisible(false)}
        modalWidth={"70%"}
        imageSize={"40%"}
        fontSize={"8%"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: "absolute",
    width: "100%",
    height: "110%",
    top: 0,
  },
  absoluteContainer: {
    flex: 1,
    position: "relative",
  },
});