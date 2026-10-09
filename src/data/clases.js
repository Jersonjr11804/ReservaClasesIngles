export const NIVELES = ['Todos', 'Basico', 'Intermedio', 'Avanzado', 'Conversacional'];
// Define los filtros disponibles para la pantalla principal y el perfil del estudiante.
 
export const clases = [
  // Arreglo principal con las clases disponibles en la app.
  {
    id: '1',
    // Identificador único de la clase.
    titulo: 'Inglés desde cero',
    // Nombre visible de la clase para mostrar en la lista y detalle.
    nivel: 'Basico',
    // Nivel de inglés que corresponde a esta clase.
    descripcion:
      'Construye tus primeras frases, saludos y presentaciones personales. Ideal si nunca has estudiado inglés formalmente.',
      // Explicación breve del objetivo educativo de la clase.
    profesor: { nombre: 'Laura Gómez', pais: 'Colombia', foto: 'https://i.pravatar.cc/200?img=45' },
    // Objeto con los datos del profesor que enseña la clase.
    imagen: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    // URL de la imagen representativa de la clase.
    precio: 32000,
    // Precio en pesos colombianos para la clase.
    duracion: 50,
    // Duración estimada de la sesión en minutos.
    modalidad: 'Virtual',
    // Forma de impartición del curso.
    rating: 4.8,
    // Calificación promedio según opiniones o experiencia.
    cupos: 6,
    // Número inicial de asientos disponibles para la clase.
    horarios: ['Lun 7:00 a.m.', 'Mié 7:00 a.m.', 'Vie 6:00 p.m.'],
    // Lista de horarios disponibles para reservar la sesión.
  },
  {
    id: '2',
    titulo: 'Conversación cotidiana',
    nivel: 'Conversacional',
    descripcion:
      'Práctica oral en grupos pequeños con temas del día a día: viajes, comida, trabajo y cultura.',
    profesor: { nombre: 'Michael Reed', pais: 'Estados Unidos', foto: 'https://i.pravatar.cc/200?img=12' },
    imagen: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    precio: 45000,
    duracion: 60,
    modalidad: 'Virtual',
    rating: 4.9,
    cupos: 4,
    horarios: ['Mar 6:00 p.m.', 'Jue 6:00 p.m.', 'Sáb 10:00 a.m.'],
  },
  {
    id: '3',
    titulo: 'Inglés para entrevistas',
    nivel: 'Avanzado',
    descripcion:
      'Prepara tu hoja de vida, responde preguntas técnicas y practica entrevistas simuladas en inglés.',
    profesor: { nombre: 'Sofía Ramírez', pais: 'México', foto: 'https://i.pravatar.cc/200?img=32' },
    imagen: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    precio: 58000,
    duracion: 60,
    modalidad: 'Presencial',
    rating: 4.7,
    cupos: 3,
    horarios: ['Lun 8:00 p.m.', 'Mié 8:00 p.m.'],
  },
  {
    id: '4',
    titulo: 'Gramática intermedia',
    nivel: 'Intermedio',
    descripcion:
      'Tiempos verbales, condicionales y voz pasiva explicados con ejercicios prácticos y retroalimentación.',
    profesor: { nombre: 'Andrés Villa', pais: 'Colombia', foto: 'https://i.pravatar.cc/200?img=68' },
    imagen: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    precio: 38000,
    duracion: 50,
    modalidad: 'Virtual',
    rating: 4.6,
    cupos: 8,
    horarios: ['Mar 7:00 a.m.', 'Jue 7:00 a.m.', 'Sáb 9:00 a.m.'],
  },
  {
    id: '5',
    titulo: 'Pronunciación y acento',
    nivel: 'Intermedio',
    descripcion:
      'Trabaja sonidos difíciles, entonación y ritmo para que te entiendan a la primera.',
    profesor: { nombre: 'Emma Clarke', pais: 'Reino Unido', foto: 'https://i.pravatar.cc/200?img=24' },
    imagen: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    precio: 42000,
    duracion: 45,
    modalidad: 'Virtual',
    rating: 4.9,
    cupos: 5,
    horarios: ['Lun 7:00 a.m.', 'Vie 5:00 p.m.'],
  },
  {
    id: '6',
    titulo: 'Business English',
    nivel: 'Avanzado',
    descripcion:
      'Reuniones, correos y presentaciones corporativas. Vocabulario técnico y expresiones formales.',
    profesor: { nombre: 'Daniel Ortiz', pais: 'España', foto: 'https://i.pravatar.cc/200?img=59' },
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    precio: 65000,
    duracion: 60,
    modalidad: 'Presencial',
    rating: 4.8,
    cupos: 4,
    horarios: ['Mié 6:00 a.m.', 'Vie 6:00 a.m.'],
  },
  {
    id: '7',
    titulo: 'Club de lectura en inglés',
    nivel: 'Conversacional',
    descripcion:
      'Leemos cuentos cortos y los comentamos en voz alta. Amplía vocabulario sin memorizar listas.',
    profesor: { nombre: 'Carolina Peña', pais: 'Colombia', foto: 'https://i.pravatar.cc/200?img=47' },
    imagen: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    precio: 28000,
    duracion: 45,
    modalidad: 'Virtual',
    rating: 4.5,
    cupos: 10,
    horarios: ['Jue 6:00 p.m.', 'Sáb 11:00 a.m.'],
  },
  {
    id: '8',
    titulo: 'Inglés para viajar',
    nivel: 'Basico',
    descripcion:
      'Aeropuerto, hotel, restaurante y emergencias. Frases listas para usar en tu próximo viaje.',
    profesor: { nombre: 'Julián Mesa', pais: 'Colombia', foto: 'https://i.pravatar.cc/200?img=51' },
    imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    precio: 30000,
    duracion: 45,
    modalidad: 'Virtual',
    rating: 4.7,
    cupos: 7,
    horarios: ['Mar 8:00 p.m.', 'Sáb 8:00 a.m.'],
  },
];
 
export const formatearPrecio = (valor) =>
  // Convierte un número a formato monetario con separadores y la etiqueta COP.
  '$' + valor.toLocaleString('es-CO') + ' COP';