import React from 'react';
// Importa React para crear un componente reutilizable de filtro por nivel.
import { Pressable, Text, StyleSheet } from 'react-native';
// Importa los elementos de React Native para crear un botón y un texto.

import { colors, spacing, radius } from '../theme';
// Importa los colores, espaciados y radios del tema visual de la app.

// Botón tipo chip para filtrar por nivel de clase.
// Muestra si está activo o no y responde al toque del usuario.
export default function NivelChip({ etiqueta, activo, onPress }) {
  // Exporta un chip que representa una opción de filtro por nivel.
  return (
    // Devuelve la estructura visual del chip.
    <Pressable
      onPress={onPress}
      // Llama a la función recibida al pulsar el chip.
      style={({ pressed }) => [
        // Calcula el estilo según el estado de presión y el estado activo.
        styles.chip,
        // Aplica el estilo base del chip.
        activo && styles.chipActivo,
        // Si está activo, cambia su color para resaltarlo visualmente.
        pressed && styles.chipPressed,
        // Si se presiona, aplica una opacidad más baja para dar feedback.
      ]}
    >
      <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
      {/* Muestra el texto del nivel y cambia de color si el chip está activo. */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Define el estilo base del chip para filtrar niveles.
  chip: {
    minHeight: 44,
    // Define una altura mínima para que el chip se vea cómodo al tocar.
    paddingVertical: spacing.md,
    // Da espacio vertical interno al chip.
    paddingHorizontal: spacing.xl,
    // Da espacio horizontal para que el texto respire.
    alignItems: 'center',
    // Centra el texto dentro del chip.
    justifyContent: 'center',
    // Centra el contenido verticalmente.
    borderRadius: radius.full,
    // Redondea el chip para hacerlo tipo pastilla.
    backgroundColor: colors.superficie,
    // Usa fondo blanco para el estado inactivo.
    borderWidth: 1,
    // Tiene borde sutil para separarlo del fondo.
    borderColor: colors.borde,
    // Usa el color de borde del tema.
    marginRight: spacing.sm,
    // Da espacio a la derecha para separar chips consecutivos.
  },
  chipActivo: {
    backgroundColor: colors.primario,
    // Cambia el fondo a color primario cuando está activo.
    borderColor: colors.primario,
    // Hace que el borde coincida con el fondo activo.
  },
  chipPressed: {
    opacity: 0.8,
    // Baja la opacidad cuando se presiona para dar retroalimentación táctil.
  },
  texto: {
    fontSize: 15,
    // Define el tamaño del texto del filtro.
    lineHeight: 19,
    // Ajusta la línea para una lectura más cómoda.
    fontWeight: '700',
    // Da peso medio-bold al texto.
    color: colors.textoSuave,
    // Usa un color neutral para el estado inactivo.
    includeFontPadding: false,
    // Evita un padding extra de fuente que pudiera afectar el diseño.
    textAlign: 'center',
    // Centra el texto dentro del chip.
    whiteSpace: 'nowrap',
    // Evita que el texto se rompa en varias líneas.
  },
  textoActivo: {
    color: '#FFFFFF',
    // Cambia el texto del chip activo a blanco para contrastar con el fondo primario.
  },
});
