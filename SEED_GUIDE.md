# 🌱 Guía de Seeds para Sistema COSMOTEC

## 📋 **¿Qué es un Seed?**

Un seed es un conjunto de datos iniciales que se insertan en la base de datos para tener información de prueba y ejemplos realistas.

## 🚀 **Cómo Ejecutar los Seeds**

### **1. Ejecutar Todos los Seeds:**
```bash
curl -X POST http://localhost:3000/astronauts/seeds/run-all
```

### **2. Ejecutar Solo Perfiles de Astronautas:**
```bash
curl -X POST http://localhost:3000/astronauts/seeds/profiles
```

### **3. Ejecutar Solo Datos de Monitoreo:**
```bash
curl -X POST http://localhost:3000/astronauts/seeds/monitoring
```

### **4. Verificar Estado de Seeds:**
```bash
curl http://localhost:3000/astronauts/seeds/status
```

## 👨‍🚀 **Datos del Perfil del Astronauta**

### **Información Básica:**
```json
{
  "astronautId": "carlos_diaz",           // ID único del astronauta
  "fullName": "Carlos Diaz",              // Nombre completo
  "codename": "CD",                       // Código de identificación
  "initials": "CD",                       // Iniciales
  "photoUrl": "/images/astronauts/carlos_diaz.jpg",  // URL de la foto
  "description": "Comandante de la misión con 15 años de experiencia"
}
```

### **Métricas Basales (Valores Normales):**
```json
{
  "baselineMetrics": {
    "normalEyeOpening": 85,        // Apertura ocular normal (%)
    "normalTensionExpressions": 25, // Expresiones de tensión normales (%)
    "normalPallor": 15,            // Palidez normal (%)
    "normalFocus": 90,             // Focalización normal (%)
    "normalConcentration": 88,      // Concentración normal (%)
    "normalEar": 0.28              // EAR normal
  }
}
```

### **Umbrales de Alerta:**
```json
{
  "thresholds": {
    "stressThreshold": 0.6,        // Umbral para detectar estrés
    "criticalThreshold": 0.8,       // Umbral para estado crítico
    "drowsyThreshold": 0.25,       // Umbral para somnolencia
    "closedThreshold": 0.15        // Umbral para ojos cerrados
  }
}
```

### **Estado Actual:**
```json
{
  "isActive": true,                // Si el astronauta está activo
  "isMonitoring": true,            // Si está siendo monitoreado
  "currentStatus": "OPTIMO",       // Estado actual (OPTIMO/ESTRESADO/CRITICO)
  "statusLastUpdated": "2024-01-15T13:32:06Z"  // Última actualización
}
```

## 📊 **Datos de Monitoreo Generados**

### **Astronautas Creados (Equipo COSMOTEC):**
1. **Bautista Machuca Luis Carlos (BMLC)** - Comandante - Estado: ÓPTIMO
2. **Castro García José Heiner (CGJH)** - Especialista - Estado: ÓPTIMO  
3. **Gamonal Chauca José Roger (GCJR)** - Ingeniero - Estado: ÓPTIMO
4. **López Campoverde Miguel Ángel (LCMA)** - Científico - Estado: ÓPTIMO
5. **Miranda Saldaña Rodolfo Junior (MSRJ)** - Comunicaciones - Estado: ÓPTIMO
6. **Montejo Soto Arturo Antonio (MSAA)** - Médico - Estado: ÓPTIMO

### **Datos Generados:**
- **7 días** de datos históricos
- **Cada 5 minutos** un registro
- **Patrones realistas** basados en hora del día
- **Estados variables** según patrones de sueño/vigilia

## 🎯 **Ejemplo de Uso Completo**

### **1. Ejecutar Seeds:**
```bash
# Ejecutar todos los seeds
curl -X POST http://localhost:3000/astronauts/seeds/run-all
```

### **2. Verificar Datos:**
```bash
# Ver estado de seeds
curl http://localhost:3000/astronauts/seeds/status

# Obtener dashboard con datos
curl http://localhost:3000/astronauts/dashboard

# Ver perfiles de astronautas
curl http://localhost:3000/astronauts/profiles
```

### **3. Obtener Datos Específicos:**
```bash
# Estado de un astronauta específico
curl http://localhost:3000/astronauts/status/carlos_diaz

# Datos históricos
curl "http://localhost:3000/astronauts/monitoring/history/carlos_diaz?startDate=2024-01-01&endDate=2024-01-31"

# Alertas activas
curl http://localhost:3000/astronauts/alerts/active
```

## 📈 **Datos para el Dashboard**

Después de ejecutar los seeds, tendrás:

### **Panel de Identificación:**
- 5 astronautas con nombres, iniciales y estados
- Fotos y descripciones de cada uno

### **Panel de Estado General:**
- Estados actuales de todos los astronautas
- Indicadores visuales de estado

### **Panel de Tiempo Real:**
- Alertas activas basadas en estados
- Historial de alertas de los últimos 7 días

### **Panel de Indicadores Faciales:**
- Datos realistas de apertura ocular, tensión, palidez, etc.
- Valores que varían según el estado del astronauta

### **Panel Comparativo:**
- Lista completa de la tripulación
- Estados individuales de cada miembro

### **Panel Histórico:**
- 7 días de datos para gráficos
- Tendencias y patrones de comportamiento

## 🔄 **Reiniciar Seeds**

Si quieres limpiar y volver a ejecutar:

```bash
# Limpiar base de datos (opcional)
# Luego ejecutar seeds nuevamente
curl -X POST http://localhost:3000/astronauts/seeds/run-all
```

¡Con estos seeds tendrás un sistema completo con datos realistas para probar tu dashboard! 🚀👨‍🚀
