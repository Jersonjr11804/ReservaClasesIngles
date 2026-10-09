import React from "react";
// Importa React para definir un componente reutilizable de estado vacío.
import { View, Text, StyleSheet } from "react-native";
// Importa los componentes base para crear la vista y sus estilos.
import { Ionicons } from "@expo/vector-icons";
// Importa iconos para representar visualmente la ausencia de contenido.
import { colors, spacing } from "../theme";
// Importa los colores y espaciados del tema de la aplicación.

// Vista reutilizable para mostrar un estado vacío cuando no hay resultados.
// Se usa cuando la búsqueda no coincide o cuando aún no hay contenido disponible.
export default function EstadoVacio({ icono = 'calendar-outline', titulo, mensaje, onAction }) {
  // Exporta un componente que muestra mensajes cuando no hay registros disponibles.
  return (
    // Devuelve el contenido visual del estado vacío.
    <View style={styles.contenedor}>
      {/* Contenedor principal centrado para mostrar un mensaje vacío. */}
      <View style={styles.circulo}>
        {/* Crea un círculo para resaltar el icono principal con color de marca. */}
        <Ionicons name={icono} size={30} color={colors.primario} />
        {/* Muestra el icono correspondiente al estado, por ejemplo calendario o búsqueda. */}
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      {/* Muestra el título del estado vacío para indicar el problema o la falta de datos. */}
      <Text style={styles.mensaje}>{mensaje}</Text>
      {/* Muestra la descripción con más detalle del estado vacío. */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define los estilos del contenedor principal del estado vacío.
  contenedor: {
    flex: 1,
    // Ocupa todo el espacio disponible en la pantalla.
    alignItems: 'center',
    // Centra horizontalmente los elementos dentro del contenedor.
    justifyContent: 'center',
    // Centra verticalmente el contenido del bloque.
    padding: spacing.xxl,
    // Agrega espacio alrededor del contenido para aire visual.
  },
  circulo: {
    width: 72,
    // Define el ancho del círculo del icono.
    height: 72,
    // Define la altura del círculo del icono.
    borderRadius: 36,
    // Redondea el contenedor para formar un círculo perfecto.
    backgroundColor: colors.primarioSuave,
    // Usa un fondo suave con el color principal para resaltar el icono.
    alignItems: 'center',
    // Centra el icono horizontalmente dentro del círculo.
    justifyContent: 'center',
    // Centra el icono verticalmente dentro del círculo.
    marginBottom: spacing.lg,
    // Deja espacio debajo del icono para separar el título.
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colors.texto, textAlign: 'center' },
  // Define el estilo del título del estado vacío con texto centrado y destacado.
  mensaje: {
    fontSize: 14,
    // Define el tamaño de la descripción del estado vacío.
    color: colors.textoSuave,
    // usa un tono gris para dar prioridad al título.
    textAlign: 'center',
    // Centra el texto para que se vea ordenado y limpio.
    marginTop: spacing.sm,
    // Añade separación superior con el título.
    lineHeight: 20,
    // Mejora la legibilidad del texto en varias líneas.
  },
});
