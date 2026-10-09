import React from 'react';
// Importa React para crear la navegación por pestañas principal.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa el navegador de pestañas inferior para organizar las pantallas principales de la app.
import { Ionicons } from '@expo/vector-icons';
// Importa iconos para representar cada pestaña en la barra inferior.
import ClasesStack from './ClasesStack';
// Importa la pila de navegación de clases para la pantalla de inicio y detalle.
import ReservasScreen from '../screens/ReservasScreen';
// Importa la pantalla de reservas para ver las clases agendadas.
import PerfilScreen from '../screens/PerfilScreen';
// Importa la pantalla de perfil para guardar información del estudiante.
import { colors } from '../theme';
// Importa los colores del tema para personalizar la barra de pestañas.

const Tab = createBottomTabNavigator();
// Crea el navegador de pestañas para la app.

const iconos = {
  // Mapea cada nombre de pantalla con el icono correspondiente.
  Inicio: 'home',
  // Icono de casa para la pantalla de inicio.
  Reservas: 'calendar',
  // Icono de calendario para la pantalla de reservas.
  Perfil: 'person',
  // Icono de usuario para la pantalla de perfil.
};

export default function AppTabs() {
  // Exporta la estructura principal de pestañas de la aplicación.
  return (
    // Devuelve el navegador inferior con las pantallas principales.
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configura la apariencia y comportamiento de cada pestaña según la ruta.
        tabBarIcon: ({ color, size }) => (
          // Define el icono de la pestaña según la ruta activa.
          <Ionicons name={iconos[route.name]} size={size} color={color} />
          // Muestra el icono correspondiente a la pestaña usando el color activo/inactivo.
        ),
        tabBarActiveTintColor: colors.primario,
        // Color del icono y texto cuando la pestaña está activa.
        tabBarInactiveTintColor: colors.textoSuave,
        // Color del icono y texto cuando la pestaña está inactiva.
      })}
    >
      <Tab.Screen name="Inicio" component={ClasesStack} options={{ headerShown: false }} />
      {/* Muestra la pantalla de inicio con la pila de detalle y lista de clases. */}
      <Tab.Screen
        name="Reservas"
        component={ReservasScreen}
        options={{ title: 'Mis reservas', tabBarLabel: 'Mis reservas' }}
      />
      {/* Muestra la vista de reservas con el título personalizado para la pestaña. */}
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Mi perfil', tabBarLabel: 'Mi perfil' }}
      />
      {/* Muestra la pantalla de perfil para registrar la información del estudiante. */}
    </Tab.Navigator>
  );
}