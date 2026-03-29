import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

const letterImages = {
  A: require("../assets/images/vista/a.png"),
  E: require("../assets/images/vista/e.png"),
  I: require("../assets/images/vista/i.png"),
  O: require("../assets/images/vista/o.png"),
  U: require("../assets/images/vista/u.png"),
};

export default function JuegoUnirScreen() {

  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [connections, setConnections] = useState([]);
  const [letters, setLetters] = useState([]);
  const [objects, setObjects] = useState([]);
  const [letterPositions, setLetterPositions] = useState({});
  const [objectPositions, setObjectPositions] = useState({});
  
  const allData = {
    A: [
      { name: "abeja", sound: require("../assets/sounds/abeja.mp3"), img: require("../assets/images/vista/abeja.png") },
      { name: "avion", sound: require("../assets/sounds/avion.mp3"), img: require("../assets/images/vista/avion.png") },
      { name: "arbol", sound: require("../assets/sounds/arbol.mp3"), img: require("../assets/images/vista/arbol.png") }
    ],
    E: [
      { name: "elefante", sound: require("../assets/sounds/elefante.mp3"), img: require("../assets/images/vista/elefante.png") },
      { name: "estrella", sound: require("../assets/sounds/estrella.mp3"), img: require("../assets/images/vista/estrella.png") },
      { name: "espejo", sound: require("../assets/sounds/espejo.mp3"), img: require("../assets/images/vista/espejo.png") }
    ],
    I: [
      { name: "iguana", sound: require("../assets/sounds/iguana.mp3"), img: require("../assets/images/vista/iguana.png") },
      { name: "isla", sound: require("../assets/sounds/isla.mp3"), img: require("../assets/images/vista/isla.png") },
      { name: "iman", sound: require("../assets/sounds/iman.mp3"), img: require("../assets/images/vista/iman.png") }
    ],
    O: [
      { name: "oso", sound: require("../assets/sounds/oso.mp3"), img: require("../assets/images/vista/oso.png") },
      { name: "oveja", sound: require("../assets/sounds/oveja.mp3"), img: require("../assets/images/vista/oveja.png") },
      { name: "ojo", sound: require("../assets/sounds/ojo.mp3"), img: require("../assets/images/vista/ojo.png") }
    ],
    U: [
      { name: "uva", sound: require("../assets/sounds/uva.mp3"), img: require("../assets/images/vista/uva.png") },
      { name: "uniforme", sound: require("../assets/sounds/uniforme.mp3"), img: require("../assets/images/vista/uniforme.png") },
      { name: "uñas", sound: require("../assets/sounds/uñas.mp3"), img: require("../assets/images/vista/uñas.png") }
    ]
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newLetters = [];
    const newObjects = [];
    
    const vocales = ["A", "E", "I", "O", "U"];
    const selectedVocales = vocales.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    selectedVocales.forEach(vocal => {
      const items = allData[vocal];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      newLetters.push({ 
        letra: vocal, 
        img: letterImages[vocal]
      });
      newObjects.push({ ...randomItem, letra: vocal });
    });
    
    const shuffledObjects = [...newObjects];
    for (let i = shuffledObjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledObjects[i], shuffledObjects[j]] = [shuffledObjects[j], shuffledObjects[i]];
    }
    
    setLetters(newLetters);
    setObjects(shuffledObjects);
    setConnections([]);
    setLetterPositions({});
    setObjectPositions({});
    setSelectedLetter(null);
  };

  const playSound = async (soundFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLetterPress = (letra, event) => {
    setSelectedLetter(letra);
  };

  const capturePosition = (id, type, event) => {
    setTimeout(() => {
      if (event.target && event.target.measure) {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          const position = { 
            x: pageX + width/2, 
            y: pageY + height/2
          };
          
          if (type === 'letter') {
            setLetterPositions(prev => ({ ...prev, [id]: position }));
          } else {
            setObjectPositions(prev => ({ ...prev, [id]: position }));
          }
        });
      }
    }, 100);
  };

  const handleObjectPress = (obj, event) => {
    if (!selectedLetter) return;

    if (selectedLetter === obj.letra) {
      playSound(obj.sound);
      
      const newConnection = {
        letter: selectedLetter,
        object: obj.name,
        letterPosition: letterPositions[selectedLetter],
        objectPosition: objectPositions[obj.name]
      };
      
      setConnections([...connections, newConnection]);
      setLetters(letters.filter(l => l.letra !== selectedLetter));
      setObjects(objects.filter(o => o.name !== obj.name));
    }
    setSelectedLetter(null);
  };

  const getDotsBetween = (start, end) => {
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

  const Celebration = () => {
    if (letters.length === 0 && objects.length === 0 && connections.length > 0) {
      return (
        <View style={styles.celebrationOverlay}>
          <View style={styles.celebrationCard}>
            <Image 
              source={require("../assets/images/star.png")} 
              style={styles.starIcon}
            />
            <TouchableOpacity style={styles.playAgainButton} onPress={initializeGame}>
              <Image 
                source={require("../assets/images/play-again.png")}
                style={styles.playAgainIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require("../assets/images/vista-bg.png")}
        style={styles.background}
      />

      <View style={styles.gameArea}>
        
        <View style={StyleSheet.absoluteFill}>
          {connections.map((conn, index) => {
            const dots = getDotsBetween(conn.letterPosition, conn.objectPosition);
            return dots.map((dot, dotIndex) => (
              <Image
                key={`${index}-${dotIndex}`}
                source={require("../assets/images/ui/dot.png")}
                style={[
                  styles.dot,
                  {
                    position: 'absolute',
                    left: dot.x - 6,
                    top: dot.y - 6,
                  }
                ]}
              />
            ));
          })}
        </View>
        
        <View style={styles.gameContent}>
          
          <View style={styles.lettersContainer}>
            {letters.map((item, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={(e) => {
                  handleLetterPress(item.letra, e);
                  capturePosition(item.letra, 'letter', e);
                }}
                style={[
                  styles.letterCard,
                  selectedLetter === item.letra && styles.selectedLetterCard
                ]}
              >
                <Image source={item.img} style={styles.letterImage} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.objectsContainer}>
            {objects.map((obj, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={(e) => {
                  handleObjectPress(obj, e);
                  capturePosition(obj.name, 'object', e);
                }}
                style={styles.objectCard}
              >
                <Image source={obj.img} style={styles.objectImage} />
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>

      <Celebration />

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../assets/images/back.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={initializeGame}>
          <Image
            source={require("../assets/images/back.png")}
            style={[styles.navIcon, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gameArea: {
    flex: 1,
  },
  gameContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly", 
    alignItems: "center",
    paddingHorizontal: 10, 
  },
  lettersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25, 
  },
  objectsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25, 
  },
  letterCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12, 
    borderRadius: 25, 
    width: 100, 
    height: 100, 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, 
  },
  selectedLetterCard: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.05 }], 
    borderWidth: 2, 
    borderColor: "#FF6B6B",
  },
  objectCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12, 
    borderRadius: 25, 
    width: 100, 
    height: 100, 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  letterImage: {
    width: 90, 
    height: 90, 
    resizeMode: "contain",
  },
  objectImage: {
    width: 85, 
    height: 85, 
    resizeMode: "contain",
  },
  dot: {
    width: 12, 
    height: 12, 
    resizeMode: "contain",
  },
  bottomBar: {
    position: "absolute",
    bottom: 15, 
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30, 
  },
  navIcon: {
    width: 50, 
    height: 50, 
  },
  celebrationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  celebrationCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: "#FFD700",
    borderRadius: 50, 
    padding: 15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  playAgainIcon: {
    width: 60, 
    height: 60, 
  },
});