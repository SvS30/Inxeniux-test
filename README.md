# Inxeniux-test
Test Técnico: Inxeniux Backend

### Requerimientos
- NodeJS >= v14.18.2
- npm >= v8.3.0
- MongoDB >= v5.0

### Instalación
1. Clonar `.env.example` y renombrar copia a `.env`.
2. Configurar variables de entorno en .env.
    ```
    BACKEND_PORT=  <- puerto en el que correra el backend
    BACKEND_URL=  <- URL en el que correra el backend para consumir en el frontend
    MONGO_URI=  <- URI de conexión a MongoDB
    ```
3. Instalar dependencias, ejecutar `npm install`.

### Scripts
En el directorio del proyecto, puede ejecutar:

#### `npm start`
Ejecuta la aplicación en modo de desarrollo.
Abra [http://localhost:3000](http://localhost:3000) para ver la app.

#### `npm test`
Ejecuta las *pruebas* en modo de `interactive watch`.

#### `npm run build`
Compila el proyecto y genera el proyecto minificado en la carpeta `/build`, con ello se agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hashes.

¡Su aplicación está lista para implementarse!

#### `npm run backend`
Ejecute la aplicación backend en modo de desarrollo en [http://localhost](http://localhost) con el puerto indicado en la variables de entorno `BACKEND_PORT` para realizar solicitudes.
