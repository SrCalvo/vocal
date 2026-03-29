import { View, Image, StyleSheet, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

export default function MenuScreen(){
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }, []);
  const router = useRouter()

  return(
    <View style={styles.container}>

      {/* Fondo */}
      <Image
        source={require("../assets/images/menu-bg.png")}
        style={styles.background}
      />

      {/* BOTONES CENTRALES */}
      <View style={styles.centerContainer}>

        {/* 👁 Vista */}
        <Pressable 
          onPress={() => router.push("/vista")}
          style={styles.button}
        >
          <Image 
            source={require("../assets/icons/ojo.png")} 
            style={styles.icon}
          />
        </Pressable>

        {/* 👂 Oído */}
        <Pressable 
          onPress={() => router.push("/oido")}
          style={styles.button}
        >
          <Image 
            source={require("../assets/icons/oido.png")} 
            style={styles.icon}
          />
        </Pressable>

        {/* ✋ Tacto */}
        <Pressable 
          onPress={() => router.push("/tacto")}
          style={styles.button}
        >
          <Image 
            source={require("../assets/icons/mano.png")} 
            style={styles.icon}
          />
        </Pressable>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  background:{
    position:"absolute",
    width:"100%",
    height:"100%"
  },

  centerContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:40
  },

  button:{
    width:150,
    height:150,
    backgroundColor:"rgba(253, 253, 253, 0.41)",
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center" 
  },

  icon:{
    width:115,
    height:115,
  }

})