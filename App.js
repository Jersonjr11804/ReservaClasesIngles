import React from 'react';
// Importa React para crear componentes funcionales en la app.
import { StatusBar } from 'expo-status-bar';
// Importa la barra de estado de Expo para controlar el estilo visual de la app.
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// Importa el contenedor de navegación y el tema por defecto de React Navigation.
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Importa el proveedor de áreas seguras para evitar que los elementos se solapen con notches o barras del sistema.
import AppTabs from './src/navigation/AppTabs';
// Importa la barra inferior de navegación principal de la aplicación.
import { ReservasProvider } from './src/context/ReservaContext';
// Importa el proveedor del contexto de reservas para compartir datos entre pantallas.
import { colors } from './src/theme/index';
// Importa la paleta de colores para personalizar el tema de navegación.

const temaNavegacion = {
  // Crea un tema personalizado basado en el tema estándar de navegación.
  ...DefaultTheme,
  // Copia todas las propiedades del tema base para conservar los valores por defecto.
  colors: {
    // Personaliza los colores del tema de navegación.
    ...DefaultTheme.colors,
    // Conserva los colores estándar de React Navigation antes de sobreescribir los necesarios.
    background: colors.fondo,
    // Define el fondo general de las pantallas con el color del tema de la app.
    card: colors.superficie,
    // Usa el color de superficie para tarjetas dentro de la navegación.
    primary: colors.primario,
    // Asigna el color principal para elementos activos y destacados.
    text: colors.texto,
    // Establece el color de texto principal para la navegación.
    border: colors.borde,
    // Define el color del borde para componentes visuales de navegación.
  },
};

export default function App() {
  // Exporta el componente principal que renderiza la aplicación.
  return (
    // Devuelve la estructura principal de la app.
    <SafeAreaProvider>
      {/* Provee espacio seguro para que el contenido no se superponga con la barra del sistema. */}
      <ReservasProvider>
        {/* Envuelve la app con el contexto de reservas para compartir datos entre pantallas. */}
        <NavigationContainer theme={temaNavegacion}>
          {/* Crea el contenedor principal de navegación con el tema personalizado. */}
          <AppTabs />
          {/* Renderiza la navegación por pestañas de la aplicación. */}
          <StatusBar style="auto" />
          {/* Configura la barra de estado con estilo automático para iOS y Android. */}
        </NavigationContainer>
      </ReservasProvider>
    </SafeAreaProvider>
  );
}
