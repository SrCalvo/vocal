import { View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import AnimatedButton from "../components/ui/anim/AnimatedButton";

export default function MenuScreen() {
  const router = useRouter();

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  const navigateWithSound = async (route) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/ClickSelect.mp3")
      );

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });

      setTimeout(() => {
        router.push(route);
      }, 200);
    } catch (error) {
      console.log("Error playing sound:", error);
      router.push(route);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Fondo */}
      <Image
        source={require("../assets/images/menu-bg.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Decoraciones */}
      <Image
        source={require("../assets/menu/decoration/monarca.png")}
        style={styles.monarca}
      />

      <Image
        source={require("../assets/menu/decoration/morfo.png")}
        style={styles.morfo}
      />

      <Image
        source={require("../assets/menu/decoration/huevo1.png")}
        style={styles.huevo1}
      />

      <Image
        source={require("../assets/menu/decoration/solecito.png")}
        style={styles.solecito}
      />

      <Image
        source={require("../assets/menu/decoration/huevo2.png")}
        style={styles.huevo2}
      />

      {/* Botón Vista*/}
      <AnimatedButton
        source={require("../assets/menu/images/ojo.png")}
        onPress={() => router.push("/vista")}
        customStyle={styles.btnVista}
      />

      {/* Botón Oído*/}
      <AnimatedButton
        source={require("../assets/menu/images/oido.png")}
        onPress={() => router.push("/oido")}
        customStyle={styles.btnOido}
      />

      {/* Botón Tacto*/}
      <AnimatedButton
        source={require("../assets/menu/images/mano.png")}
        onPress={() => router.push("/tacto")}
        customStyle={styles.btnTacto}
      />

      {/* Botón Casa*/}
      <Pressable
        onPress={() => navigateWithSound("/")}
        style={styles.btnCasa}
      >
        <Image
          source={require("../assets/menu/images/casa.png")}
          style={styles.iconCasa}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  iconCasa: {
    width: 100,
    height: 100,
  },

  // BOTONES
  btnVista: {
    position: "absolute",
    top: "38%",
    left: "22%",
    width: 150,
    height: 145,
  },

  btnOido: {
    position: "absolute",
    top: "37%",
    right: "22%",
    width: 150,
    height: 145,
  },

  btnTacto: {
    position: "absolute",
    top: "38%",
    left: "41.5%",
    width: 150,
    height: 145,
  },

  btnCasa: {
    position: "absolute",
    top: "78%",
    left: "44.5%",
  },

  // DECORACIONES
  monarca: {
    position: "absolute",
    top: "22%",
    left: "10%",
    width: "8%",
    height: "15%",
  },

  morfo: {
    position: "absolute",
    top: "22%",
    right: "10%",
    width: "8%",
    height: "15%",
  },

  huevo1: {
    position: "absolute",
    top: "72%",
    left: "12%",
    width: "8%",
    height: "15%",
  },

  huevo2: {
    position: "absolute",
    top: "72%",
    right: "12%",
    width: "8%",
    height: "15%",
  },

  solecito: {
    position: "absolute",
    top: "0.1%",
    left: "40.5%",
    width: "20%",
    height: "30%",
  },
});