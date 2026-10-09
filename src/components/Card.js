import React from 'react';
// Importa React para poder definir el componente funcional de la tarjeta.
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
// Importa los elementos visuales básicos de React Native para construir la tarjeta.
import { Ionicons } from '@expo/vector-icons';
// Importa los iconos de Expo para mostrar métricas visuales como estrellas, tiempo y personas.
import EtiquetaNivel from './EtiquetaNivel';
// Importa el componente que muestra el nivel de la clase con color.
import { colors, radius, spacing, sombra } from '../theme';
// Importa la paleta visual y medidas del tema de la aplicación.
import { formatearPrecio } from '../data/clases';
// Importa la función que formatea el precio para que se muestre en la UI.

// Tarjeta reutilizable para mostrar una clase en la lista principal.
// Recibe la clase, el comportamiento al pulsar la tarjeta y la acción de reservar.
export default function Card({ clase, onPress, onReservar }) {
  // Exporta el componente Card para reutilizarlo en diferentes pantallas.
  return (
    // Devuelve la estructura visual de la tarjeta con imagen, contenido y botón.
    <Pressable onPress={onPress} style={styles.tarjeta}>
      {/* Permite que al pulsar la tarjeta se abra la vista de detalle de la clase. */}
      <Image source={{ uri: clase.imagen }} style={styles.imagen} />
      {/* Muestra la imagen principal de la clase con la URL recibida por prop. */}

      <View style={styles.cuerpo}>
        {/* Contenedor interno con el contenido textual y visual de la clase. */}
        <EtiquetaNivel nivel={clase.nivel} />
        {/* Muestra la etiqueta del nivel con el color correspondiente a la clase. */}

        <Text style={styles.titulo}>{clase.titulo}</Text>
        {/* Muestra el título de la clase para identificar el curso. */}

        <View style={styles.filaMeta}>
          {/* Agrupa los datos secundarios en una fila horizontal. */}
          <View style={styles.metaItem}>
            {/* Crea una fila para la valoración de la clase. */}
            <Ionicons name="star" size={14} color={colors.acento} />
            {/* Muestra el icono de estrella para representar la valoración. */}
            <Text style={styles.metaTexto}>{clase.rating}</Text>
            {/* Muestra la calificación numérica de la clase. */}
          </View>

          <View style={styles.metaItem}>
            {/* Crea una fila para la duración. */}
            <Ionicons name="time-outline" size={14} color={colors.textoSuave} />
            {/* Muestra el icono de reloj para indicar la duración. */}
            <Text style={styles.metaTexto}>{clase.duracion} min</Text>
            {/* Muestra la duración de la clase en minutos. */}
          </View>

          <View style={styles.metaItem}>
            {/* Crea una fila para la disponibilidad de cupos. */}
            <Ionicons name="people-outline" size={14} color={colors.textoSuave} />
            {/* Muestra el icono de personas para indicar cupos. */}
            <Text style={styles.metaTexto}>{clase.cupos} cupos</Text>
            {/* Muestra la cantidad de cupos disponibles. */}
          </View>
        </View>

        <View style={styles.filaProfesor}>
          {/* Fila con la información del profesor responsable de la clase. */}
          <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
          {/* Muestra la foto del profesor. */}
          <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
          {/* Muestra el nombre del profesor de la clase. */}
        </View>

        <View style={styles.pie}>
          {/* Pie de la tarjeta donde van el precio y el botón de reserva. */}
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
          {/* Muestra el precio formateado con moneda y formato colombiano. */}
          <Pressable
            onPress={() => {
              // Ejecuta la acción de reserva si el componente padre la envió.
              if (onReservar) {
                // Verifica que haya una función de reserva disponible.
                onReservar(clase.id);
                // Llama a la función con el id de la clase para reservarla.
              }
            }}
            style={styles.boton}
          >
            {/* Botón principal para reservar la clase desde la tarjeta. */}
            <Text style={styles.botonTexto}>Reservar</Text>
            {/* Texto visible del botón para confirmar la acción. */}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Define los estilos visuales de la tarjeta principal.
  tarjeta: {
    backgroundColor: colors.superficie,
    // Establece el fondo blanco de la tarjeta.
    borderRadius: radius.lg,
    // Redondea los bordes de la tarjeta para darle un estilo moderno.
    overflow: 'hidden',
    // Oculta contenido que se salga del contenedor para mantener esquinas limpias.
    marginBottom: spacing.lg,
    // Da espacio inferior entre tarjetas en la lista.
    borderWidth: 1,
    // Agrega un borde sutil para separar visualmente la tarjeta.
    borderColor: colors.borde,
    // Usa el color de borde definido en el tema.
    ...sombra,
    // Añade la sombra del tema para dar profundidad visual.
  },
  imagen: {
    width: '100%',
    // Ocupa todo el ancho disponible del contenedor.
    height: 180,
    // Fija una altura adecuada para la imagen principal.
    backgroundColor: colors.primarioSuave,
    // Coloca un fondo temporal mientras carga la imagen.
  },
  cuerpo: {
    padding: spacing.lg,
    // Aplica padding interno para separar el texto del contenedor.
    gap: spacing.sm,
    // Añade separación uniforme entre elementos internos.
  },
  titulo: {
    fontSize: 18,
    // Define el tamaño de la fuente del nombre de la clase.
    fontWeight: '800',
    // Hace el título más destacado y visible.
    color: colors.texto,
    // Usa el color principal del texto para legibilidad.
    lineHeight: 24,
    // Ajusta la altura de línea para mejorar la lectura del texto.
  },
  filaMeta: {
    flexDirection: 'row',
    // Coloca los metadatos en una fila horizontal.
    alignItems: 'center',
    // Centra verticalmente los items dentro de la fila.
    justifyContent: 'space-between',
    // Distribuye el espacio disponible entre los elementos.
    paddingTop: spacing.xs,
    // Añade un poco de espacio superior para separar la fila del título.
  },
  metaItem: {
    flexDirection: 'row',
    // Ordena icono y texto de manera horizontal.
    alignItems: 'center',
    // Alinea icono y texto verticalmente.
    gap: 4,
    // Establece una separación pequeña entre icono y texto.
    flex: 1,
    // Permite que cada item tome el mismo espacio proporcional.
  },
  metaTexto: {
    fontSize: 12,
    // Define el tamaño pequeño del texto de metadatos.
    color: colors.textoSuave,
    // Usa el texto secundario para los detalles.
    fontWeight: '600',
    // Da peso medio al texto para que sea legible pero no dominante.
  },
  filaProfesor: {
    flexDirection: 'row',
    // Coloca la foto y el nombre del profesor en una fila.
    alignItems: 'center',
    // Centra la avatar y el texto verticalmente.
    gap: spacing.sm,
    // Añade separación entre foto y nombre.
    paddingVertical: spacing.xs,
    // Da un poco de espacio vertical alrededor del bloque del profesor.
  },
  avatar: {
    width: 32,
    // Define el ancho de la foto del profesor.
    height: 32,
    // Define la altura de la foto del profesor.
    borderRadius: 16,
    // Redondea la foto para que se vea circular.
    backgroundColor: colors.borde,
    // Agrega un placeholder mientras la imagen carga.
  },
  profesor: {
    fontSize: 13,
    // Define el tamaño del nombre del profesor.
    color: colors.texto,
    // Usa el color principal del texto.
    fontWeight: '600',
    // Da un peso medio para resaltar el nombre.
    flexShrink: 1,
    // Permite reducir el texto si no hay espacio disponible.
  },
  pie: {
    flexDirection: 'row',
    // Coloca precio y botón en una fila horizontal.
    alignItems: 'center',
    // Alinea verticalmente los elementos del pie.
    justifyContent: 'space-between',
    // Separa el precio del botón en los extremos.
    marginTop: spacing.xs,
    // Añade espacio superior para despegar el pie del contenido anterior.
  },
  precio: {
    fontSize: 18,
    // Define el tamaño del precio para que destaque.
    fontWeight: '800',
    // Hace el precio más visible.
    color: colors.primario,
    // Usa el color principal del branding para los precios.
  },
  boton: {
    backgroundColor: colors.primario,
    // Define el color principal del botón de reserva.
    borderRadius: radius.full,
    // Redondea completamente el botón para un estilo tipo pill.
    paddingVertical: spacing.sm,
    // Da espacio vertical interno al botón.
    paddingHorizontal: spacing.lg,
    // Da espacio horizontal interno para el texto.
  },
  botonTexto: {
    color: '#FFFFFF',
    // Establece el texto del botón en blanco para alto contraste.
    fontWeight: '700',
    // Hace más legible el texto del botón.
    fontSize: 13,
    // Define el tamaño del texto del botón.
  },
});

