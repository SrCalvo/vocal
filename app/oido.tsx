import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router"; 

export default function VocalesScreen() {

  const router = useRouter(); 

  const playSound = async (soundFile: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const data = [
    {
      letra: require("../assets/letras/A.png"),
      sonido: require("../assets/sounds/abeja.mp3"),
    },
    {
      letra: require("../assets/letras/E.png"),
      sonido: require("../assets/sounds/elefante.mp3"),
    },
    {
      letra: require("../assets/letras/I.png"),
      sonido: require("../assets/sounds/iguana.mp3"),
    },
    {
      letra: require("../assets/letras/O.png"),
      sonido: require("../assets/sounds/oso.mp3"),
    },
    {
      letra: require("../assets/letras/U.png"),
      sonido: require("../assets/sounds/uva.mp3"),
    },
  ];

  return (
    <View style={styles.container}>

      <Image
        source={require("../assets/images/vista-bg.png")}
        style={styles.background}
      />

      <View style={styles.centerContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            
            <Image source={item.letra} style={styles.image} />

            <TouchableOpacity onPress={() => playSound(item.sonido)}>
              <Image
                source={require("../assets/images/bocina.png")}
                style={styles.button}
              />
            </TouchableOpacity>

          </View>
        ))}
      </View>

      <View style={styles.bottomBar}>

        <TouchableOpacity onPress={() => router.push("/menu")}> {/* 👈 Cambio: router.push */}
          <Image
            source={require("../assets/images/back.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/menu")}> {/* 👈 Cambio: router.push */}
          <Image
            source={require("../assets/images/back.png")}
            style={[styles.navIcon, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  centerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },

  card: {
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  button: {
    width: 40,
    height: 40,
  },

  bottomBar: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },

  navIcon: {
    width: 60,
    height: 60,
  },
});