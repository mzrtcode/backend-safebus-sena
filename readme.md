# 🚌 SafeBus - Sistema de Gestión de Transporte

Sistema de gestión para empresas de transporte desarrollado con Node.js y MySQL.

## 📋 Requisitos Previos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Git (opcional)

## 🗂️ Estructura del Proyecto

```
safebus/
├── docker-compose.yml
├── Dockerfile
├── .env
├── .dockerignore
├── init.sql
├── package.json
├── package-lock.json
├── README.md
└── src/
    └── (código de la aplicación)
```

## ⚙️ Configuración Inicial

### 1. Configurar Variables de Entorno

Crea o edita el archivo `.env` en la raíz del proyecto:

```env
# Configuración de la base de datos
DB_USER=safebus_user
DB_PASS=safebus_pass
DB_NAME=transporte
DB_PORT=3306
DB_HOST=db

# Configuración del servidor
PORT=4000

# Configuración del token
TOKEN_SECRET=clave_super_secreta_safebus
```

> ⚠️ **Importante**: Cambia `TOKEN_SECRET` y `DB_PASS` por valores seguros en producción.

### 2. Script de Inicialización

El archivo `init.sql` contiene el esquema de la base de datos y se ejecutará automáticamente la primera vez que se inicie el contenedor de MySQL.

## 🚀 Comandos Docker

### Iniciar la aplicación

```bash
# Construir e iniciar los contenedores en segundo plano
docker-compose up -d

# Construir e iniciar mostrando los logs
docker-compose up --build
```

### Ver logs

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs solo de la aplicación
docker-compose logs -f app

# Ver logs solo de la base de datos
docker-compose logs -f db
```

### Detener la aplicación

```bash
# Detener los contenedores (mantiene los datos)
docker-compose down

# Detener y eliminar volúmenes (⚠️ BORRA LA BASE DE DATOS)
docker-compose down -v
```

### Reiniciar servicios

```bash
# Reiniciar todos los servicios
docker-compose restart

# Reiniciar solo la aplicación
docker-compose restart app

# Reiniciar solo la base de datos
docker-compose restart db
```

### Ver estado de los contenedores

```bash
# Ver contenedores en ejecución
docker-compose ps

# Ver estadísticas de recursos
docker stats
```

### Acceder a los contenedores

```bash
# Acceder a la terminal de la aplicación
docker exec -it safebus_app sh

# Acceder a MySQL
docker exec -it safebus_db mysql -u safebus_user -psafebus_pass transporte
```

### Limpiar el sistema

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar volúmenes no utilizados
docker volume prune

# Eliminar todo (contenedores, redes, volúmenes, imágenes)
docker system prune -a --volumes
```

## 🗄️ Gestión de la Base de Datos

### Backup de la base de datos

```bash
# Crear backup
docker exec safebus_db mysqldump -u safebus_user -psafebus_pass transporte > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup

```bash
# Restaurar desde un archivo
docker exec -i safebus_db mysql -u safebus_user -psafebus_pass transporte < backup.sql
```

### Acceder a MySQL desde el host

```bash
# Usando el cliente MySQL local
mysql -h 127.0.0.1 -P 3306 -u safebus_user -psafebus_pass transporte
```

## 📊 Base de Datos

El sistema cuenta con las siguientes tablas:

- **vendedores**: Gestión de vendedores
- **administradores**: Gestión de administradores
- **conductores**: Gestión de conductores
- **propietarios**: Gestión de propietarios de vehículos
- **vehiculos**: Registro de vehículos
- **agencias**: Agencias de transporte
- **localidades**: Ciudades y localidades
- **rutas**: Rutas de transporte
- **planillas**: Planificación de viajes
- **tiquetes**: Registro de tiquetes vendidos
- **empresa**: Información de la empresa

## 🔧 Desarrollo

### Modificar código

Los cambios en el código se reflejan automáticamente si usas `nodemon` en tu aplicación.

### Instalar nuevas dependencias

```bash
# Entrar al contenedor
docker exec -it safebus_app sh

# Instalar dependencia
npm install nombre-paquete

# O desde fuera del contenedor
docker-compose exec app npm install nombre-paquete
```

### Reconstruir la aplicación

```bash
# Si cambiaste el Dockerfile o docker-compose.yml
docker-compose up -d --build
```

## 🌐 Acceso a la Aplicación

- **Aplicación**: http://localhost:4000
- **Base de datos**: localhost:3306

## 🐛 Solución de Problemas

### La aplicación no se conecta a la base de datos

1. Verifica que el servicio `db` esté corriendo: `docker-compose ps`
2. Revisa los logs: `docker-compose logs db`
3. Asegúrate que `DB_HOST=db` en el archivo `.env`

### Error: "port is already allocated"

El puerto ya está en uso. Cambia el puerto en `.env` o detén el servicio que lo está usando.

### Reiniciar desde cero

```bash
# Detener todo y eliminar volúmenes
docker-compose down -v

# Eliminar imágenes si es necesario
docker rmi safebus_db safebus_app

# Iniciar de nuevo
docker-compose up -d --build
```

### Ver logs de errores

```bash
# Logs en tiempo real
docker-compose logs -f --tail=100

# Logs de un servicio específico
docker-compose logs db
```
<img width="2830" height="2462" alt="drawSQL-image-export-2025-10-23" src="https://github.com/user-attachments/assets/afcf63f1-d13c-4877-8652-af1bec53b0d1" />


## 📝 Notas Importantes

- **Persistencia**: Los datos de MySQL se almacenan en el volumen `mysql_data` y persisten entre reinicios.
- **Primera ejecución**: El script `init.sql` solo se ejecuta la primera vez que se crea el volumen de la base de datos.
- **Seguridad**: Cambia las credenciales por defecto antes de usar en producción.
- **Backup**: Realiza backups regulares de la base de datos.

## 📚 Recursos Adicionales

- [Documentación de Docker](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [MySQL Docker Image](https://hub.docker.com/_/mysql)
- [Node.js Docker Image](https://hub.docker.com/_/node)

## 👥 Contribuir

Si encuentras algún error o tienes sugerencias, por favor crea un issue o pull request.

## 📄 Licencia

Este proyecto está bajo la licencia que determines.

---

**Desarrollado con ❤️ para SafeBus**
