import React, { useState, useMemo } from 'react';
// Importa React y hooks para manejar estado y memoización en la pantalla de inicio.
import { View, Text, TextInput, ScrollView, FlatList, StyleSheet } from 'react-native';
// Importa los componentes visuales necesarios para listar, buscar y mostrar las clases.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Importa el hook para respetar los márgenes seguros del dispositivo.
import { Ionicons } from '@expo/vector-icons';
// Importa iconos para el buscador y los elementos de la interfaz.
import Card from '../components/Card';
// Importa la tarjeta reutilizable para mostrar cada clase.
import NivelChip from '../components/NivelChip';
// Importa el filtro tipo chip para ordenar por nivel.
import EstadoVacio from '../components/EstadoVacio';
// Importa la vista que se muestra cuando no hay resultados.
import useResponsive from '../hooks/useResponsive';
// Importa el hook para adaptar el diseño a la pantalla actual.
import { colors, radius, spacing, typography } from '../theme';
// Importa los tokens de estilo de la aplicación.
import { NIVELES } from '../data/clases';
// Importa los niveles disponibles para los filtros.
import { useReserva } from '../context/ReservaContext';
// Importa el contexto de reservas para obtener la lista actual de clases con cupos reales.

export default function InicioScreen({ navigation }) {
  // Exporta la pantalla principal con la lista de clases y el buscador.
  const insets = useSafeAreaInsets();
  // Obtiene los márgenes seguros para no sobreponer contenido con barras del sistema.
  const { columnas } = useResponsive();
  // Obtiene la cantidad de columnas adecuadas para la lista según el ancho de la pantalla.
  const { clases } = useReserva();
  // Obtiene la lista de clases desde el contexto para trabajar con cupos actualizados.

  const [nivel, setNivel] = useState('Todos');
  // Guarda el filtro de nivel activo en la pantalla.
  const [busqueda, setBusqueda] = useState('');
  // Guarda el texto que el usuario escribe en el buscador.

  const resultados = useMemo(() => {
    // Memoiza la lista filtrada para no recalcularla en cada render innecesario.
    const texto = busqueda.trim().toLowerCase();
    // Normaliza la búsqueda para que no dependa de mayúsculas ni espacios.
    return clases.filter((clase) => {
      // Recorre todas las clases y aplica los filtros activos.
      const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
      // Verifica que la clase coincida con el nivel elegido o que se hayan elegido todos.
      const coincideTexto =
        !texto ||
        // Si el texto está vacío, acepta todas las clases.
        clase.titulo.toLowerCase().includes(texto) ||
        // Compara el título con el texto buscado, sin importar mayúsculas.
        clase.profesor.nombre.toLowerCase().includes(texto);
        // También busca coincidencias en el nombre del profesor.
      return coincideNivel && coincideTexto;
      // Devuelve true solo si la clase cumple ambos filtros: nivel y texto.
    });
  }, [nivel, busqueda, clases]);
  // Recalcula los resultados si cambia el nivel, la búsqueda o la lista de clases.

  return (
    // Devuelve la estructura visual de la pantalla principal.
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.sm }]}>
      {/* Contenedor principal con espacio seguro superior para no chocar con la barra del sistema. */}
      <Text style={styles.titulo}>Clases de inglés</Text>
      {/* Título principal de la pantalla. */}

      <View style={styles.buscador}>
        {/* Campo visual para buscar clases por nombre o profesor. */}
        <Ionicons name="search" size={18} color={colors.textoSuave} />
        {/* Icono de lupa para indicar que es un buscador. */}
        <TextInput
          style={styles.input}
          placeholder="Buscar por clase o profesor"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCorrect={false}
        />
        {/* Input controlado para capturar lo que busca el usuario. */}
        {busqueda.length > 0 && (
          // Si ya hay texto escrito, muestra un botón para limpiar la búsqueda.
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textoSuave}
            onPress={() => setBusqueda('')}
          />
          // Limpia el texto escrito cuando el usuario toca el icono de cerrar.
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        contentContainerStyle={{ paddingHorizontal: spacing.lg }}
      >
        {/* Permite desplazar horizontalmente los filtros de nivel. */}
        {NIVELES.map((item) => (
          // Recorre todos los niveles permitidos para mostrarlos como chips.
          <NivelChip
            key={item}
            etiqueta={item}
            activo={item === nivel}
            onPress={() => setNivel(item)}
          />
          // Cada chip cambia el nivel activo cuando el usuario lo selecciona.
        ))}
      </ScrollView>

      <FlatList
        key={columnas}
        data={resultados}
        keyExtractor={(item) => item.id}
        numColumns={columnas}
        renderItem={({ item }) => (
          // Renderiza cada clase en una tarjeta con información relevante.
          <Card
            clase={item}
            onPress={() => navigation.navigate('DetalleClase', { claseId: item.id })}
          />
          // Al tocar una tarjeta, navega al detalle de esa clase específica.
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No encontramos resultados"
            mensaje="Esa combinación de búsqueda no tiene resultados"
            onAction={() => {
              setNivel('Todos');
              setBusqueda('');
            }}
          />
          // Muestra un estado vacío cuando la búsqueda no coincide con ninguna clase.
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Define los estilos visuales de la pantalla de inicio.
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  // Establece el fondo general de la pantalla.
  titulo: { ...typography.titulo, paddingHorizontal: spacing.lg },
  // Define el estilo del título principal con la tipografía global.
  buscador: {
    flexDirection: 'row',
    // Coloca icono e input en una línea horizontal.
    alignItems: 'center',
    // Alinea verticalmente el contenido del buscador.
    gap: spacing.sm,
    // Añade separación entre icono y campo de texto.
    backgroundColor: colors.superficie,
    // Usa fondo blanco para distinguir el buscador del fondo.
    borderRadius: radius.md,
    // Redondea las esquinas del input.
    paddingHorizontal: spacing.lg,
    // Añade espacio dentro del buscador a los lados.
    height: 46,
    // Define la altura estándar del buscador.
    marginTop: spacing.lg,
    // Separa el buscador del título.
    marginHorizontal: spacing.lg,
    // Da margen izquierdo y derecho para alinearlo con el contenido.
    borderWidth: 1,
    // Dibuja un borde discreto alrededor del campo.
    borderColor: colors.borde,
    // Usa el borde del tema para armonizar con la app.
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
  // Define la apariencia del texto ingresado en el buscador.
  chips: { flexGrow: 0, marginVertical: spacing.md },
  // Ajusta los filtros de nivel para que no ocupen demasiado espacio vertical.
});
