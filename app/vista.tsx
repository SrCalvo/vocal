import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import NavigationButtons from "../components/ui/NavigationButtons";
import VocalItem from "../components/ui/vista/VocalItem";
import ObjectItem from "../components/ui/vista/ObjectItem";
import ConnectionDots from "../components/ui/vista/ConnectionDots";
import CelebrationModal from "../components/ui/vista/CelebrationModal";

const { width, height } = Dimensions.get("window");

const letterImages = {
  A: require("../assets/vista/a.png"),
  E: require("../assets/vista/e.png"),
  I: require("../assets/vista/i.png"),
  O: require("../assets/vista/o.png"),
  U: require("../assets/vista/u.png"),
};

const systemSounds = {
  correct: require("../assets/sounds/correct.mp3"),
  error: require("../assets/sounds/error.mp3"),
};

export default function VistaScreen() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [currentLetter, setCurrentLetter] = useState<any>(null);
  const [distractorLetter, setDistractorLetter] = useState<any>(null);
  const [currentObject, setCurrentObject] = useState<any>(null);
  const [remainingVocals, setRemainingVocals] = useState<string[]>([]);
  const [completedVocals, setCompletedVocals] = useState<string[]>([]);
  const [letterPositions, setLetterPositions] = useState<Record<string, any>>({});
  const [distractorPositions, setDistractorPositions] = useState<Record<string, any>>({});
  const [objectPositions, setObjectPositions] = useState<Record<string, any>>({});
  const [isMatched, setIsMatched] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [usedCombinations, setUsedCombinations] = useState<Set<string>>(new Set());

  const allData = {
    A: [
      { name: "abeja", sound: require("../assets/sounds/abeja.mp3"), img: require("../assets/vista/abeja.png") },
      { name: "avion", sound: require("../assets/sounds/avion.mp3"), img: require("../assets/vista/avion.png") },
      { name: "arbol", sound: require("../assets/sounds/arbol.mp3"), img: require("../assets/vista/arbol.png") }
    ],
    E: [
      { name: "elefante", sound: require("../assets/sounds/elefante.mp3"), img: require("../assets/vista/elefante.png") },
      { name: "estrella", sound: require("../assets/sounds/estrella.mp3"), img: require("../assets/vista/estrella.png") },
      { name: "espejo", sound: require("../assets/sounds/espejo.mp3"), img: require("../assets/vista/espejo.png") }
    ],
    I: [
      { name: "iguana", sound: require("../assets/sounds/iguana.mp3"), img: require("../assets/vista/iguana.png") },
      { name: "isla", sound: require("../assets/sounds/isla.mp3"), img: require("../assets/vista/isla.png") },
      { name: "iman", sound: require("../assets/sounds/iman.mp3"), img: require("../assets/vista/iman.png") }
    ],
    O: [
      { name: "oso", sound: require("../assets/sounds/oso.mp3"), img: require("../assets/vista/oso.png") },
      { name: "oveja", sound: require("../assets/sounds/oveja.mp3"), img: require("../assets/vista/oveja.png") },
      { name: "ojo", sound: require("../assets/sounds/ojo.mp3"), img: require("../assets/vista/ojo.png") }
    ],
    U: [
      { name: "uva", sound: require("../assets/sounds/uva.mp3"), img: require("../assets/vista/uva.png") },
      { name: "uniforme", sound: require("../assets/sounds/uniforme.mp3"), img: require("../assets/vista/uniforme.png") },
      { name: "uñas", sound: require("../assets/sounds/uñas.mp3"), img: require("../assets/vista/uñas.png") }
    ]
  };

  useEffect(() => {
    initializeGame();
    setupAudio();
  }, []);

  const setupAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });
  };

  const playSound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  };

  const initializeGame = () => {
    const vocales = ["A", "E", "I", "O", "U"];
    const shuffledVocals = [...vocales].sort(() => 0.5 - Math.random());
    setRemainingVocals(shuffledVocals);
    setCompletedVocals([]);
    setConnections([]);
    setLetterPositions({});
    setDistractorPositions({});
    setObjectPositions({});
    setSelectedLetter(null);
    setIsMatched(false);
    setShowCelebration(false);
    setUsedCombinations(new Set());
    
    if (shuffledVocals.length > 0) {
      loadNextVocal(shuffledVocals[0]);
    }
  };

  const getRandomDistractor = (correctLetra: string) => {
    const vocales = ["A", "E", "I", "O", "U"];
    const availableDistractors = vocales.filter(v => v !== correctLetra);
    
    const unusedDistractors = availableDistractors.filter(d => {
      return !usedCombinations.has(`${correctLetra}-${d}`);
    });
    
    let distractor;
    if (unusedDistractors.length > 0) {
      distractor = unusedDistractors[Math.floor(Math.random() * unusedDistractors.length)];
    } else {
      setUsedCombinations(new Set());
      distractor = availableDistractors[Math.floor(Math.random() * availableDistractors.length)];
    }
    
    setUsedCombinations(prev => new Set([...prev, `${correctLetra}-${distractor}`]));
    
    return {
      letra: distractor,
      img: letterImages[distractor]
    };
  };

  const loadNextVocal = (vocal: string) => {
    const items = allData[vocal];
    
    const usedObjectsForVocal = connections
      .filter(conn => conn.letter === vocal)
      .map(conn => conn.object);
    
    let availableItems = items.filter(item => !usedObjectsForVocal.includes(item.name));
    
    if (availableItems.length === 0) {
      availableItems = items;
    }
    
    const selectedObject = availableItems[Math.floor(Math.random() * availableItems.length)];
    const correctLetter = { letra: vocal, img: letterImages[vocal] };
    const distractor = getRandomDistractor(vocal);
    const positions = Math.random() < 0.5;
    
    setCurrentLetter(positions ? correctLetter : distractor);
    setDistractorLetter(positions ? distractor : correctLetter);
    setCurrentObject({ ...selectedObject, letra: vocal });
    setIsMatched(false);
    setSelectedLetter(null);
  };

  const handleLetterPress = (letra: string) => {
    if (!isMatched) setSelectedLetter(letra);
  };

  const captureLetterPosition = (letra: string, isDistractor: boolean, event: any) => {
    if (event.target?.measure) {
      event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        const position = { x: pageX + width / 2, y: pageY + height / 2 };
        if (isDistractor) {
          setDistractorPositions(prev => ({ ...prev, [letra]: position }));
        } else {
          setLetterPositions(prev => ({ ...prev, [letra]: position }));
        }
      });
    }
  };

  const captureObjectPosition = (obj: any, event: any) => {
    if (event.target?.measure) {
      event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        const position = { x: pageX + width / 2, y: pageY + height / 2 };
        setObjectPositions(prev => ({ ...prev, [obj.name]: position }));
      });
    }
  };

  const handleObjectPress = async (obj: any) => {
    if (!selectedLetter || isMatched) return;

    if (selectedLetter === obj.letra) {
      await playSound(systemSounds.correct);
      await playSound(obj.sound);
      
      const correctLetterPosition = letterPositions[selectedLetter] || distractorPositions[selectedLetter];
      
      setConnections([...connections, {
        letter: selectedLetter,
        object: obj.name,
        letterPosition: correctLetterPosition,
        objectPosition: objectPositions[obj.name]
      }]);
      
      setIsMatched(true);
      const newCompleted = [...completedVocals, selectedLetter];
      setCompletedVocals(newCompleted);
      const newRemaining = remainingVocals.filter(v => v !== selectedLetter);
      setRemainingVocals(newRemaining);
      
      setTimeout(() => {
        if (newRemaining.length > 0) {
          loadNextVocal(newRemaining[0]);
        } else {
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      await playSound(systemSounds.error);
      setSelectedLetter(null);
    }
  };

  const handlePlayAgain = () => initializeGame();
  const goToMenu = () => router.back();

  if (!currentLetter || !currentObject || !distractorLetter) {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/vista-bg.png")} style={styles.background} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/vista-bg.png")} style={styles.background} />

      <View style={styles.gameArea}>
        <ConnectionDots connections={connections} />

        <View style={styles.gameContent}>
          <View style={styles.lettersContainer}>
            <VocalItem
              letra={currentLetter.letra}
              img={currentLetter.img}
              isSelected={selectedLetter === currentLetter.letra}
              onPress={handleLetterPress}
              onLayout={(event) => captureLetterPosition(currentLetter.letra, false, event)}
            />
            
            <View style={styles.distractorSpacing}>
              <VocalItem
                letra={distractorLetter.letra}
                img={distractorLetter.img}
                isSelected={selectedLetter === distractorLetter.letra}
                onPress={handleLetterPress}
                onLayout={(event) => captureLetterPosition(distractorLetter.letra, true, event)}
              />
            </View>
          </View>

          <View style={styles.objectsContainer}>
            <ObjectItem
              obj={currentObject}
              onPress={handleObjectPress}
              onLayout={captureObjectPosition}
            />
          </View>
        </View>

        <View style={styles.progressContainer}>
          {["A", "E", "I", "O", "U"].map((vocal) => (
            <View
              key={vocal}
              style={[
                styles.progressDot,
                completedVocals.includes(vocal) && styles.progressDotCompleted,
                currentLetter?.letra === vocal && styles.progressDotCurrent
              ]}
            />
          ))}
        </View>
      </View>

      <CelebrationModal 
        visible={showCelebration} 
        onPlayAgain={handlePlayAgain}
        onGoToMenu={goToMenu}
      />

      <NavigationButtons
        onLeftPress={goToMenu}
        onRightPress={goToMenu}
        leftPosition={{ left: "3%", top: "80%" }}
        rightPosition={{ right: "3%", top: "80%" }}
        buttonSize={70}
      />
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
    gap: 30,
  },
  distractorSpacing: {
    marginTop: 20,
  },
  objectsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 10,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  progressDotCompleted: {
    backgroundColor: "#4CAF50",
  },
  progressDotCurrent: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.2 }],
  },
});