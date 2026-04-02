import { Pressable, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

export default function PlayButton() {
  const router = useRouter();

  const scale = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
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

    animation.start();
    return () => animation.stop();
  }, []);

  const playSoundAndNavigate = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/ClickSelect.mp3")
    );

    await sound.playAsync();

    setTimeout(() => {
      router.push("/menu");
    }, 250);
  };

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      friction: 3,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={playSoundAndNavigate}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      <Animated.Image
        source={require("../../../assets/index/images/play.png")}
        style={[
          styles.image,
          {
            transform: [
              { scale },        // animación continua
              { scale: pressScale }, // rebote al tocar
            ],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 220,
  },
});