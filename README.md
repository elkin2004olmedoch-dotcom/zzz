# Ogadmin Productos API

API REST en Node.js + Express para gestionar productos con PostgreSQL y Prisma. La solución sigue una arquitectura MVC simple, con validación de entrada, manejo de errores y soporte para despliegue en Render.

## Stack

- Node.js 20+
- Express
- PostgreSQL
- Prisma ORM
- GitHub Actions
- Render

## Arquitectura

La aplicación está separada por capas:

- Rutas: [src/routes/productRoutes.js](src/routes/productRoutes.js)
- Controladores: [src/controllers/productController.js](src/controllers/productController.js)
- Modelos: [src/models/productModel.js](src/models/productModel.js)
- Middleware: [src/middleware/validateProduct.js](src/middleware/validateProduct.js)
- Configuración DB: [src/config/db.js](src/config/db.js) y [src/config/prisma.js](src/config/prisma.js)
- Entrada de la app: [src/server.js](src/server.js)

## Base de datos

Base de datos local de desarrollo por Docker:

- Nombre: `ogadmin`
- Puerto: `5433`

Tabla principal:

| Campo | Tipo | Descripción |
|---|---|---|
| id | INT | Identificador |
| nombre | VARCHAR(100) | Nombre del producto |
| categoria | VARCHAR(100) | Categoría |
| pvp | DECIMAL(10,2) | Precio |

## Requisitos

- Docker Desktop
- Node.js 20+
- Git
- GitHub account
- Render account

## Ejecución local

1. Levanta la base de datos:

```bash
docker compose up -d
```

2. Instala dependencias:

```bash
npm install
```

3. Genera el cliente Prisma:

```bash
npx prisma generate
```

4. Inicia la API:

```bash
npm start
```

5. Abre:

- http://localhost:5052
- http://localhost:5052/api/health

## Variables de entorno

El proyecto usa este archivo de ejemplo:

- [.env.example](.env.example)

Contenido recomendado:

```env
PORT=5052
DB_HOST=localhost
DB_PORT=5433
DB_NAME=ogadmin
DB_USER=postgres
DB_PASSWORD=ogadmin_local
DATABASE_URL="postgresql://postgres:ogadmin_local@localhost:5433/ogadmin?schema=public"
```

## API

### Listar productos

```http
GET /api/productos?page=1&limit=100
```

### Obtener producto por id

```http
GET /api/productos/:id
```

### Crear producto

```http
POST /api/productos
```

Body:

```json
{
  "nombre": "Monitor Samsung",
  "categoria": "Monitores",
  "pvp": 220.00
}
```

### Reemplazar producto

```http
PUT /api/productos/:id
```

### Actualizar parcialmente

```http
PATCH /api/productos/:id
```

### Eliminar producto

```http
DELETE /api/productos/:id
```

## CI/CD

Se incluye GitHub Actions para:

- validación de la app
- Pruebas de sintaxis
- Prisma validation
- auditoría de dependencias
- seguridad con CodeQL
- despliegue automático a Render mediante un deploy hook

Archivos:

- [.github/workflows/ci.yml](.github/workflows/ci.yml)
- [.github/workflows/security.yml](.github/workflows/security.yml)
- [.github/workflows/deploy-render.yml](.github/workflows/deploy-render.yml)

## Seguridad

Se ejecuta:

```bash
npm run audit:prod
```

Además, GitHub Actions ejecuta escaneos de seguridad con CodeQL para detectar vulnerabilidades.

## Deploy en Render

Archivo de configuración:

- [render.yaml](render.yaml)

Importante:

- La base de datos local Docker no es accesible desde Render.
- Para desplegar en producción debes usar una base de datos PostgreSQL gestionada, ya sea en Render o en otra infraestructura pública.
- En Render debes asignar la variable `DATABASE_URL` con la cadena de conexión real.

## GitHub y repositorio

La nota con los pasos para crear el repo se encuentra en:

- [NOTAS_REPO_GITHUB.md](NOTAS_REPO_GITHUB.md)

## Flujo recomendado

1. Crear repo en GitHub.
2. Inicializar repo local.
3. Subir código.
4. Conectar GitHub Actions.
5. Configurar secreto `RENDER_DEPLOY_HOOK_URL` en GitHub.
6. Crear servicio web en Render.
7. Añadir `DATABASE_URL` y variables del entorno.
8. Desplegar automáticamente en cada push a main.

## Mejoras futuras

- autenticación JWT
- paginación avanzada
- filtros por categoría
- logs estructurados
- pruebas automatizadas con Jest/Supertest
- carga de imágenes o archivos
- gestión de roles y permisos
