import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter } from "expo-router";

import VocalCard from "../components/ui/oido/VocalCard";
import AnimalModal from "../components/ui/oido/AnimalModal";
import NavigationButtons from "../components/ui/NavigationButtons";
import { useSound } from "../components/ui/oido/useSound";
import { vocales, animalData } from "../components/ui/oido/data";

const { height } = Dimensions.get("window");

export default function OidoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

  const router = useRouter();
  const { play } = useSound();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const handlePress = (soundFile: any, vocal: string) => {
    const animal = animalData[vocal];
    setSelectedAnimal(animal);
    setModalVisible(true);
    play(soundFile, () => setModalVisible(false));
  };

  const goToMenu = () => {
    router.push("/menu");
  };

  const goToNext = () => {
    router.push("/tacto");
  };

  const positions = {
    A: { position: "absolute", top: "40%", left: "5%" },
    E: { position: "absolute", top: "25%", left: "25%" },
    I: { position: "absolute", top: "40%", left: "40%" },
    O: { position: "absolute", top: "25%", right: "25%" },
    U: { position: "absolute", top: "40%", right: "5%" },
  };

  const sizes = {
    A: { width: "90%", height: "95%" },
    E: { width: "90%", height: "95%" },
    I: { width: "90%", height: "95%" },
    O: { width: "90%", height: "95%" },
    U: { width: "90%", height: "95%" },
  };

  const speakerOffsets = {
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
        source={require("../assets/images/oido-bg.png")}
        style={styles.background}
      />

      <View style={styles.absoluteContainer}>
        <VocalCard
          {...vocales[0]}
          onPress={handlePress}
          cardStyle={positions.A}
          letterStyle={sizes.A}
          speakerStyle={speakerOffsets.A}
        />

        <VocalCard
          {...vocales[1]}
          onPress={handlePress}
          cardStyle={positions.E}
          letterStyle={sizes.E}
          speakerStyle={speakerOffsets.E}
        />

        <VocalCard
          {...vocales[2]}
          onPress={handlePress}
          cardStyle={positions.I}
          letterStyle={sizes.I}
          speakerStyle={speakerOffsets.I}
        />

        <VocalCard
          {...vocales[3]}
          onPress={handlePress}
          cardStyle={positions.O}
          letterStyle={sizes.O}
          speakerStyle={speakerOffsets.O}
        />

        <VocalCard
          {...vocales[4]}
          onPress={handlePress}
          cardStyle={positions.U}
          letterStyle={sizes.U}
          speakerStyle={speakerOffsets.U}
        />
      </View>

      <NavigationButtons
        onLeftPress={goToMenu}
        onRightPress={goToMenu}
        leftPosition={{ left: "3%", top: "80%" }}
        rightPosition={{ right: "3%", top: "80%" }}
        buttonSize={70}
      />

      <AnimalModal
        visible={modalVisible}
        animal={selectedAnimal}
        onClose={() => setModalVisible(false)}
        modalWidth={"70%"}
        imageSize={"40%"}
        fontSize={"8%"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  absoluteContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});