import { useWindowDimensions } from "react-native";
// Importa el hook de React Native para conocer las dimensiones actuales de la pantalla.

export default function useResponsive(){
    // Exporta un hook para adaptar la UI según el tamaño y orientación de la pantalla.
    const { width, height } = useWindowDimensions ();
    // Obtiene el ancho y alto de la ventana actual para tomar decisiones visuales.

    const esTablet = width >=768;
    // Define si la pantalla tiene un ancho equivalente a una tablet o más grande.
    const esHorizontal = width > height
    // Detecta si la pantalla está en orientación horizontal.

     return{
        width,
        // Devuelve el ancho actual para poder usarlo en componentes.
        height,
        // Devuelve el alto actual para medir espacios o adaptaciones.
        esTablet,
        // Expone el booleano que indica si es tablet.
        esHorizontal,
        // Expone el booleano que indica si la pantalla está horizontal.
        columnas: esTablet ?2:1,
        // Define la cantidad de columnas que se debe mostrar en la lista.
        anchoTarjeta: esTablet ? 320 : Math.min (width * 0.72,300),
        // Calcula el ancho ideal de cada tarjeta según el tamaño de la pantalla.
        paddingHorizontal: esTablet ? 32 : 16
        // Ajusta el padding horizontal según el tipo de pantalla para mantener diseño responsivo.
     };
}