import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  onLeftPress: () => void;
  onRightPress: () => void;
  leftPosition?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  rightPosition?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  buttonSize?: number | { width: number; height: number };
  leftIcon?: any;
  rightIcon?: any;
  invertLeft?: boolean;
  invertRight?: boolean;
  leftStyle?: object;
  rightStyle?: object;
  iconStyle?: object;
}

export default function NavigationButtons({
  onLeftPress,
  onRightPress,
  leftPosition = { left: "5%", top: "90%" },
  rightPosition = { right: "5%", top: "90%" },
  buttonSize = { width: 60, height: 60 },
  leftIcon = require("../../assets/images/back.png"),
  rightIcon = require("../../assets/images/back.png"),
  invertLeft = true,
  invertRight = false,
  leftStyle = {},
  rightStyle = {},
  iconStyle = {},
}: Props) {
  const size =
    typeof buttonSize === "number"
      ? { width: buttonSize, height: buttonSize }
      : buttonSize;

  return (
    <>
      <TouchableOpacity
        onPress={onLeftPress}
        style={[styles.button, leftPosition, size, leftStyle]}
        activeOpacity={0.7}
      >
        <Image
          source={leftIcon}
          style={[styles.icon, invertLeft && styles.flip, iconStyle]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onRightPress}
        style={[styles.button, rightPosition, size, rightStyle]}
        activeOpacity={0.7}
      >
        <Image
          source={rightIcon}
          style={[styles.icon, invertRight && styles.flip, iconStyle]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  icon: {
    width: "110%",
    height: "110%",
  },
  flip: {
    transform: [{ scaleX: -1 }],
  },
});