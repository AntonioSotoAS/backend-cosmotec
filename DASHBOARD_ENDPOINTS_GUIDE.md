# 📊 Guía de Endpoints para Dashboard - Sistema COSMOTEC

## 🎯 **Endpoints para Obtener Datos del Panel de Control**

### 1. **📈 Datos del Dashboard Principal**
```http
GET http://localhost:3000/astronauts/dashboard
```
**Respuesta:**
```json
{
  "crewStatus": {
    "timestamp": "2024-01-15T13:32:06Z",
    "crewMembers": [
      {
        "astronautId": "carlos_diaz",
        "name": "Carlos Diaz",
        "codename": "CD",
        "status": "OPTIMO",
        "color": "green",
        "lastUpdate": "2024-01-15T13:32:06Z"
      }
    ],
    "totalMembers": 1,
    "optimalCount": 1,
    "stressedCount": 0,
    "criticalCount": 0
  },
  "activeAlerts": [
    {
      "astronautId": "carlos_diaz",
      "astronautName": "Carlos Diaz",
      "alertType": "ESTRESADO",
      "description": "Carlos está estresado/ansioso",
      "timestamp": "2024-01-15T13:32:06Z",
      "recommendedActions": ["RECOMENDAR_DESCANSO"]
    }
  ],
  "crewStatistics": {
    "totalRecords": 150,
    "uniqueAstronauts": 1,
    "stateCounts": {
      "OPTIMO": 120,
      "ESTRESADO": 25,
      "CRITICO": 5
    }
  },
  "astronautStatuses": [
    {
      "astronautId": "carlos_diaz",
      "fullName": "Carlos Diaz",
      "codename": "CD",
      "currentStatus": {
        "overallState": "ESTRESADO",
        "eyeOpening": 85,
        "tensionExpressions": 45,
        "pallor": 30,
        "focus": 90,
        "concentration": 88,
        "timestamp": "2024-01-15T13:32:06Z"
      }
    }
  ]
}
```

### 2. **👤 Estado Actual de un Astronauta Específico**
```http
GET http://localhost:3000/astronauts/status/{astronautId}
```
**Ejemplo:**
```http
GET http://localhost:3000/astronauts/status/carlos_diaz
```

### 3. **📊 Datos Históricos de un Astronauta**
```http
GET http://localhost:3000/astronauts/monitoring/history/{astronautId}?startDate=2024-01-01&endDate=2024-01-31&state=OPTIMO
```
**Parámetros:**
- `startDate`: Fecha inicio (YYYY-MM-DD)
- `endDate`: Fecha fin (YYYY-MM-DD)
- `state`: Filtrar por estado (OPTIMO/ESTRESADO/CRITICO)

### 4. **🚨 Alertas Activas**
```http
GET http://localhost:3000/astronauts/alerts/active
```
**Respuesta:**
```json
[
  {
    "astronautId": "carlos_diaz",
    "astronautName": "Carlos Diaz",
    "alertType": "ESTRESADO",
    "description": "Carlos está estresado/ansioso",
    "timestamp": "2024-01-15T13:32:06Z",
    "recommendedActions": ["RECOMENDAR_DESCANSO", "NOTIFICAR_MÉDICO"]
  }
]
```

### 5. **👥 Estado de la Tripulación**
```http
GET http://localhost:3000/astronauts/crew-status/current
```

### 6. **📈 Estadísticas de la Tripulación**
```http
GET http://localhost:3000/astronauts/crew/statistics
```

## 🎨 **Datos para Cada Panel del Dashboard**

### **Panel 1: Identificación del Astronauta**
```javascript
// Obtener datos del dashboard principal
const dashboardData = await fetch('http://localhost:3000/astronauts/dashboard').then(r => r.json());

// Datos para el panel de identificación
const astronautInfo = {
  name: dashboardData.astronautStatuses[0].fullName, // "Carlos Diaz"
  initials: dashboardData.astronautStatuses[0].codename, // "CD"
  status: dashboardData.astronautStatuses[0].currentStatus.overallState, // "OPTIMO"
  statusColor: dashboardData.astronautStatuses[0].currentStatus.overallState === "OPTIMO" ? "green" : "red"
};
```

### **Panel 2: Estado General**
```javascript
// Estado general con indicador visual
const generalStatus = {
  state: dashboardData.astronautStatuses[0].currentStatus.overallState,
  description: dashboardData.astronautStatuses[0].currentStatus.stateDescription,
  alertLevel: dashboardData.astronautStatuses[0].currentStatus.alertLevel,
  visualIndicator: {
    color: dashboardData.astronautStatuses[0].currentStatus.overallState === "OPTIMO" ? "green" : "red",
    percentage: 85 // Calcular basado en estabilidad
  }
};
```

### **Panel 3: Estado en Tiempo Real**
```javascript
// Alertas activas y historial
const realTimeStatus = {
  activeAlerts: dashboardData.activeAlerts,
  alertHistory: [
    {
      type: "ESTRÉS ALTO DETECTADO",
      timestamp: "15:02",
      severity: "HIGH"
    }
  ],
  recommendedActions: [
    "NOTIFICAR_MÉDICO",
    "PROTOCOLO_EMERGENCIA", 
    "RECOMENDAR_DESCANSO"
  ]
};
```

