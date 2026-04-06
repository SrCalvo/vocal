import { View, Image, StyleSheet } from "react-native";

interface Props {
  connections: any[];
}

export default function ConnectionDots({ connections }: Props) {
  const getDotsBetween = (start: any, end: any) => {
    if (!start || !end) return [];

    const dots = [];
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const numDots = Math.floor(distance / 20);

    for (let i = 0; i <= numDots; i++) {
      const t = i / numDots;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      dots.push({ x, y });
    }

    return dots;
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {connections.map((conn, index) => {
        const dots = getDotsBetween(conn.letterPosition, conn.objectPosition);
        return dots.map((dot, dotIndex) => (
          <Image
            key={`${index}-${dotIndex}`}
            source={require("../../../assets/vista/dot.png")}
            style={[
              styles.dot,
              {
                position: "absolute",
                left: dot.x - 6,
                top: dot.y - 6,
              },
            ]}
          />
        ));
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
});