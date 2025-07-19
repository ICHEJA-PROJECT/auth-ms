# Auth Microservice

Este microservicio, construido con [NestJS](https://nestjs.com/), maneja todos los aspectos relacionados con la autenticación y gestión de usuarios dentro del ecosistema de la aplicación.

## Propósito del Dominio de Negocio

El `auth-ms` es responsable de:

- **Registro de Estudiantes:** Captura los datos del estudiante, genera un token de identidad y lo codifica en un código QR único.
- **Login de Estudiantes:** Valida a los estudiantes mediante la lectura de su código QR.
- **Comunicación Externa:** Se conecta con un servicio de subida de imágenes para almacenar los códigos QR generados.

---

## Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas antes de empezar:

- [Node.js](https://nodejs.org/) (v20 o superior recomendada)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

---

## Ejecución del Servicio

Puedes ejecutar el servicio de dos maneras: localmente para desarrollo o usando Docker para un entorno de producción simulado.

### 1. Configuración de Variables de Entorno

Antes de ejecutar la aplicación, crea un archivo `.env` en la raíz del proyecto. Puedes usar el archivo `.env.example` como plantilla.

```bash
# Copia la plantilla
cp .env.example .env
```

Abre el archivo `.env` y rellena las variables necesarias:

```env
# .env

# DB Connection (usadas por la app y por Docker Compose)
DB_USERNAME=postgres
DB_PASSWORD=1234567
DB_NAME=authdb
DB_HOST=localhost # Cambiar a 'auth-db' si se corre con Docker
DB_PORT=5432

# JWT Secrets
JWT_SECRET=TU_SECRETO_DE_JWT_AQUI
JWT_EXPIRATION=2h

# Custom Encryption Key
ENCRYPTION_KEY=UNA_LLAVE_DE_32_BYTES_MUY_LARGA_Y_SEGURA

# External Services
UPLOAD_IMAGE_SERVICE_URL=http://localhost:8080 # URL de tu servicio de Quarkus
```

### 2. Ejecución Local (Modo Desarrollo)

Ideal para desarrollar y ver los cambios en tiempo real.

```bash
# 1. Instalar dependencias
$ npm install

# 2. Iniciar la base de datos (si la necesitas)
$ docker-compose up -d auth-db

# 3. Iniciar la aplicación en modo watch
$ npm run start:dev
```

### 3. Ejecución con Docker (Modo Producción)

Esto simula el entorno de producción, construyendo la imagen optimizada y levantando todos los servicios.

**Importante:** Asegúrate de que en tu archivo `.env`, la variable `DB_HOST` esté establecida en `auth-db`.

```bash
# Levantar todos los servicios definidos en docker-compose.yml
$ docker-compose up --build
```

---

## Documentación de la API (Swagger)

Una vez que la aplicación esté corriendo (localmente o con Docker), puedes acceder a la documentación interactiva de la API generada por Swagger en la siguiente URL:

[http://localhost:3000/docs](http://localhost:3000/docs)

La documentación se actualiza automáticamente y te permite probar los endpoints directamente desde el navegador.
