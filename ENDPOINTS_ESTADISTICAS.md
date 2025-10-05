# 📊 Endpoints para Estadísticas y Datos de Astronautas

## 🎯 **1. Obtener Todos los Astronautas**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/profiles
```

### **Respuesta:**
```json
[
  {
    "id": 1,
    "astronautId": "bautista_machuca_luis_carlos",
    "fullName": "Bautista Machuca Luis Carlos",
    "codename": "BMLC",
    "initials": "BMLC",
    "photoUrl": "/images/astronauts/bautista_machuca.jpg",
    "description": "Comandante de la misión COSMOTEC",
    "baselineMetrics": {
      "normalEyeOpening": 88,
      "normalTensionExpressions": 20,
      "normalPallor": 12,
      "normalFocus": 92,
      "normalConcentration": 90,
      "normalEar": 0.30
    },
    "thresholds": {
      "stressThreshold": 0.65,
      "criticalThreshold": 0.85,
      "drowsyThreshold": 0.24,
      "closedThreshold": 0.14
    },
    "isActive": true,
    "isMonitoring": true,
    "currentStatus": "OPTIMO",
    "statusLastUpdated": "2024-01-15T13:32:06Z"
  }
  // ... más astronautas
]
```

## 📈 **2. Estadísticas por Astronauta ID**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/statistics/{astronautId}
```

### **Ejemplos:**
```bash
# Estadísticas de Bautista Machuca
curl http://localhost:3000/astronauts/statistics/bautista_machuca_luis_carlos

# Estadísticas de Castro García
curl http://localhost:3000/astronauts/statistics/castro_garcia_jose_heiner
```

### **Respuesta:**
```json
{
  "astronautId": "bautista_machuca_luis_carlos",
  "fullName": "Bautista Machuca Luis Carlos",
  "codename": "BMLC",
  "statistics": {
    "totalRecords": 2016,  // Registros en los últimos 7 días
    "timeRange": {
      "start": "2024-01-08T00:00:00Z",
      "end": "2024-01-15T13:32:06Z"
    },
    "stateCounts": {
      "OPTIMO": 1200,
      "ESTRESADO": 600,
      "CRITICO": 216
    },
    "statePercentages": {
      "OPTIMO": 59.5,
      "ESTRESADO": 29.8,
      "CRITICO": 10.7
    },
    "averageMetrics": {
      "eyeOpening": 85.2,
      "tensionExpressions": 28.5,
      "pallor": 18.3,
      "focus": 87.8,
      "concentration": 86.4,
      "ear": 0.27
    },
    "alertHistory": {
      "totalAlerts": 45,
      "criticalAlerts": 12,
      "stressAlerts": 33,
      "lastAlert": "2024-01-15T10:30:00Z"
    },
    "performanceScore": 85.7
  }
}
```

## 📊 **3. Estadísticas Generales de la Tripulación**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/crew/statistics
```

### **Respuesta:**
```json
{
  "totalAstronauts": 6,
  "activeAstronauts": 6,
  "totalRecords": 12096,
  "timeRange": {
    "start": "2024-01-08T00:00:00Z",
    "end": "2024-01-15T13:32:06Z"
  },
  "overallStateCounts": {
    "OPTIMO": 7200,
    "ESTRESADO": 3600,
    "CRITICO": 1296
  },
  "overallPercentages": {
    "OPTIMO": 59.5,
    "ESTRESADO": 29.8,
    "CRITICO": 10.7
  },
  "crewPerformance": {
    "averageScore": 82.3,
    "bestPerformer": "Montejo Soto Arturo Antonio",
    "needsAttention": "Miranda Saldaña Rodolfo Junior"
  },
  "astronautStats": [
    {
      "astronautId": "bautista_machuca_luis_carlos",
      "fullName": "Bautista Machuca Luis Carlos",
      "performanceScore": 85.7,
      "stateCounts": {
        "OPTIMO": 1200,
        "ESTRESADO": 600,
        "CRITICO": 216
      }
    }
    // ... más astronautas
  ]
}
```

## 🔍 **4. Datos Históricos por Astronauta**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/monitoring/history/{astronautId}?startDate=2024-01-01&endDate=2024-01-31&state=OPTIMO
```

### **Parámetros:**
- `startDate`: Fecha inicio (YYYY-MM-DD)
- `endDate`: Fecha fin (YYYY-MM-DD)
- `state`: Filtrar por estado (OPTIMO/ESTRESADO/CRITICO)
- `limit`: Número de registros (default: 50)
- `offset`: Registros a saltar (default: 0)

