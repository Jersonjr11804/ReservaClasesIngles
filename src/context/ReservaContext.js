import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    createContext,
    useContext,
} from 'react';
// Importa React y hooks necesarios para crear un contexto global con estado y memoización.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa AsyncStorage para guardar y leer reservas y perfil en almacenamiento local.
import { clases as CLASES_INICIALES } from '../data/clases';
// Importa la base de clases iniciales para calcular cupos reales según las reservas.

// Claves que usamos en AsyncStorage para guardar los datos.
const CLAVE_RESERVAS = '@reservas_ingles';
// Identificador para almacenar la lista de reservas del usuario.
const CLAVE_PERFIL = '@perfil_ingles';
// Identificador para guardar la información del perfil del estudiante.

// Contexto que comparte reservas, perfil y clases con toda la app.
export const ReservasContext = createContext(null);
// Crea el contexto global para compartir estados de reserva y perfil en toda la aplicación.

export function ReservasProvider({ children }) {
    // Define el proveedor del contexto con acceso a reservas, perfil y clases calculadas.
    // Lista de reservas: cada una es { id, claseId, horario, creadoEn }
    const [reservas, setReservas] = useState([]);
    // Almacena la lista de reservas actuales del estudiante.

    // Perfil del estudiante (null si todavía no se ha registrado)
    const [perfil, setPerfil] = useState(null);
    // Guarda el perfil del usuario si ya ha completado el registro.

    // Indica si aún estamos leyendo lo guardado en el teléfono
    const [cargando, setCargando] = useState(true);
    // Mantiene un estado de carga mientras se leen datos persistidos del dispositivo.

    // Al montar: leemos reservas y perfil guardados.
    useEffect(() => {
        // Ejecuta la carga inicial al montar el proveedor.
        const cargar = async () => {
            // Función asíncrona que recupera los datos guardados en almacenamiento local.
            try {
                const guardadas = await AsyncStorage.getItem(CLAVE_RESERVAS);
                // Intenta recuperar las reservas guardadas por clave.
                if (guardadas !== null) {
                    const lista = JSON.parse(guardadas);
                    // Convierte texto JSON a una estructura de JavaScript.
                    if (Array.isArray(lista)) {
                        // Verifica que el valor guardado sea una lista válida.
                        // Solo aceptamos reservas con el formato nuevo
                        setReservas(lista.filter((r) => r.claseId && r.horario));
                        // Filtra solo reservas con clase e horario válidos para evitar corrupción.
                    }
                }

                const guardadoPerfil = await AsyncStorage.getItem(CLAVE_PERFIL);
                // Recupera la información del perfil guardada en almacenamiento local.
                if (guardadoPerfil !== null) {
                    setPerfil(JSON.parse(guardadoPerfil));
                    // Convierte la cadena guardada en objeto y la guarda en estado.
                }
            } catch (error) {
                console.log('Error leyendo los datos guardados:', error);
                // Muestra un error si falla la lectura del almacenamiento.
            } finally {
                setCargando(false);
                // Finaliza la carga aunque haya ocurrido o no un error.
            }
        };

        cargar();
        // Inicia la carga inicial.
    }, []);

    // Cada vez que cambian las reservas, las guardamos.
    useEffect(() => {
        // Ejecuta una persistencia cada vez que se modifica la lista de reservas.
        if (cargando) return;
        // Si todavía se está cargando la data inicial, no guarda para evitar sobrescribir.
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) =>
            console.log('Error guardando las reservas:', error)
        );
        // Guarda la lista de reservas serializada en AsyncStorage.
    }, [reservas, cargando]);

    // Cada vez que cambia el perfil, lo guardamos.
    useEffect(() => {
        // Ejecuta persistencia cada vez que se actualiza el perfil.
        if (cargando || perfil === null) return;
        // No guarda si la app aún está cargando o si el perfil está vacío.
        AsyncStorage.setItem(CLAVE_PERFIL, JSON.stringify(perfil)).catch((error) =>
            console.log('Error guardando el perfil:', error)
        );
        // Guarda el perfil serializado para que persista entre sesiones.
    }, [perfil, cargando]);

    // Los cupos no se guardan: se calculan restando las reservas a los cupos
    // iniciales de cada clase. Así siempre son coherentes con las reservas.
    const clases = useMemo(
        // Memoiza el cálculo para evitar recálculos innecesarios.
        () =>
            CLASES_INICIALES.map((c) => ({
                // Recorre cada clase base y crea una versión con cupos ajustados.
                ...c,
                // Copia la clase original para mantener sus datos.
                cupos: Math.max(
                    0,
                    // Evita que los cupos queden en números negativos.
                    c.cupos - reservas.filter((r) => r.claseId === c.id).length
                    // Resta la cantidad de reservas activas de esta clase para obtener cupos reales.
                ),
            })),
        [reservas]
        // Recalcula la lista cada vez que cambian las reservas.
    );

    // El horario ya incluye el día (ej. 'Lun 7:00 a.m.'),
    // así que comparar el texto sirve para "mismo día y mismo horario".
    const reservarClase = useCallback(
        // Función memoizada para reservar una clase desde cualquier pantalla.
        (claseId, horario) => {
            // Recibe el id de la clase y el horario elegido por el usuario.
            const clase = clases.find((c) => c.id === claseId);
            // Busca la clase actual dentro de la lista calculada.
            if (!clase) return { ok: false, mensaje: 'La clase no existe.' };
            // Si no existe, devuelve un mensaje de error.

            // Los horarios son fijos: solo se puede elegir uno de la lista de la clase
            if (!clase.horarios.includes(horario)) {
                // Valida que el horario elegido sea válido para la clase.
                return { ok: false, mensaje: 'Ese horario no existe para esta clase.' };
                // Devuelve un error si el horario no está habilitado.
            }

            if (clase.cupos <= 0) {
                // Verifica que aún existan cupos diponibles para la clase.
                return { ok: false, mensaje: 'No hay cupos disponibles.' };
                // Devuelve error cuando la clase está llena.
            }

            // No se permite otra clase en el mismo día y horario
            const choque = reservas.find((r) => r.horario === horario);
            // Busca si ya existe otra reserva en el mismo horario para impedir conflictos.
            if (choque) {
                const otra = clases.find((c) => c.id === choque.claseId);
                // Busca la otra clase que ocupa ese horario para mostrar un mensaje útil.
                return {
                    ok: false,
                    mensaje: 'Ya tienes reservada "' + otra.titulo + '" el ' + horario + '.',
                    // Indica qué reserva ya está en conflicto con el nuevo intento.
                };
            }

            const nueva = {
                // Crea el objeto que se guarda como nueva reserva.
                id: claseId + '|' + horario,
                // Genera un identificador único combinando la clase y el horario.
                claseId,
                // Guarda el identificador de la clase reservada.
                horario,
                // Guarda el horario escogido por el usuario.
                creadoEn: new Date().toISOString(),
                // Guarda la fecha exacta en la que se realizó la reserva.
            };
            setReservas((previas) => [nueva, ...previas]);
            // Inserta la nueva reserva al inicio de la lista para que aparezca primero.
            return { ok: true, mensaje: 'Reserva confirmada.' };
            // Devuelve éxito si la reserva fue creada correctamente.
        },
        [clases, reservas]
        // Re-usa la lógica solo cuando cambien las clases o reservas.
    );

    const cancelarReserva = useCallback((reservaId) => {
        // Función memoizada para cancelar una reserva por su id.
        setReservas((previas) => previas.filter((r) => r.id !== reservaId));
        // Elimina la reserva cuyo id coincide con el indicado.
    }, []);

    const guardarPerfil = useCallback((datos) => {
        // Función memoizada para guardar el perfil del estudiante.
        setPerfil(datos);
        // Actualiza el perfil con la información proporcionada por el formulario.
    }, []);

    const valor = useMemo(
        // Memoiza el objeto expuesto por el contexto para evitar re-renders innecesarios.
        () => ({
            cargando,
            // Indica si la app aún está cargando datos persistidos.
            clases,
            // Expone las clases con cupos calculados.
            reservas,
            // Expone la lista de reservas activas.
            perfil,
            // Expone la información del perfil del estudiante.
            reservarClase,
            // Expone la función para crear una reserva.
            cancelarReserva,
            // Expone la función para eliminar una reserva.
            guardarPerfil,
            // Expone la función para guardar o actualizar el perfil.
        }),
        [cargando, clases, reservas, perfil, reservarClase, cancelarReserva, guardarPerfil]
        // Recalcula el valor solo si cambian estas dependencias.
    );

    // Mientras se leen los datos guardados no mostramos la app. Así, cuando
    // PerfilScreen se abre, el perfil ya está cargado y el formulario sale lleno.
    if (cargando) return null;
    // Si todavía está cargando, devuelve null para evitar mostrar la interfaz incompleta.

    return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>;
    // Provee el valor del contexto a todos los componentes hijos.
}

// Hook que usan las pantallas. Lanza error si se usa fuera del Provider.
export function useReserva() {
    // Hook público para consumir el contexto de reservas desde pantallas y componentes.
    const ctx = useContext(ReservasContext);
    // Obtiene el valor actual del contexto.
    if (!ctx) throw new Error('useReserva debe usarse dentro de un ReservasProvider');
    // Lanza un error si el hook se usa sin el provider correcto.
    return ctx;
    // Devuelve el contenido del contexto para que el componente pueda usarlo.
}