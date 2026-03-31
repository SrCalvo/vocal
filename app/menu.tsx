import { View, Image, StyleSheet, Pressable, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";


export default function MenuScreen() {
  const router = useRouter();

  const scaleOjo = useRef(new Animated.Value(1)).current;
  const scaleOido = useRef(new Animated.Value(1)).current;
  const scaleMano = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);

  useEffect(() => {
    const createAnimation = (scale) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

    const anim1 = createAnimation(scaleOjo);
    const anim2 = createAnimation(scaleOido);
    const anim3 = createAnimation(scaleMano);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [scaleOjo, scaleOido, scaleMano]);

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

      {/* Botón Vista */}
      <Animated.View
        style={[
          styles.button,
          styles.btnVista,
          { transform: [{ scale: scaleOjo }] }
        ]}
      >
        <Pressable onPress={() => router.push("/vista")}>
          <Image
            source={require("../assets/menu/images/ojo.png")}
            style={styles.icon}
          />
        </Pressable>
      </Animated.View>

      {/* Botón Oído */}
      <Animated.View
        style={[
          styles.button,
          styles.btnOido,
          { transform: [{ scale: scaleOido }] }
        ]}
      >
        <Pressable onPress={() => router.push("/oido")}>
          <Image
            source={require("../assets/menu/images/oido.png")}
            style={styles.icon}
          />
        </Pressable>
      </Animated.View>

      {/* Botón Tacto */}
      <Animated.View
        style={[
          styles.button,
          styles.btnTacto,
          { transform: [{ scale: scaleMano }] }
        ]}
      >
        <Pressable onPress={() => router.push("/tacto")}>
          <Image
            source={require("../assets/menu/images/mano.png")}
            style={styles.icon}
          />
        </Pressable>
      </Animated.View>

      {/* Botón Casa */}
      <Pressable
        onPress={() => router.push("/")}
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

  button: {
    position: "absolute",
    width: 150,
    height: 145,
    backgroundColor: "rgba(132, 131, 129, 0.33)",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 135,
    height: 135,
  },

  iconCasa: {
    width: 100,
    height: 100,
  },

  // BOTONES
  btnVista: {
    top: "38%",
    left: "22%",
  },

  btnOido: {
    top: "37%",
    right: "22%",
  },

  btnTacto: {
    top: "38%",
    left: "41.5%",
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