### **Panel 4: Indicadores Faciales**
```javascript
// Indicadores faciales detectados
const facialIndicators = {
  eyeOpening: dashboardData.astronautStatuses[0].currentStatus.eyeOpening, // 85%
  tensionExpressions: dashboardData.astronautStatuses[0].currentStatus.tensionExpressions, // 45%
  pallor: dashboardData.astronautStatuses[0].currentStatus.pallor, // 30%
  focus: dashboardData.astronautStatuses[0].currentStatus.focus, // 90%
  concentration: dashboardData.astronautStatuses[0].currentStatus.concentration // 88%
};
```

### **Panel 5: Panel Comparativo de Tripulación**
```javascript
// Estado de todos los miembros de la tripulación
const crewComparison = dashboardData.crewStatus.crewMembers.map(member => ({
  initials: member.codename,
  name: member.name,
  status: member.status,
  color: member.color,
  lastUpdate: member.lastUpdate
}));
```

### **Panel 6: Registro Histórico**
```javascript
// Obtener datos históricos para gráficos
const historicalData = await fetch(
  `http://localhost:3000/astronauts/monitoring/history/carlos_diaz?startDate=2024-01-01&endDate=2024-01-31`
).then(r => r.json());

// Procesar datos para gráficos
const chartData = historicalData.map(record => ({
  timestamp: record.timestamp,
  eyeOpening: record.eyeOpening,
  tensionExpressions: record.tensionExpressions,
  overallState: record.overallState
}));
```

## 🔄 **Ejemplo de Uso Completo en Frontend**

```javascript
// Función para obtener todos los datos del dashboard
async function getDashboardData() {
  try {
    // Obtener datos principales
    const dashboardResponse = await fetch('http://localhost:3000/astronauts/dashboard');
    const dashboardData = await dashboardResponse.json();
    
    // Obtener alertas activas
    const alertsResponse = await fetch('http://localhost:3000/astronauts/alerts/active');
    const activeAlerts = await alertsResponse.json();
    
    // Obtener estadísticas
    const statsResponse = await fetch('http://localhost:3000/astronauts/crew/statistics');
    const crewStats = await statsResponse.json();
    
    return {
      // Panel de identificación
      astronautInfo: {
        name: dashboardData.astronautStatuses[0]?.fullName || "Desconocido",
        initials: dashboardData.astronautStatuses[0]?.codename || "UNK",
        status: dashboardData.astronautStatuses[0]?.currentStatus?.overallState || "UNKNOWN"
      },
      
      // Panel de estado general
      generalStatus: {
        state: dashboardData.astronautStatuses[0]?.currentStatus?.overallState || "UNKNOWN",
        description: dashboardData.astronautStatuses[0]?.currentStatus?.stateDescription || "Sin datos",
        alertLevel: dashboardData.astronautStatuses[0]?.currentStatus?.alertLevel || "NORMAL"
      },
      
      // Panel de tiempo real
      realTimeStatus: {
        activeAlerts: activeAlerts,
        alertHistory: activeAlerts.map(alert => ({
          type: alert.alertType,
          timestamp: new Date(alert.timestamp).toLocaleTimeString(),
          severity: alert.alertType === "CRITICO" ? "HIGH" : "MEDIUM"
        }))
      },
      
      // Panel de indicadores faciales
      facialIndicators: {
        eyeOpening: dashboardData.astronautStatuses[0]?.currentStatus?.eyeOpening || 0,
        tensionExpressions: dashboardData.astronautStatuses[0]?.currentStatus?.tensionExpressions || 0,
        pallor: dashboardData.astronautStatuses[0]?.currentStatus?.pallor || 0,
        focus: dashboardData.astronautStatuses[0]?.currentStatus?.focus || 0,
        concentration: dashboardData.astronautStatuses[0]?.currentStatus?.concentration || 0
      },
      
      // Panel comparativo de tripulación
      crewComparison: dashboardData.crewStatus?.crewMembers || [],
      
      // Estadísticas generales
      crewStatistics: crewStats
    };
    
  } catch (error) {
    console.error('Error obteniendo datos del dashboard:', error);
    return null;
  }
}

// Usar la función
getDashboardData().then(data => {
  if (data) {
    console.log('Datos del dashboard:', data);
    // Actualizar tu interfaz con los datos
    updateDashboard(data);
  }
});
```

## 🚀 **Endpoints de Prueba Rápida**

### **Probar que el backend funciona:**
```bash
curl http://localhost:3000/astronauts/dashboard
```

### **Obtener estado de un astronauta:**
```bash
curl http://localhost:3000/astronauts/status/carlos_diaz
```

### **Obtener alertas activas:**
```bash
curl http://localhost:3000/astronauts/alerts/active
```

¡Con estos endpoints tienes todos los datos necesarios para crear tu panel de control completo! 🚀👨‍🚀
