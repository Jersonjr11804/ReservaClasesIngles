import {useState, useEffect, useCallback} from 'react';
// Importa hooks de React para manejar estado, efectos y callbacks reutilizables.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa AsyncStorage para guardar datos persistentes en el dispositivo.

// Hook reutilizable para leer y guardar datos en AsyncStorage.
// Se usa para persistir información como reservas, preferencias o cualquier valor local.
export default function useAlmacenamiento(clave, valorInicial) {
  // Exporta un hook que recibe la clave de almacenamiento y el valor inicial.
  // Estado donde guardamos el valor actual que estamos manejando.
  const [valor, setValor] = useState(valorInicial);
  // Guarda el valor en memoria para que el componente pueda usarlo de forma reactiva.

  // Indica si la carga inicial ya terminó.
  const [listo, setListo] = useState(false);
  // Marca si ya se terminó de cargar la información guardada en memoria local.

  // Cuando cambia la clave, intentamos recuperar el valor guardado.
  useEffect(() => {
    // Ejecuta la lectura al cargar el hook o cuando cambia la clave.
    // Bandera para evitar actualizar el estado si el componente ya se desmontó.
    let activo = true;
    // Controla si el efecto sigue ejecutándose antes de un posible desmontaje.

    AsyncStorage.getItem(clave)
      // Intenta recuperar el valor guardado bajo la clave indicada.
      .then((guardando) => {
        // Procesa la respuesta de AsyncStorage.
        // Si existe algo guardado, lo convertimos de JSON a objeto/array y lo cargamos.
        if (activo && guardando !== null) setValor(JSON.parse(guardando));
        // Si la instancia sigue viva y hay datos, los convierte y los asigna al estado.
      })
      .catch((error) => console.log('Error leyendo ' + clave, error))
      // Si ocurre un error, lo registra en la consola para depurar.
      .finally(() => setListo(true));
      // Aunque falle o no, marca la carga como finalizada.

    return () => {
      // Se ejecuta cuando el componente se desmonta o cuando la dependencia cambia.
      // Cuando el componente desaparece, dejamos la bandera en false.
      activo = false;
      // Evita actualizaciones del estado en un componente desmontado.
    };
  }, [clave]);
  // Re-ejecuta la lectura cuando cambia la clave de almacenamiento.

  // Función para actualizar el valor y guardarlo automáticamente en almacenamiento local.
  const actualizar = useCallback(
    // Memoiza la función para evitar recrearla en cada render.
    async (nuevoValor) => {
      // Recibe el nuevo valor que se desea guardar.
      setValor(nuevoValor);
      // Actualiza el estado local inmediatamente para reflejar el cambio.

      try {
        await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
        // Guarda el valor serializado en almacenamiento local.
      } catch (error) {
        console.log('Error guardando ' + clave, error);
        // Si falla el guardado, registra el error en consola.
      }
    },
    [clave]
    // Re-crea la función solo si cambia la clave del almacenamiento.
  );

  // Se devuelve el valor, si ya cargó y la función para actualizar.
  return { valor, listo, actualizar };
  // Expone el valor actual, el estado de carga y la función para actualizarlo.
}