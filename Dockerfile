
# Imagen base de MySQL
FROM mysql:8.0

# Variables de entorno (se sobreescriben con .env en docker-compose)
ENV MYSQL_ROOT_PASSWORD=${DB_PASS}
ENV MYSQL_DATABASE=${DB_NAME}
ENV MYSQL_USER=${DB_USER}
ENV MYSQL_PASSWORD=${DB_PASS}

# Copiar script de inicialización (crea tablas o datos iniciales)
COPY ./init.sql /docker-entrypoint-initdb.d/

# Exponer puerto
EXPOSE 3306
