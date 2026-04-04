// components/ui/NavigationButtons.tsx
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface NavigationButtonsProps {
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
  leftIcon?: any; // Icono personalizado para izquierda
  rightIcon?: any; // Icono personalizado para derecha
  invertLeft?: boolean; // Si invertir el icono izquierdo
  invertRight?: boolean; // Si invertir el icono derecho
  leftButtonStyle?: object;
  rightButtonStyle?: object;
  iconStyle?: object;
}

export default function NavigationButtons({ 
  onLeftPress, 
  onRightPress,
  leftPosition = { left: "5%", top: "50%" },
  rightPosition = { right: "5%", top: "50%" },
  buttonSize = { width: 60, height: 60 },
  leftIcon = require("../../assets/images/back.png"),
  rightIcon = require("../../assets/images/back.png"),
  invertLeft = true,  // Por defecto invierte el izquierdo
  invertRight = false, // Por defecto no invierte el derecho
  leftButtonStyle = {},
  rightButtonStyle = {},
  iconStyle = {}
}: NavigationButtonsProps) {
  
  // Manejar diferentes formatos de buttonSize
  const getButtonSize = () => {
    if (typeof buttonSize === 'number') {
      return { width: buttonSize, height: buttonSize };
    }
    return buttonSize;
  };

  const size = getButtonSize();

  return (
    <>
      {/* Botón izquierdo */}
      <TouchableOpacity 
        onPress={onLeftPress} 
        style={[
          styles.button, 
          leftPosition, 
          size, 
          leftButtonStyle
        ]}
        activeOpacity={0.7}
      >
        <Image 
          source={leftIcon} 
          style={[
            styles.icon, 
            invertLeft && styles.inverted,
            iconStyle
          ]} 
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Botón derecho */}
      <TouchableOpacity 
        onPress={onRightPress} 
        style={[
          styles.button, 
          rightPosition, 
          size, 
          rightButtonStyle
        ]}
        activeOpacity={0.7}
      >
        <Image 
          source={rightIcon} 
          style={[
            styles.icon, 
            invertRight && styles.inverted,
            iconStyle
          ]} 
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
    width: "100%",
    height: "100%",
  },
  inverted: {
    transform: [{ scaleX: -1 }]
  },
});