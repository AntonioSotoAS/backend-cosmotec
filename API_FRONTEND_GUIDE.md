# 🚀 Guía Completa de API para Frontend - Sistema COSMOTEC

## 📋 **Resumen de Endpoints Disponibles**

### **Base URL:** `http://localhost:5000`

---

## 👨‍🚀 **1. Obtener Todos los Astronautas**

### **Endpoint:**
```http
GET /astronauts/profiles
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
    "statusLastUpdated": "2024-01-15T13:32:06Z",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T13:32:06Z"
  }
  // ... 5 más astronautas
]
```

---

## 📊 **2. Dashboard Completo**

### **Endpoint:**
```http
GET /astronauts/dashboard
```

### **Respuesta:**
```json
{
  "success": true,
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
  ],
  "lastUpdated": "2024-01-15T13:32:06Z"
}
```

---

## 📈 **3. Estadísticas por Astronauta**

### **Endpoint:**
```http
GET /astronauts/statistics/{astronautId}
```

### **Ejemplos:**
```bash
GET /astronauts/statistics/bautista_machuca_luis_carlos
GET /astronauts/statistics/castro_garcia_jose_heiner
```

### **Respuesta:**
```json
{
  "astronautId": "bautista_machuca_luis_carlos",
  "fullName": "Bautista Machuca Luis Carlos",
  "codename": "BMLC",
  "statistics": {
    "totalRecords": 2016,
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

---

## 📊 **4. Estadísticas Generales de Tripulación**

### **Endpoint:**
```http
GET /astronauts/crew/statistics
```

### **Respuesta:**
```json
{
  "totalRecords": 12096,
  "uniqueAstronauts": 6,
  "stateCounts": {
    "OPTIMO": 7200,
    "ESTRESADO": 3600,
    "CRITICO": 1296
  },
  "timeRange": {
    "start": "2024-01-08T00:00:00Z",
    "end": "2024-01-15T13:32:06Z"
  }
}
```

---

## 🔍 **5. Datos Históricos por Astronauta**

### **Endpoint:**
```http
GET /astronauts/monitoring/history/{astronautId}?startDate=2024-01-01&endDate=2024-01-31&state=OPTIMO&limit=50&offset=0
```

### **Parámetros:**
- `startDate`: Fecha inicio (YYYY-MM-DD)
- `endDate`: Fecha fin (YYYY-MM-DD)
- `state`: Filtrar por estado (OPTIMO/ESTRESADO/CRITICO)
- `limit`: Número de registros (default: 50)
- `offset`: Registros a saltar (default: 0)

### **Respuesta:**
```json
[
  {
    "id": 1,
    "astronautId": "bautista_machuca_luis_carlos",
    "astronautName": "Bautista Machuca Luis Carlos",
    "codename": "BMLC",
    "timestamp": "2024-01-15T13:32:06Z",
    "faceDetected": true,
    "faceConfidence": 0.85,
    "recognizedName": "Bautista Machuca Luis Carlos",
    "eyeOpening": 88,
    "tensionExpressions": 20,
    "pallor": 12,
    "focus": 92,
    "concentration": 90,
    "ear": 0.30,
    "eyeState": "open",
    "dominantEmotion": "happy",
    "emotionConfidence": 0.75,
    "emotionalState": "OPTIMO",
    "emotionBreakdown": {
      "happy": 0.75,
      "neutral": 0.15,
      "sad": 0.05,
      "angry": 0.03,
      "surprise": 0.02
    },
    "overallState": "OPTIMO",
    "stateDescription": "Bautista está en estado óptimo",
    "alertLevel": "NORMAL",
    "consecutiveClosedFrames": 0,
    "stabilityFrames": 15,
    "sentimentCounts": {
      "OPTIMO": 45,
      "ESTRESADO": 10,
      "CRITICO": 5
    },
    "dominantSentiment": "OPTIMO",
    "sentimentPercentage": 75.0,
    "totalFrames": 60,
    "activeAlerts": [],
    "alertHistory": [],
    "recommendedActions": []
  }
  // ... más registros
]
```

---

## 🚨 **6. Alertas Activas**

### **Endpoint:**
```http
GET /astronauts/alerts/active
```

### **Respuesta:**
```json
[
  {
    "astronautId": "bautista_machuca_luis_carlos",
    "astronautName": "Bautista Machuca Luis Carlos",
    "alertType": "ESTRESADO",
    "description": "Bautista muestra signos de estrés",
    "timestamp": "2024-01-15T13:32:06Z",
    "recommendedActions": ["RECOMENDAR_DESCANSO", "MONITOREAR_ESTADO"]
  }
]
```

---

## 👥 **7. Estado de Tripulación**

### **Endpoint:**
```http
GET /astronauts/crew-status/current
```

### **Respuesta:**
```json
{
  "id": 1,
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
  "criticalCount": 0,
  "unknownCount": 0,
  "crewAlerts": [],
  "crewNotes": "Todos los miembros en estado óptimo"
}
```

---

## 🎯 **8. Estado Actual de un Astronauta**

### **Endpoint:**
```http
GET /astronauts/status/{astronautId}
```

### **Respuesta:**
```json
{
  "id": 1,
  "astronautId": "bautista_machuca_luis_carlos",
  "astronautName": "Bautista Machuca Luis Carlos",
  "codename": "BMLC",
  "timestamp": "2024-01-15T13:32:06Z",
  "faceDetected": true,
  "faceConfidence": 0.85,
  "recognizedName": "Bautista Machuca Luis Carlos",
  "eyeOpening": 88,
  "tensionExpressions": 20,
  "pallor": 12,
  "focus": 92,
  "concentration": 90,
  "ear": 0.30,
  "eyeState": "open",
  "dominantEmotion": "happy",
  "emotionConfidence": 0.75,
  "emotionalState": "OPTIMO",
  "overallState": "OPTIMO",
  "stateDescription": "Bautista está en estado óptimo",
  "alertLevel": "NORMAL"
}
```

---

## 🌱 **9. Seeds (Poblar Base de Datos)**

### **Ejecutar Todos los Seeds:**
```http
POST /astronauts/seeds/run-all
```

### **Solo Perfiles:**
```http
POST /astronauts/seeds/profiles
```

### **Solo Datos de Monitoreo:**
```http
POST /astronauts/seeds/monitoring
```

### **Verificar Estado:**
```http
GET /astronauts/seeds/status
```

### **Respuesta de Seeds:**
```json
{
  "success": true,
  "message": "Todos los seeds ejecutados exitosamente",
  "timestamp": "2024-01-15T13:32:06Z"
}
```

---

## 🧪 **10. Endpoint de Prueba**

### **Endpoint:**
```http
GET /astronauts/test
```

### **Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T13:32:06Z",
  "data": {
    "astronauts": [
      "Bautista Machuca",
      "Castro García", 
      "Gamonal Chauca",
      "López Campoverde",
      "Miranda Saldaña",
      "Montejo Soto"
    ]
  }
}
```

