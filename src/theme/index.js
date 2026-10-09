import { Platform } from 'react-native';
// Importa Platform para detectar si la app se está ejecutando en iOS o Android y adaptar estilos.

// Paleta de colores base para la app.
export const colors = {
  // Define el fondo principal de la aplicación.
  fondo: '#F6F7FB',
  // Define el fondo de las tarjetas y contenedores principales.
  superficie: '#FFFFFF',
  // Establece el color principal usado en acciones importantes.
  primario: '#4F46E5',
  // Define una versión más oscura del color principal para estados hover o tonos profundos.
  primarioOscuro: '#3730A3',
  // Define una versión suave del color principal para fondos y resaltados.
  primarioSuave: '#EEF0FF',
  // Define el color de acento para usos secundarios o indicadores visuales.
  acento: '#F59E0B',
  // Define una versión clara del color de acento para fondos suaves.
  acentoSuave: '#FEF3C7',
  // Define el color verde que representa éxito o disponibilidad.
  exito: '#0E9F6E',
  // Define el color rojo para alertas, peligros o acciones destructivas.
  peligro: '#E11D48',
  // Define el color principal del texto visible en la interfaz.
  texto: '#111827',
  // Define el color del texto secundario o de apoyo.
  textoSuave: '#6B7280',
  // Define el color del borde entre elementos visuales.
  borde: '#E5E7EB',
};

// Escala de espaciado basada en múltiplos de 4 para mantener consistencia visual.
export const spacing = {
  // Espaciado extra pequeño.
  xs: 4,
  // Espaciado pequeño.
  sm: 8,
  // Espaciado medio.
  md: 12,
  // Espaciado grande.
  lg: 16,
  // Espaciado extra grande.
  xl: 24,
  // Espaciado doble.
  xxl: 32,
};

// Radios de borde para redondear tarjetas, botones y chips.
export const radius = {
  // Radio pequeño.
  sm: 8,
  // Radio medio.
  md: 14,
  // Radio grande.
  lg: 20,
  // Radio circular completo.
  full: 999,
};

// Tipografías reutilizables para títulos, subtítulos y texto general.
export const typography = {
  // Define el estilo de títulos principales de pantallas.
  titulo: { fontSize: 26, fontWeight: '800', color: colors.texto },
  // Define el estilo de subtítulos secundarios.
  subtitulo: { fontSize: 18, fontWeight: '700', color: colors.texto },
  // Define el estilo del texto normal del cuerpo.
  cuerpo: { fontSize: 15, color: colors.texto },
  // Define el estilo del texto secundario de menor relevancia.
  secundario: { fontSize: 13, color: colors.textoSuave },
  // Define el estilo para etiquetas o texto de apoyo.
  etiqueta: { fontSize: 12, fontWeight: '600' },
};

// Sombra adaptable según la plataforma para que la UI se vea bien en iOS y Android.
export const sombra = Platform.select({
  // Configura la sombra para iOS con offset y radio personalizados.
  ios: {
    shadowColor: '#0F172A',
    // Define el color de la sombra en iOS.
    shadowOpacity: 0.08,
    // Define la transparencia de la sombra.
    shadowRadius: 12,
    // Define el tamaño del desenfoque de la sombra.
    shadowOffset: { width: 0, height: 4 },
    // Define la dirección de la sombra para simular elevación.
  },
  // Configura la elevación para Android.
  android: { elevation: 3 },
});

// Relación entre cada nivel de inglés y el color que se va a mostrar en la etiqueta.
export const coloresPorNivel = {
  // Asigna el color verde al nivel básico.
  Basico: colors.exito,
  // Asigna el color principal al nivel intermedio.
  Intermedio: colors.primario,
  // Asigna el color de acento al nivel avanzado.
  Avanzado: colors.acento,
  // Asigna un color morado para el nivel conversacional.
  Conversacional: '#7C3AED',
};

export default { colors, spacing, radius, typography, sombra, coloresPorNivel };
// Exporta el conjunto completo de tokens visuales para reutilizarlos en la app.