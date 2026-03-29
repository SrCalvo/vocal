import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  PanResponder,
} from "react-native";
import { useState, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Letras
const letras = {
  Ag: require("../assets/letras/Ag.png"),
  Eg: require("../assets/letras/Eg.png"),
  Ig: require("../assets/letras/Ig.png"),
  Og: require("../assets/letras/Og.png"),
  Ug: require("../assets/letras/Ug.png"),
  Ac: require("../assets/letras/Ac.png"),
  Ec: require("../assets/letras/Ec.png"),
  Ic: require("../assets/letras/Ic.png"),
  Oc: require("../assets/letras/Oc.png"),
  Uc: require("../assets/letras/Uc.png"),
};

//  Sonidos
const sonidos = {
  Ag: require("../assets/sounds/a.mp3"),
  Eg: require("../assets/sounds/e.mp3"),
  Ig: require("../assets/sounds/i.mp3"),
  Og: require("../assets/sounds/o.mp3"),
  Ug: require("../assets/sounds/u.mp3"),
  Ac: require("../assets/sounds/a.mp3"),
  Ec: require("../assets/sounds/e.mp3"),
  Ic: require("../assets/sounds/i.mp3"),
  Oc: require("../assets/sounds/o.mp3"),
  Uc: require("../assets/sounds/u.mp3"),
};

export default function Tacto() {
  const router = useRouter();
  const [inicio, setInicio] = useState(false);
  const [index, setIndex] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef("");

  const lista = ["Ag", "Eg", "Ig", "Og", "Ug", "Ac", "Ec", "Ic", "Oc", "Uc"];
  const letraActual = lista[index];

  // reproducir sonido
  const playSound = async (letra: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(sonidos[letra]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Error reproduciendo sonido:", error);
    }
  };

  // dibujar con pincel más grande
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPath.current = `M ${locationX} ${locationY}`;
        setPaths((prev) => [...prev, currentPath.current]);
      },

      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPath.current += ` L ${locationX} ${locationY}`;
        setPaths((prev) => {
          const newPaths = [...prev];
          newPaths[newPaths.length - 1] = currentPath.current;
          return newPaths;
        });
      },

      onPanResponderRelease: () => {
        currentPath.current = "";
      },
    })
  ).current;

  const siguiente = () => {
    if (index < lista.length - 1) {
      const nuevo = index + 1;
      setIndex(nuevo);
      setPaths([]);
      playSound(lista[nuevo]);
    }
  };

  const borrar = () => setPaths([]);

  // PANTALLA INICIO
  if (!inicio) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/fondo.png")}
          style={styles.backgroundImage}
        />

        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            setInicio(true);
            playSound("Ag");
          }}
        >
          <View style={styles.center}>
            <Image
              source={require("../assets/images/start.png")}
              style={styles.btnstart}
            />
          </View>
        </TouchableOpacity>

      </View>
    );
  }

  // JUEGO
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/fondo.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.drawingArea} {...panResponder.panHandlers}>
        <View style={styles.letterContainer}>
          <Image
            source={letras[letraActual]}
            style={styles.letterImage}
            resizeMode="contain"
            pointerEvents="none"
          />
        </View>

        <Svg style={styles.svgContainer} pointerEvents="none">
          {paths.map((p, i) => (
            <Path
              key={i}
              d={p}
              stroke="#00060c"
              strokeWidth={30}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={borrar}>
          <Image
            source={require("../assets/images/clear.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={siguiente}>
          <Image
            source={require("../assets/images/back.png")}
            style={[styles.navIcon, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/menu")}
      >
        <Image
          source={require("../assets/images/back.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {index + 1} / {lista.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E1",
  },
  fullScreen: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnstart: {
    width: 200,
    height: 80,
    resizeMode: "contain",
  },
  drawingArea: {
    flex: 1,
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  letterContainer: {
    position: "absolute",
    width: width * 0.5,
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -(width * 0.5) / 2 },
      { translateY: -(height * 0.4) / 2 },
    ],
  },
  letterImage: {
    width: "150%",
    height: "150%",
    resizeMode: "contain",
    opacity: 0.8,
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  bottomBar: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    zIndex: 10,
  },
  navIcon: {
    width: 60,
    height: 60,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  counter: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10,
  },
  counterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});