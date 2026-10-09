import React, { useState } from 'react';
// Importa React y el hook useState para gestionar los campos del formulario del perfil.
import { View, Text, TextInput, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
// Importa componentes para crear el formulario, botones, alertas y contenido desplazable.
import NivelChip from '../components/NivelChip';
// Importa el chip reutilizable para seleccionar el nivel del estudiante.
import { NIVELES } from '../data/clases';
// Importa la lista de niveles que se usa tanto en filtros como en el perfil.
import { colors, radius, spacing, typography } from '../theme';
// Importa los colores y medidas del tema visual.
import { useReserva } from '../context/ReservaContext';
// Importa el contexto para leer el perfil actual, guardar datos y contar reservas activas.

const NIVELES_PERFIL = NIVELES.filter((n) => n !== 'Todos');
// Elimina el filtro general 'Todos' para dejar únicamente niveles reales del perfil.

export default function PerfilScreen() {
  // Exporta la pantalla para registrar o actualizar la información del estudiante.
  const { perfil, guardarPerfil, reservas } = useReserva();
  // Obtiene el perfil existente, la función para guardar el perfil y la cantidad de reservas del usuario.

  // Si ya hay perfil, el formulario arranca lleno; si no, vacío
  const [nombre, setNombre] = useState(perfil?.nombre ?? '');
  // Inicializa el nombre con el valor guardado o vacío si aún no existe un perfil.
  const [apellido, setApellido] = useState(perfil?.apellido ?? '');
  // Inicializa el apellido con el valor guardado o vacío.
  const [nivel, setNivel] = useState(perfil?.nivel ?? '');
  // Inicializa el nivel con el valor ya guardado o vacío.
  const [cedula, setCedula] = useState(perfil?.cedula ?? '');
  // Inicializa la cédula con el valor guardado o vacío.

  function handleGuardar() {
    // Función que valida el formulario y guarda el perfil del estudiante.
    if (!nombre.trim() || !apellido.trim() || !nivel || !cedula.trim()) {
      // Verifica que todos los campos requeridos estén completos.
      Alert.alert('Faltan datos', 'Completa todos los campos.');
      // Muestra un aviso si faltan datos obligatorios.
      return;
      // Sale de la función sin guardar.
    }
    if (!/^\d{6,10}$/.test(cedula.trim())) {
      // valida que la cédula tenga solo números y entre 6 y 10 dígitos.
      Alert.alert('Cédula inválida', 'Debe tener solo números (entre 6 y 10 dígitos).');
      // Muestra un mensaje de error si la cédula no cumple el formato.
      return;
      // Sale de la función para evitar guardar un dato inválido.
    }
    guardarPerfil({
      // Guarda la información validada del estudiante en el contexto.
      nombre: nombre.trim(),
      // Guarda el nombre limpio de espacios extra.
      apellido: apellido.trim(),
      // Guarda el apellido limpio de espacios extra.
      nivel,
      // Guarda el nivel seleccionado por el usuario.
      cedula: cedula.trim(),
      // Guarda la cédula ingresada sin espacios extra.
    });
    Alert.alert('Listo', perfil ? 'Perfil actualizado.' : 'Perfil registrado.');
    // Muestra un mensaje de éxito según si se registra o actualiza el perfil.
  }

  return (
    // Devuelve la estructura del formulario del perfil del estudiante.
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={{ padding: spacing.lg }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Hace que el contenido del formulario pueda desplazarse y que los toques se mantengan activos al escribir. */}
      <Text style={styles.titulo}>{perfil ? 'Mis datos' : 'Registro de estudiante'}</Text>
      {/* Muestra el título según si ya hay perfil o se trata de un registro nuevo. */}
      {perfil && (
        // Si ya existe perfil, muestra resumen de datos y reservas activas.
        <Text style={styles.resumen}>
          {perfil.nombre} {perfil.apellido} • Reservas activas: {reservas.length}
        </Text>
        // Muestra el nombre completo del usuario junto con la cantidad de reservas actuales.
      )}

      <Text style={styles.label}>Nombre</Text>
      {/* Etiqueta del campo de nombre. */}
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      {/* Input para capturar el nombre del estudiante. */}

      <Text style={styles.label}>Apellido</Text>
      {/* Etiqueta del campo de apellido. */}
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
      />
      {/* Input para capturar el apellido del estudiante. */}

      <Text style={styles.label}>Nivel</Text>
      {/* Etiqueta de la selección del nivel del estudiante. */}
      <View style={styles.niveles}>
        {/* Contenedor flexible para mostrar los chips de nivel. */}
        {NIVELES_PERFIL.map((item) => (
          // Recorre los niveles disponibles para crear una opción por cada uno.
          <NivelChip key={item} etiqueta={item} activo={item === nivel} onPress={() => setNivel(item)} />
          // Muestra cada nivel como chip y actualiza el estado cuando se selecciona.
        ))}
      </View>

      <Text style={styles.label}>Cédula</Text>
      {/* Etiqueta del campo de cédula. */}
      <TextInput
        style={styles.input}
        value={cedula}
        onChangeText={setCedula}
        placeholder="Cédula"
        keyboardType="numeric"
      />
      {/* Input para ingresar solo números de cédula. */}

      <Pressable style={styles.boton} onPress={handleGuardar}>
        {/* Botón para guardar o actualizar el perfil. */}
        <Text style={styles.botonTexto}>{perfil ? 'Actualizar' : 'Guardar'}</Text>
        {/* Texto del botón cambia según si el perfil ya existe o es nuevo. */}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Define los estilos visuales del formulario del perfil.
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  // Establece el fondo general del formulario.
  titulo: typography.subtitulo,
  // Usa la tipografía de subtítulo para el encabezado principal.
  resumen: { color: colors.textoSuave, marginTop: spacing.xs },
  // Muestra un texto breve con los datos actuales del perfil y cantidad de reservas.
  label: { fontWeight: '600', color: colors.texto, marginTop: spacing.lg, marginBottom: spacing.sm },
  // Define el estilo de las etiquetas de cada campo.
  input: {
    backgroundColor: colors.superficie,
    // Usa fondo blanco para cada input del formulario.
    borderWidth: 1,
    // Agrega un borde fino a los campos.
    borderColor: colors.borde,
    // Usa el borde del tema para que todos los inputs se vean consistentes.
    borderRadius: radius.md,
    // Redondea las esquinas del cuadro de texto.
    paddingHorizontal: spacing.lg,
    // Añade espacio horizontal dentro del input.
    height: 46,
    // Define la altura estándar del campo.
    color: colors.texto,
    // Usa el color principal de texto para los datos ingresados.
  },
  niveles: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  // Muestra los chips de nivel en filas y permite que se envuelvan si faltan espacio.
  boton: {
    marginTop: spacing.xl,
    // Separa el botón del resto del formulario.
    backgroundColor: colors.primario,
    // Usa el color principal para el botón de guardar.
    padding: 14,
    // Da espacio interno al botón.
    borderRadius: 8,
    // Redondea las esquinas para un estilo moderno.
    alignItems: 'center',
    // Centra el texto dentro del botón.
  },
  botonTexto: { color: '#fff', fontWeight: '700' },
  // Texto del botón de guardar en blanco y negrita para contraste.
});
