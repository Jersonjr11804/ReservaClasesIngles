import React from 'react';
// Importa React para crear la pantalla de reservas activas del estudiante.
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
// Importa componentes para listar reservas, botones, alertas y estilos.
import EstadoVacio from '../components/EstadoVacio';
// Importa la vista que muestra el estado cuando aún no hay reservas.
import { colors, radius, spacing } from '../theme';
// Importa los colores y medidas del tema visual.
import { useReserva } from '../context/ReservaContext';
// Importa el contexto que tiene la lista de reservas, clases y funciones de cancelación.

export default function ReservasScreen() {
  // Exporta la pantalla que lista las clases ya reservadas por el usuario.
  const { reservas, clases, cancelarReserva } = useReserva();
  // Obtiene la lista de reservas, la información de clases y la función para cancelarlas.

  function confirmarCancelar(reserva) {
    // Función que solicita confirmación antes de borrar una reserva.
    Alert.alert('Cancelar reserva', '¿Seguro que quieres cancelar esta reserva?', [
      // Muestra una alerta con opciones Sí/No para confirmar la acción.
      { text: 'No' },
      // Opción predeterminada para no cancelar la reserva.
      { text: 'Sí, cancelar', style: 'destructive', onPress: () => cancelarReserva(reserva.id) },
      // Opción destructiva que ejecuta la cancelación al confirmar.
    ]);
  }

  return (
    // Devuelve la lista de reservas activas o un estado vacío si no hay contenido.
    <FlatList
      style={styles.pantalla}
      data={reservas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}
      renderItem={({ item }) => {
        // Renderiza cada reserva en una tarjeta con la información de la clase.
        const clase = clases.find((c) => c.id === item.claseId);
        // Busca la clase asociada a esa reserva para mostrar su nombre y detalle.
        return (
          <View style={styles.card}>
            {/* Tarjeta visual que representa una reserva activa. */}
            <Text style={styles.titulo}>{clase.titulo}</Text>
            {/* Muestra el título de la clase reservada. */}
            <Text style={styles.detalle}>{item.horario}</Text>
            {/* Muestra el horario escogido para esa reserva. */}
            <Text style={styles.detalle}>
              {clase.profesor.nombre} • {clase.modalidad} • {clase.duracion} min
            </Text>
            {/* Muestra profesor, modalidad y duración de la clase. */}
            <Pressable style={styles.boton} onPress={() => confirmarCancelar(item)}>
              {/* Botón para cancelar la reserva con confirmación previa. */}
              <Text style={styles.botonTexto}>Cancelar</Text>
              {/* Texto visible del botón para cancelar la clase. */}
            </Pressable>
          </View>
        );
      }}
      ListEmptyComponent={
        <EstadoVacio
          icono="calendar-outline"
          titulo="Aún no tienes reservas"
          mensaje="Reserva una clase desde la pestaña Inicio."
        />
        // Muestra una vista de estado vacío si no hay reservas activas.
      }
    />
  );
}

const styles = StyleSheet.create({
  // Define los estilos visuales de la pantalla de reservas.
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  // Hace que la pantalla ocupe todo el fondo con el color principal de la app.
  card: {
    backgroundColor: colors.superficie,
    // Usa fondo blanco para cada tarjeta de reserva.
    borderRadius: radius.lg,
    // Redondea las esquinas para un diseño más suave.
    padding: spacing.lg,
    // Agrega espacio interno a la tarjeta.
    marginBottom: spacing.md,
    // Separa cada reserva con espacio inferior.
  },
  titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
  // Define el estilo del nombre de la clase en la tarjeta.
  detalle: { color: colors.textoSuave, marginTop: spacing.xs },
  // Define los detalles de horario, profesor y duración con un tono secundario.
  boton: {
    marginTop: spacing.md,
    // Separa el botón del contenido anterior.
    backgroundColor: colors.peligro,
    // Usa un rojo de advertencia para indicar cancelación.
    paddingVertical: 10,
    // Da altura al botón de cancelación.
    borderRadius: 8,
    // Redondea las esquinas del botón.
    alignItems: 'center',
    // Centra el texto dentro del botón.
  },
  botonTexto: { color: '#fff', fontWeight: '700' },
  // Text visible del botón cancelación en blanco para alto contraste.
});
