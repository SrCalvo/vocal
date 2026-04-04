// VocalCard.tsx
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function VocalCard({ 
  letra, 
  sonido, 
  vocal, 
  onPress,
  cardStyle, // Este debe incluir position: 'absolute'
  letterStyle, 
  speakerStyle 
}: any) {
  return (
    <View style={[styles.card, cardStyle]}>
      <TouchableOpacity
        onPress={() => onPress(sonido, vocal)}
        activeOpacity={0.7}
        style={[styles.letterContainer, letterStyle]}
      >
        <Image source={letra} style={styles.letterImage} resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPress(sonido, vocal)}
        activeOpacity={0.7}
        style={[styles.speakerButton, speakerStyle]}
      >
        <Image
          source={require("../../../assets/images/bocina.png")}
          style={styles.speakerIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  letterContainer: {
    width: width * 0.15,
    height: height * 0.25,
  },
  letterImage: {
    width: "100%",
    height: "100%",
  },
  speakerButton: {
    width: 50,
    height: 50,
  },
  speakerIcon: {
    width: "100%",
    height: "100%",
  },
});