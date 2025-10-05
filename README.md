# 🚀 COSMOTEC - Sistema de Monitoreo de Astronautas

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.0.1-red.svg" alt="NestJS Version" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-blue.svg" alt="TypeScript Version" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue.svg" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node.js" />
</p>

## 📋 Descripción del Proyecto

**COSMOTEC** es un sistema avanzado de monitoreo en tiempo real para astronautas que utiliza análisis facial y reconocimiento de emociones. El sistema permite supervisar el estado emocional y físico de los astronautas durante misiones espaciales, proporcionando alertas y recomendaciones en tiempo real.

### 🎯 Características Principales

- **Monitoreo en Tiempo Real**: Análisis facial y emocional cada minuto
- **Reconocimiento de Astronautas**: Identificación automática por rostro
- **Sistema de Alertas**: Notificaciones automáticas por estados críticos
- **Dashboard Interactivo**: Panel de control con visualizaciones en tiempo real
- **Histórico de Datos**: Almacenamiento y análisis de tendencias
- **API RESTful**: Endpoints para integración con sistemas externos

## 🛠️ Tecnologías Utilizadas

- **Backend**: NestJS 11.0.1 con TypeScript
- **Base de Datos**: PostgreSQL 15+
- **ORM**: TypeORM con decoradores
- **Validación**: Class-validator y Class-transformer
- **Testing**: Jest para pruebas unitarias y e2e
- **Linting**: ESLint con Prettier

## 📦 Requisitos del Sistema

### Prerrequisitos
- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior
- **PostgreSQL**: v15.0 o superior
- **Git**: Para clonar el repositorio

### Verificar Versiones
```bash
node --version
npm --version
psql --version
```

## 🚀 Instalación Paso a Paso

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd nest-cosmotec
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Base de Datos PostgreSQL

#### Opción A: Usando Docker (Recomendado)
```bash
# Crear contenedor PostgreSQL
docker run --name cosmotec-postgres \
  -e POSTGRES_DB=cosmotec \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=naruto20 \
  -p 5432:5432 \
  -d postgres:15
```

#### Opción B: Instalación Local
1. Instalar PostgreSQL desde [postgresql.org](https://www.postgresql.org/download/)
2. Crear base de datos:
```sql
CREATE DATABASE cosmotec;
CREATE USER postgres WITH PASSWORD 'naruto20';
GRANT ALL PRIVILEGES ON DATABASE cosmotec TO postgres;
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:
```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=naruto20
DB_DATABASE=cosmotec

# Servidor
PORT=5000
NODE_ENV=development
```

### 5. Ejecutar Migraciones (Automático)
El proyecto está configurado con `synchronize: true`, por lo que las tablas se crean automáticamente al iniciar.

### 6. Poblar Base de Datos (Opcional)
```bash
# Ejecutar seeds para datos de prueba
npm run start:dev
# Luego hacer POST a /astronauts/seed/profiles
```

### 7. Iniciar el Servidor

#### Desarrollo
```bash
npm run start:dev
```

#### Producción
```bash
npm run build
npm run start:prod
```

## 🧪 Comandos de Desarrollo

### Scripts Disponibles
```bash
# Desarrollo
npm run start:dev          # Inicia con hot-reload
npm run start:debug        # Inicia en modo debug

# Construcción
npm run build              # Compila TypeScript
npm run start:prod         # Inicia versión de producción

# Testing
npm run test               # Pruebas unitarias
npm run test:watch         # Pruebas en modo watch
npm run test:cov           # Cobertura de pruebas
npm run test:e2e           # Pruebas end-to-end

# Calidad de Código
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier
```

## 📊 Estructura del Proyecto

```
src/
├── astronauts/           # Módulo de astronautas
│   ├── entities/        # Entidades de base de datos
│   ├── dto/             # Data Transfer Objects
│   ├── seeds/           # Datos de prueba
│   └── *.controller.ts  # Controladores
├── emotions/           # Módulo de emociones
├── users/              # Módulo de usuarios
├── app.module.ts       # Módulo principal
└── main.ts            # Punto de entrada
```

## 🔗 Endpoints Principales

### Monitoreo de Astronautas
- `POST /astronauts/monitoring/data` - Recibir datos del sistema Python
- `GET /astronauts/status/{id}` - Estado actual de astronauta
- `GET /astronauts/monitoring/history/{id}` - Histórico de datos
- `GET /astronauts/dashboard` - Dashboard principal
- `GET /astronauts/alerts/active` - Alertas activas

### Gestión de Datos
- `POST /astronauts/seed/profiles` - Poblar perfiles de astronautas
- `GET /astronauts/crew-status/current` - Estado de tripulación

## 🐳 Docker (Opcional)

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - postgres
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=naruto20
      - DB_DATABASE=cosmotec

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=cosmotec
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=naruto20
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔧 Configuración Avanzada

### Variables de Entorno Completas
```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=naruto20
DB_DATABASE=cosmotec
DB_SYNCHRONIZE=true

# Servidor
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*

# Logging
LOG_LEVEL=debug
```

### Configuración de CORS
El servidor está configurado para aceptar conexiones desde cualquier origen en desarrollo.

## 📈 Monitoreo y Logs

### Verificar Estado del Servidor
```bash
# Verificar que el servidor esté corriendo
curl http://localhost:5000

# Verificar base de datos
curl http://localhost:5000/astronauts/dashboard
```

### Logs de Desarrollo
```bash
# Ver logs en tiempo real
npm run start:dev | tee logs/app.log
```

## 🚨 Solución de Problemas

### Error de Conexión a Base de Datos
```bash
# Verificar que PostgreSQL esté corriendo
pg_isready -h localhost -p 5432

# Verificar credenciales
psql -h localhost -U postgres -d cosmotec
```

### Puerto en Uso
```bash
# Encontrar proceso usando puerto 5000
lsof -i :5000
# Matar proceso
kill -9 <PID>
```

### Dependencias
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentación Adicional

- [API Documentation](./API_DOCUMENTATION.md) - Documentación completa de la API
- [Dashboard Guide](./DASHBOARD_ENDPOINTS_GUIDE.md) - Guía del dashboard
- [Seed Guide](./SEED_GUIDE.md) - Guía para poblar datos
- [Reportes](./REPORTES_ENDPOINTS.md) - Endpoints de reportes

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollo Backend**: NestJS + TypeScript
- **Base de Datos**: PostgreSQL + TypeORM
- **Integración**: API REST para sistema Python

---

**¡El sistema COSMOTEC está listo para monitorear astronautas en tiempo real! 🚀👨‍🚀**
# backend-cosmotec