### **Ejemplo:**
```bash
# Datos de los últimos 3 días de Bautista Machuca
curl "http://localhost:3000/astronauts/monitoring/history/bautista_machuca_luis_carlos?startDate=2024-01-12&endDate=2024-01-15"

# Solo registros de estado ÓPTIMO
curl "http://localhost:3000/astronauts/monitoring/history/bautista_machuca_luis_carlos?state=OPTIMO"

# Últimos 100 registros
curl "http://localhost:3000/astronauts/monitoring/history/bautista_machuca_luis_carlos?limit=100"
```

## 📱 **5. Dashboard Completo**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/dashboard
```

### **Respuesta Completa:**
```json
{
  "crewStatus": {
    "timestamp": "2024-01-15T13:32:06Z",
    "crewMembers": [
      {
        "astronautId": "bautista_machuca_luis_carlos",
        "name": "Bautista Machuca Luis Carlos",
        "codename": "BMLC",
        "status": "OPTIMO",
        "color": "green",
        "lastUpdate": "2024-01-15T13:32:06Z"
      }
      // ... más miembros
    ],
    "totalMembers": 6,
    "optimalCount": 6,
    "stressedCount": 0,
    "criticalCount": 0
  },
  "activeAlerts": [],
  "crewStatistics": {
    "totalRecords": 12096,
    "uniqueAstronauts": 6,
    "stateCounts": {
      "OPTIMO": 7200,
      "ESTRESADO": 3600,
      "CRITICO": 1296
    }
  },
  "astronautStatuses": [
    {
      "astronautId": "bautista_machuca_luis_carlos",
      "fullName": "Bautista Machuca Luis Carlos",
      "codename": "BMLC",
      "currentStatus": {
        "overallState": "OPTIMO",
        "eyeOpening": 88,
        "tensionExpressions": 20,
        "pallor": 12,
        "focus": 92,
        "concentration": 90,
        "timestamp": "2024-01-15T13:32:06Z"
      }
    }
    // ... más astronautas
  ]
}
```

## 🎯 **6. Estado Actual de un Astronauta Específico**

### **Endpoint:**
```http
GET http://localhost:3000/astronauts/status/{astronautId}
```

### **Ejemplo:**
```bash
curl http://localhost:3000/astronauts/status/bautista_machuca_luis_carlos
```

## 📊 **7. Ejemplos de Uso en Frontend**

### **JavaScript para Obtener Todos los Astronautas:**
```javascript
async function getAllAstronauts() {
  try {
    const response = await fetch('http://localhost:3000/astronauts/profiles');
    const astronauts = await response.json();
    
    console.log('Astronautas:', astronauts);
    return astronauts;
  } catch (error) {
    console.error('Error obteniendo astronautas:', error);
  }
}
```

### **JavaScript para Estadísticas de un Astronauta:**
```javascript
async function getAstronautStatistics(astronautId) {
  try {
    const response = await fetch(`http://localhost:3000/astronauts/statistics/${astronautId}`);
    const stats = await response.json();
    
    console.log(`Estadísticas de ${stats.fullName}:`, stats.statistics);
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
  }
}

// Ejemplo de uso
getAstronautStatistics('bautista_machuca_luis_carlos');
```

### **JavaScript para Dashboard Completo:**
```javascript
async function getDashboardData() {
  try {
    const response = await fetch('http://localhost:3000/astronauts/dashboard');
    const dashboard = await response.json();
    
    // Usar los datos para actualizar tu interfaz
    updateDashboard(dashboard);
    return dashboard;
  } catch (error) {
    console.error('Error obteniendo dashboard:', error);
  }
}
```

## 🚀 **Resumen de Endpoints:**

1. **`GET /astronauts/profiles`** - Todos los astronautas
2. **`GET /astronauts/statistics/{astronautId}`** - Estadísticas por astronauta
3. **`GET /astronauts/crew/statistics`** - Estadísticas generales
4. **`GET /astronauts/monitoring/history/{astronautId}`** - Datos históricos
5. **`GET /astronauts/dashboard`** - Dashboard completo
6. **`GET /astronauts/status/{astronautId}`** - Estado actual

¡Con estos endpoints tienes acceso completo a todas las estadísticas y datos de tu equipo COSMOTEC! 🚀👨‍🚀
