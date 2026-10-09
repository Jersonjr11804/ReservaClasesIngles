import React from 'react';
// Importa React para definir la pila de navegación de clases.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importa el navegador de pila nativa para navegar entre la lista y el detalle de cada clase.
import InicioScreen from '../screens/InicioScreen';
// Importa la pantalla principal con la lista de clases disponibles.
import DetalleClaseScreen from '../screens/DetalleClaseScreen';
// Importa la pantalla de detalle para ver información más completa de una clase.

const Stack = createNativeStackNavigator();
// Crea la pila de navegación interna para las pantallas de clases.

export default function ClasesStack() {
  // Exporta la pila principal de navegación de clases de la app.
  return (
    // Devuelve la estructura de pantallas dentro de la pila.
    <Stack.Navigator>
      {/* Inicia la pila con la pantalla de lista de clases. */}
      <Stack.Screen
        name="Lista"
        component={InicioScreen}
        options={{ headerShown: false }}
      />
      {/* Muestra la vista de listado de clases sin cabecera visible. */}
      <Stack.Screen
        name="DetalleClase"
        component={DetalleClaseScreen}
        options={{ title: 'Detalle', headerBackTitle: 'Atrás' }}
      />
      {/* Muestra la pantalla de detalle con un título y botón de regreso personalizado. */}
    </Stack.Navigator>
  );
}

