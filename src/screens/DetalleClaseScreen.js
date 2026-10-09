import React, { useState } from 'react';
// Importa React y el hook de estado para controlar el horario seleccionado en la pantalla.
import { View, Text, Image, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
// Importa los componentes necesarios para mostrar imágenes, textos, botones, alertas y scroll.
import { formatearPrecio } from '../data/clases';
// Importa la función que formatea el precio de la clase.
import { colors, radius, spacing, typography } from '../theme';
// Importa los tokens visuales del tema para estilar la pantalla.
import { useReserva } from '../context/ReservaContext';
// Importa el contexto de reservas para validar cupos y guardar la reserva.

export default function DetalleClaseScreen({ route }) {
  // Exporta la pantalla que muestra información completa de una clase y permite reservarla.
  const { claseId } = route.params || {};
  // Obtiene el id de la clase que se pasó desde la pantalla anterior.
  const { clases, reservas, reservarClase } = useReserva();
  // Lee la lista de clases, reservas actuales y la función para reservar desde el contexto.
  const [horario, setHorario] = useState(null);
  // Guarda el horario seleccionado por el usuario antes de confirmar la reserva.

  const clase = clases.find((c) => c.id === claseId);
  // Busca la clase exacta dentro de la lista para mostrar su detalle.
  if (!clase) {
    // Si no existe la clase, muestra un aviso en pantalla.
    return (
      <View style={styles.container}>
        <Text style={typography.titulo}>Clase no encontrada</Text>
      </View>
    );
  }

  // Horarios que ya tengo reservados (de cualquier clase)
  const ocupados = reservas.map((r) => r.horario);
  // Extrae todos los horarios ya reservados para impedir conflictos visuales y lógicos.

  function handleReservar() {
    // Función que confirma la reserva al pulsar el botón de reservar.
    if (!horario) {
      // Si no se eligió horario, muestra una alerta para pedir la selección.
      Alert.alert('Elige un horario', 'Selecciona uno de los horarios disponibles.');
      // Muestra un diálogo de alerta con instrucciones para escoger un horario.
      return;
      // Sale de la función sin intentar reservar.
    }
    const resultado = reservarClase(clase.id, horario);
    // Invoca la lógica del contexto para confirmar la reserva con la clase y el horario.
    Alert.alert(resultado.ok ? 'Listo' : 'No se pudo reservar', resultado.mensaje);
    // Muestra un mensaje de éxito o error según el resultado de la operación.
    if (resultado.ok) setHorario(null);
    // Si la reserva fue correcta, limpia el horario elegido para dejar la pantalla en blanco.
  }

  return (
    // Devuelve el contenido visual del detalle de la clase.
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      {/* Permite desplazarse verticalmente por toda la información de la clase. */}
      <Image source={{ uri: clase.imagen }} style={styles.image} />
      {/* Muestra la imagen principal de la clase. */}
      <Text style={styles.title}>{clase.titulo}</Text>
      {/* Muestra el nombre visible de la clase. */}
      <Text style={styles.subtitle}>
        {clase.nivel} • {clase.modalidad} • {clase.duracion} min
      </Text>
      {/* Muestra el nivel, la modalidad y la duración resumida de la clase. */}
      <Text style={styles.price}>{formatearPrecio(clase.precio)}</Text>
      {/* Muestra el precio de la clase formateado en pesos colombianos. */}
      <Text style={styles.description}>{clase.descripcion}</Text>
      {/* Presenta la descripción completa de la clase para informar al estudiante. */}
      <Text style={styles.cupos}>Cupos disponibles: {clase.cupos}</Text>
      {/* Muestra la cantidad actual de cupos disponibles. */}

      <Text style={styles.seccion}>Horarios</Text>
      {/* Título de la sección para elegir horario. */}
      <View style={styles.horarios}>
        {/* Contenedor flexible para mostrar todos los horarios disponibles. */}
        {clase.horarios.map((h) => {
          // Recorre cada horario de la clase para crear una opción seleccionable.
          const reservado = reservas.some((r) => r.claseId === clase.id && r.horario === h);
          // Dinamicamente determina si este horario ya está reservado para esta misma clase.
          const choca = !reservado && ocupados.includes(h);
          // Detecta si el horario está ocupado por otra reserva distinta, aunque no sea de la misma clase.
          return (
            <Pressable
              key={h}
              onPress={() => setHorario(h)}
              style={[
                styles.horario,
                horario === h && styles.horarioActivo,
                (reservado || choca) && styles.horarioOcupado,
              ]}
            >
              {/* Cada botón representa un horario y cambia de estilo si está activo o bloqueado. */}
              <Text style={[styles.horarioTexto, horario === h && { color: '#fff' }]}>
                {h}
                {reservado ? ' (reservado)' : choca ? ' (ocupado)' : ''}
              </Text>
              {/* Muestra el horario con etiqueta extra si está reservado o en conflicto. */}
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.button} onPress={handleReservar}>
        {/* Botón principal para confirmar la reserva seleccionada. */}
        <Text style={styles.buttonText}>Reservar</Text>
        {/* Texto visible del botón de reserva. */}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Define todos los estilos de la pantalla de detalle.
  container: { flex: 1, backgroundColor: colors.fondo, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  // Establece el fondo general de la pantalla y padding para evitar bordes pegados.
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: spacing.md },
  // Estilo de la imagen principal con altura fija y bordes redondeados.
  title: { fontSize: 20, fontWeight: '700', color: colors.texto, marginBottom: spacing.xs },
  // Define el título principal del detalle de la clase.
  subtitle: { color: colors.textoSuave, marginBottom: spacing.sm },
  // Muestra el nivel, modalidad y duración con un texto secundario.
  price: { color: colors.primario, fontWeight: '700', marginBottom: spacing.sm },
  // Destaca el precio de la clase con el color principal.
  description: { color: colors.texto, marginBottom: spacing.sm },
  // Define la descripción del curso con texto principal y espacio inferior.
  cupos: { fontWeight: '700', marginVertical: spacing.sm },
  // Muestra la disponibilidad de cupos con un estilo más enfocado.
  seccion: { ...typography.subtitulo, marginTop: spacing.md, marginBottom: spacing.sm },
  // Título de la sección de horarios con tipografía de subtítulo.
  horarios: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  // Envuelve los botones de horarios en filas y columnas según el espacio disponible.
  horario: {
    paddingVertical: spacing.sm,
    // Da espacio vertical a cada opción de horario.
    paddingHorizontal: spacing.lg,
    // Da espacio horizontal para que el texto se lea bien.
    borderRadius: radius.full,
    // Redondea los botones de horario tipo pill.
    backgroundColor: colors.superficie,
    // Usa fondo blanco para cada horario inactivo.
    borderWidth: 1,
    // Agrega un borde discreto.
    borderColor: colors.borde,
    // Usa el color del borde del tema.
  },
  horarioActivo: { backgroundColor: colors.primario, borderColor: colors.primario },
  // Cambia los botones seleccionados al color principal para distinguir la elección.
  horarioOcupado: { opacity: 0.5 },
  // Reduce la opacidad de horarios no disponibles para marcar bloqueo visual.
  horarioTexto: { color: colors.texto, fontWeight: '600', fontSize: 13 },
  // Define el texto visible en cada horario.
  button: { padding: 14, borderRadius: 8, alignItems: 'center', backgroundColor: colors.primario },
  // Estilo del botón principal para confirmar la reserva.
  buttonText: { color: '#fff', fontWeight: '700' },
  // Texto del botón de reserva en blanco y con peso alto para contrastar.
});
