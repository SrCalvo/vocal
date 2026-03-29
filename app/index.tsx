import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import PlayButton from "../components/ui/home/PlayButton";
import VowelButton from "../components/ui/home/VowelButton";

export default function Home() {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  const vowels = [
    { letter: "A", img: require("../assets/index/vowels/A.png"), style: styles.vowelA },
    { letter: "E", img: require("../assets/index/vowels/E.png"), style: styles.vowelE },
    { letter: "I", img: require("../assets/index/vowels/I.png"), style: styles.vowelI },
    { letter: "O", img: require("../assets/index/vowels/O.png"), style: styles.vowelO },
    { letter: "U", img: require("../assets/index/vowels/U.png"), style: styles.vowelU },
  ];

  const decorations = [
    { img: require("../assets/index/images/ardilla.png"), style: styles.ardilla },
    { img: require("../assets/index/images/tronco.png"), style: styles.tronco },
    { img: require("../assets/index/images/conejo.png"), style: styles.conejo },
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../assets/images/meadow.png")}
        style={styles.background}
        resizeMode="cover"
        pointerEvents="none"
      />

      {vowels.map(({ letter, img, style }) => (
        <VowelButton
          key={letter}
          source={img}
          style={style}
          onPress={() => console.log(letter)}
        />
      ))}

      {decorations.map(({ img, style }, index) => (
        <Image key={index} source={img} style={style} />
      ))}

      <PlayButton style={styles.playButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  playButton: {
    position: "absolute",
    bottom: "-5%",
    width: 80,
    height: 120,
    alignSelf: "center",
    zIndex: 10,
  },

  vowelBase: {
    position: "absolute",
    width: "20%",
    height: "100%",
  },

  vowelA: {
    position: "absolute",
    top: "5%",
    left: "2%",
    width: "20%",
    height: "100%",
  },

  vowelE: {
    position: "absolute",
    top: "-20%",
    left: "15%",
    width: "20%",
    height: "100%",
  },

  vowelI: {
    position: "absolute",
    bottom: "30%",
    left: "40%",
    width: "20%",
    height: "100%",
  },

  vowelO: {
    position: "absolute",
    top: "-20%",
    left: "65%",
    width: "20%",
    height: "100%",
  },

  vowelU: {
    position: "absolute",
    top: "5%",
    right: "2%",
    width: "20%",
    height: "100%",
  },

  ardilla: {
    position: "absolute",
    bottom: "8%",
    left: "20%",
    width: "15%",
    height: "40%",
  },

  tronco: {
    position: "absolute",
    top: "60%",
    bottom: "8%",
    right: "40%",
    width: "20%",
    height: "50%",
  },

  conejo: {
    position: "absolute",
    bottom: "8%",
    right: "20%",
    width: "15%",
    height: "50%",
    transform: [{ scaleX: -1 }],
  },
});