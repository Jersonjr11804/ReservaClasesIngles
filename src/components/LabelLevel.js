import React from 'react';
// Importa React para crear un componente simbólico para etiquetas de nivel.
import { View, Text, StyleSheet } from 'react-native';
// Importa los elementos visuales básicos para renderizar la etiqueta.
import { colors, spacing, coloresPorNivel } from '../theme';
// Importa la paleta de colores y los valores del tema para estilizar el nivel.

// Muestra la categoría del nivel de la clase con un color asociado.
// Sirve para identificar rápidamente si es principiante, intermedio o avanzado.
export default function EtiquetaNivel({ nivel }) {
  // Exporta la etiqueta visual del nivel con un color que lo represente.
  // Elige el color que corresponde al nivel; si no coincide, usa el primario por defecto.
  const color = coloresPorNivel[nivel] || colors.primario;
  // Busca el tono del nivel y, si no existe, usa el color primario para evitar errores visuales.

  return (
    // Devuelve el bloque visual con el estilo de la etiqueta.
    <View
      style={[
        styles.contenedor,
        {
          backgroundColor: color + '1A',
          // Establece un fondo semi-transparente del mismo color para resaltar la etiqueta.
          borderColor: color,
          // Define el borde con el color del nivel para enfatizar la clase.
        },
      ]}
    >
      <Text style={[styles.texto, { color }]}>{nivel}</Text>
      {/* Muestra el nombre del nivel con el tono exacto asociado a esa categoría. */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define el contenedor base de la etiqueta.
  contenedor: {
    alignSelf: 'flex-start',
    // Hace que la etiqueta se ajuste a su contenido y no ocupe todo el ancho.
    paddingVertical: 6,
    // Añade espacio vertical para la etiqueta.
    paddingHorizontal: spacing.md,
    // Añade espacio horizontal para que el texto respire.
    borderWidth: 1,
    // Define un borde visible para separar la etiqueta del fondo.
    borderRadius: 999,
    // Hace que los bordes sean completamente redondos y suaves.
  },
  texto: {
    fontSize: 11,
    // Define un tamaño pequeño para la etiqueta del nivel.
    fontWeight: '800',
    // Hace el texto más marcado para distinguirlo.
    letterSpacing: 0.3,
    // Añade un poco de separación entre letras para mejorar la legibilidad.
  },
});