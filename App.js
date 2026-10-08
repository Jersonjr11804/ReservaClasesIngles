import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClasesStack from './src/navigation/ClasesStack';
import { ClasesProvider } from './src/context/ClasesContext';
import { colors } from './src/theme/index';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
   <SafeAreaProvider>
    <ClasesProvider>
    <NavigationContainer theme = {temaNavegacion}>
    <StatusBar style="dark" />
    <ClasesStack />
    </NavigationContainer>
   </SafeAreaProvider>
  );
}
