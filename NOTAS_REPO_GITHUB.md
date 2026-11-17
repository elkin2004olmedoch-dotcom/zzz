# Notas para GitHub y despliegue

## Repositorio a crear

Crea un repositorio público o privado en GitHub con este nombre:

- `ogadmin-productos-api`

URL sugerida:

- `https://github.com/<TU_USUARIO>/ogadmin-productos-api.git`

> No puedo crear el repositorio remoto desde aquí sin credenciales de GitHub, pero esta es la URL que debes usar para el push final.

## Flujo recomendado

1. Inicializa el repositorio local:
   - `git init`
   - `git checkout -b main`
2. Añade los archivos:
   - `git add .`
3. Haz el primer commit:
   - `git commit -m "feat: primera versión API productos con Prisma"`
4. Conecta el repositorio remoto:
   - `git remote add origin https://github.com/<TU_USUARIO>/ogadmin-productos-api.git`
5. Sube los cambios:
   - `git push -u origin main`

## Reglas para CI/CD

- GitHub Actions ejecuta validaciones en cada push.
- Se revisa sintaxis, Prisma, seguridad (`npm audit`) y CodeQL.
- En la rama `main`, se dispara el despliegue automático al Render usando un deploy hook.

## Render

La app NO puede apuntar a la base de datos local Docker desde Render. Para desplegar en la nube, debes usar:

- una base de datos PostgreSQL gestionada en Render o
- otra instancia PostgreSQL accesible desde internet.

Entonces define en Render estas variables de entorno:

- `PORT=10000`
- `DATABASE_URL=postgresql://usuario:password@host:puerto/bd?schema=public`
- `NODE_ENV=production`

## GitHub Actions

Los workflows ya están preparados en `.github/workflows/` para:

- CI del backend
- seguridad y auditoría
- despliegue continuo a Render
