import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  letra: any;
  sonido: any;
  vocal: string;
  onPress: (sonido: any, vocal: string) => void;
  cardStyle?: object;
  letterStyle?: object;
  speakerStyle?: object;
}

export default function VocalCard({
  letra,
  sonido,
  vocal,
  onPress,
  cardStyle,
  letterStyle,
  speakerStyle,
}: Props) {
  return (
    <View style={[styles.card, cardStyle]}>
      <TouchableOpacity
        onPress={() => onPress(sonido, vocal)}
        activeOpacity={0.7}
        style={[styles.letterBox, letterStyle]}
      >
        <Image source={letra} style={styles.letter} resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPress(sonido, vocal)}
        activeOpacity={0.7}
        style={[styles.speakerBox, speakerStyle]}
      >
        <Image
          source={require("../../../assets/images/bocina.png")}
          style={styles.speaker}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: "20%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  letterBox: {
    width: width * 0.15,
    height: height * 0.25,
  },
  letter: {
    width: "100%",
    height: "100%",
  },
  speakerBox: {
    width: 50,
    height: 50,
  },
  speaker: {
    width: "100%",
    height: "100%",
  },
});