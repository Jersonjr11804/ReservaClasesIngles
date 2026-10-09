import { useContext } from "react";
// Importa el hook useContext para leer un contexto compartido desde React.
import { ReservasContext } from "./context/ReservasContext";
// Importa el contexto de reservas para consumir el estado global de la app.

// Hook personalizado para consumir el contexto de reservas desde cualquier componente.
// Hace más fácil acceder al estado compartido sin repetir useContext en cada pantalla.
export default function useReserva() {
    // Exporta el hook para reutilizar la lógica del contexto de reservas.
    // Obtiene el valor actual del contexto de reservas.
    const contexto = useContext(ReservasContext);
    // Accede al valor actual del proveedor para leer reservas, perfil y funciones del contexto.

    // Si se usa fuera del proveedor, lanza un error para avisar al desarrollador.
    if (!contexto) {
        // Verifica que el hook se esté usando dentro de su proveedor correcto.
        throw new Error("useReserva debe ser usado dentro de un <ReservasProvider>");
        // Lanza una excepción útil para detectar errores de uso del contexto.
    }

    // Devuelve los datos del contexto para que el componente pueda usarlos.
    return contexto;
    // Retorna el objeto compartido por el proveedor para que el componente lo utilice.
};