---

## 📱 **Ejemplos de Uso en Frontend**

### **JavaScript/React:**
```javascript
// 1. Obtener todos los astronautas
async function getAllAstronauts() {
  try {
    const response = await fetch('http://localhost:5000/astronauts/profiles');
    const astronauts = await response.json();
    return astronauts;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 2. Obtener dashboard completo
async function getDashboard() {
  try {
    const response = await fetch('http://localhost:5000/astronauts/dashboard');
    const dashboard = await response.json();
    return dashboard;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. Obtener estadísticas de un astronauta
async function getAstronautStats(astronautId) {
  try {
    const response = await fetch(`http://localhost:5000/astronauts/statistics/${astronautId}`);
    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 4. Obtener datos históricos
async function getHistoricalData(astronautId, startDate, endDate) {
  try {
    const url = `http://localhost:5000/astronauts/monitoring/history/${astronautId}?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 5. Ejecutar seeds
async function runSeeds() {
  try {
    const response = await fetch('http://localhost:5000/astronauts/seeds/run-all', {
      method: 'POST'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### **Ejemplo de Uso Completo:**
```javascript
// Componente React de ejemplo
function AstronautDashboard() {
  const [astronauts, setAstronauts] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Cargar datos iniciales
        const [astronautsData, dashboardData] = await Promise.all([
          getAllAstronauts(),
          getDashboard()
        ]);
        
        setAstronauts(astronautsData);
        setDashboard(dashboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Dashboard COSMOTEC</h1>
      <div>
        <h2>Astronautas ({astronauts.length})</h2>
        {astronauts.map(astronaut => (
          <div key={astronaut.id}>
            <h3>{astronaut.fullName} ({astronaut.codename})</h3>
            <p>Estado: {astronaut.currentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🚀 **Pasos para Configurar:**

1. **Ejecutar Seeds:**
```bash
curl -X POST http://localhost:5000/astronauts/seeds/run-all
```

2. **Verificar que funciona:**
```bash
curl http://localhost:5000/astronauts/test
```

3. **Obtener datos del dashboard:**
```bash
curl http://localhost:5000/astronauts/dashboard
```

¡Con esta guía tu frontend tiene toda la información necesaria para manejar los datos del sistema COSMOTEC! 🚀👨‍🚀
