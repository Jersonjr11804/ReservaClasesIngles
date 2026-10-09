import React from 'react';
// Importa React para crear un componente simple de etiqueta.
import { View, Text, StyleSheet } from 'react-native';
// Importa los componentes necesarios para mostrar un contenedor y texto.
import { coloresPorNivel, spacing, radius } from '../theme';
// Importa la paleta de colores por nivel y los valores del tema visual.

export default function EtiquetaNivel({ nivel }) {
  // Exporta un componente que muestra el nivel de una clase con color asociado.
  const bg = coloresPorNivel[nivel] ?? '#E5E7EB';
  // Busca el color correspondiente al nivel, y si no existe, usa un gris neutro.
  return (
    // Devuelve la etiqueta visual con fondo y texto del nivel.
    <View style={[styles.container, { backgroundColor: bg }]}> 
      {/* Crea el contenedor de la etiqueta con el fondo que corresponde al nivel. */}
      <Text style={styles.text}>{nivel}</Text>
      {/* Muestra la palabra del nivel para identificarlo visualmente. */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define el estilo del contenedor principal de la etiqueta.
  container: {
    paddingVertical: 4,
    // Da espacio vertical para que la etiqueta tenga altura mínima.
    paddingHorizontal: 8,
    // Da espacio horizontal para que el texto tenga aire alrededor.
    borderRadius: radius.sm,
    // Redondea la etiqueta con un radio pequeño.
    alignSelf: 'flex-start',
    // Ajusta la etiqueta a la izquierda del contenido para que no ocupe todo el ancho.
  },
  text: { color: '#fff', fontWeight: '700', fontSize: 12 },
  // Define el texto de la etiqueta en blanco, negrita y pequeño para legibilidad.
});
