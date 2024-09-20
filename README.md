## Descripción del Proyecto
Este proyecto es una aplicación web desarrollada utilizando React y Redux, diseñada para gestionar posts y usuarios. La estructura del proyecto ha sido optimizada para ser escalable y fácil de mantener, siguiendo las mejores prácticas en el desarrollo de aplicaciones modernas con React.

## Requisitos
Node.js: Versión 18.19.1 necesaria para asegurar compatibilidad con todas las dependencias y herramientas del proyecto.

## Estructura del Proyecto
```/components```: Contiene todos los componentes reutilizables como PostCard, PostDialog y UserTable, los cuales son fundamentales para la construcción de las interfaces de usuario.

```/pages```: Directorio que aloja los componentes de las páginas AdminPanel, Dashboard y Login, que utilizan componentes del directorio de components para ensamblar las interfaces completas.

```/redux```: Incluye la configuración de Redux con authSlice.js para la gestión de autenticación y store.js para configurar el almacenamiento global de estado, lo que facilita la gestión del estado a lo largo de la aplicación.

```/routes```: Contiene PrivateRoute.tsx, un componente que asegura que ciertas interfaces solo sean accesibles para usuarios autenticados.

```/services```: Este directorio contiene api.js y auth.js, que encapsulan las llamadas a APIs y la lógica de autenticación, respectivamente, segregando la lógica de negocio de la presentación de la interfaz.

```/types```: Define los tipos y las interfaces utilizadas en toda la aplicación, contribuyendo a mantener un código robusto y bien tipificado, lo que es esencial para la escalabilidad y mantenibilidad.

## Patrón de Diseño Utilizado
Este proyecto utiliza el patrón Redux para la gestión del estado, ofreciendo un estado global para toda la aplicación que facilita la comunicación entre componentes y mejora la gestión del estado sin necesidad de propagación de propiedades (prop drilling) o contextos complejos.

## Instalación y Ejecución

### Backend
Ejecuta ```npm install``` en el directorio /backend para instalar las dependencias.
Ejecuta ```npm start``` para iniciar el servidor de desarrollo.

### Frontend
Ejecuta ```npm install``` para instalar las dependencias.
Ejecuta ```npm start``` para iniciar el servidor de desarrollo en el entorno local.
