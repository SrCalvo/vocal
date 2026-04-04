import { Audio } from "expo-av";

export const useSound = () => {
  const play = async (soundFile: any, onFinish?: () => void) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          onFinish?.();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      onFinish?.();
    }
  };

  return { play };
};