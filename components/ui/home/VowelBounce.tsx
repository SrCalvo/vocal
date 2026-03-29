import { Animated, Text, StyleSheet } from "react-native"
import { useEffect, useRef } from "react"

export default function VowelBounce({ letter, style }: any) {

  const translateY = useRef(new Animated.Value(0)).current

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -15,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start()

  }, [])

  return (
    <Animated.Text
      style={[
        styles.vowel,
        style,
        { transform: [{ translateY }] }
      ]}
    >
      {letter}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  vowel:{
    position:"absolute",
    fontSize:70,
    fontWeight:"bold"
  }
})