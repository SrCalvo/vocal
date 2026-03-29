import { Pressable, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function PlayButton() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

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

  return (
    <Pressable
      onPress={() => router.push("/menu")}
      style={styles.container}
    >
      <Animated.Image
        source={require("../../../assets/index/images/play.png")}
        style={[styles.image, { transform: [{ scale }] }]}
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