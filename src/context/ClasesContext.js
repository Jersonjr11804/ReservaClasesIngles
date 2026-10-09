import React, { createContext, useContext, useState } from 'react';
// Importa React y los hooks necesarios para crear un contexto y manejar su estado interno.
import { CLASES as CLASES_INICIALES } from '../data/clases';
// Importa la lista base de clases desde el archivo de datos para iniciar el estado.

const ClasesContext = createContext(null);
// Crea el contexto global para compartir el estado de clases entre componentes.

export function ClasesProvider({ children }) {
  // Define el proveedor que expone el estado de las clases a la app.
  const [clases, setClases] = useState(CLASES_INICIALES);
  // Inicializa la lista de clases con la data base y permite actualizarla reactivamente.
  const [reservadas, setReservadas] = useState(new Map());
  // Guarda las clases que ya han sido reservadas por usuario como un Map por id y horario.

  function reservarClase(id, horario) {
    // Función para reservar una clase y descontar un cupo si existe disponibilidad.
    const idx = clases.findIndex((c) => c.id === id);
    // Busca la posición exacta de la clase dentro del arreglo para validarla.
    if (idx === -1) return false;
    // Si la clase no existe, no permite la reserva y devuelve false.
    if (clases[idx].cupos <= 0) return false;
    // Si no hay cupos disponibles, no permite reservar.
    setClases((prev) =>
      // Actualiza la lista de clases con el nuevo cupo restado.
      prev.map((c) => (c.id === id ? { ...c, cupos: c.cupos - 1 } : c))
      // Reemplaza la clase reservada por una copia con el cupo reducido en 1.
    );
    setReservadas((prev) => new Map(prev).set(id, horario));
    // Guarda la clase reservada en el Map asociando el id con su horario.
    return true;
    // Devuelve true para confirmar la operación satisfactoria.
  }

  function cancelarClase(id) {
    // Función para cancelar la reserva de una clase y devolver el cupo.
    const idx = clases.findIndex((c) => c.id === id);
    // Busca la clase en el arreglo para validar que exista.
    if (idx === -1) return false;
    // Si la clase no existe, no permite cancelar y devuelve false.
    setClases((prev) => prev.map((c) => (c.id === id ? { ...c, cupos: c.cupos + 1 } : c)));
    // Vuelve a sumar un cupo a esa clase al cancelarse la reserva.
    setReservadas((prev) => {
      // Actualiza el Map de reservadas eliminando la entrada del id dado.
      const next = new Map(prev);
      // Crea una copia del Map actual para no mutar el estado directo.
      next.delete(id);
      // Elimina la reserva asociada al id de la clase.
      return next;
      // Devuelve el new Map actualizado para que React re-renderice.
    });
    return true;
    // Devuelve true para confirmar que la cancelación fue exitosa.
  }

  return (
    // Devuelve el proveedor con el valor compartido para los componentes hijos.
    <ClasesContext.Provider value={{ clases, reservarClase, cancelarClase, reservadas }}>
      {/* Expone las clases, la función para reservar, la de cancelar y las reservadas. */}
      {children}
      {/* Renderiza los componentes hijos que consumen el contexto. */}
    </ClasesContext.Provider>
  );
}

export function useClases() {
  // Hook para consumir el contexto de clases desde cualquier componente.
  const ctx = useContext(ClasesContext);
  // Obtiene el valor del contexto actual para usarlo en el componente.
  if (!ctx) throw new Error('useClases must be used within ClasesProvider');
  // Si se usa fuera del proveedor, lanza un error para avisar al desarrollador.
  return ctx;
  // Devuelve el contenido del contexto para que el componente pueda usarlo.
}

export default ClasesContext;
// Exporta el contexto como valor por defecto para usos adicionales si se requiere.