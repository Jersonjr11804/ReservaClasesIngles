import { registerRootComponent } from 'expo';
// Importa la función que registra la app principal para que Expo la ejecute correctamente.

import App from './App';
// Importa el componente principal de la aplicación para registrarlo como pantalla raíz.

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// La función registra el componente principal de la app para que Expo lo inicie como pantalla inicial.
// It also ensures that whether you load the app in Expo Go or in a native build,
// También asegura que la app funcione tanto en Expo Go como en una compilación nativa.
// the environment is set up appropriately
// y que el entorno esté configurado de forma correcta para ejecutar la aplicación.
registerRootComponent(App);
// Ejecuta el registro del componente principal para arrancar la aplicación.
