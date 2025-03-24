import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";

import HomeScreen from "./screens/HomeScreen";
import SinglePlayerScreen from "./screens/SinglePlayerScreen";
import MultiPlayerScreen from "./screens/MultiPlayerScreen";
import TicTacToeGame from "./screens/TicTacToeGame";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "PressStart2P-Regular": PressStart2P_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Do not render anything until fonts are loaded
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SinglePlayer" component={SinglePlayerScreen} />
        <Stack.Screen name="MultiPlayer" component={MultiPlayerScreen} />
        <Stack.Screen name="TicTacToeGame" component={TicTacToeGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
