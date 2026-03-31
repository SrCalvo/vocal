import { Pressable, Image, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function AnimatedButton({ source, onPress, customStyle }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
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
  }, [scale]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, customStyle]}>
      <Pressable onPress={onPress} style={styles.button}>
        <Image source={source} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 110,
    height: 110,
    backgroundColor: "rgba(132, 131, 129, 0.33)",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 115,
    height: 115,
  },
});