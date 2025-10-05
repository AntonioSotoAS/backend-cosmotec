# 📊 **Endpoints de Reportes - Sistema COSMOTEC**

## 🎯 **Nuevos Endpoints para Reportes**

### **Base URL:** `http://localhost:5000/astronauts/reports`

---

## 📋 **1. Resumen Estadístico por Fecha**

### **Endpoint:**
```http
GET /astronauts/reports/summary?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

### **Parámetros:**
- `startDate`: Fecha de inicio (formato: YYYY-MM-DD)
- `endDate`: Fecha de fin (formato: YYYY-MM-DD)

### **Ejemplo:**
```bash
curl "http://localhost:5000/astronauts/reports/summary?startDate=2024-10-01&endDate=2024-10-31"
```

### **Respuesta:**
```json
{
  "reportInfo": {
    "generatedAt": "2024-10-05T19:45:00.000Z",
    "dateRange": {
      "startDate": "2024-10-01",
      "endDate": "2024-10-31"
    },
    "totalRecords": 1500,
    "uniqueAstronauts": 6,
    "duration": {
      "start": "2024-10-01T00:00:00.000Z",
      "end": "2024-10-31T23:59:59.999Z",
      "days": 31
    }
  },
  "statistics": {
    "stateCounts": {
      "OPTIMO": 900,
      "ESTRESADO": 450,
      "CRITICO": 150
    },
    "statePercentages": {
      "OPTIMO": 60.0,
      "ESTRESADO": 30.0,
      "CRITICO": 10.0
    },
    "alertCounts": {
      "NORMAL": 1200,
      "WARNING": 250,
      "CRITICAL": 50
    },
    "averageMetrics": {
      "eyeOpening": 87.5,
      "tensionExpressions": 25.3,
      "pallor": 15.8,
      "focus": 88.2,
      "concentration": 86.7,
      "ear": 0.28
    }
  }
}
```

---

## 📄 **2. Reporte CSV (Descarga)**

### **Endpoint:**
```http
GET /astronauts/reports/csv?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&format=csv
```

### **Parámetros:**
- `startDate`: Fecha de inicio (formato: YYYY-MM-DD)
- `endDate`: Fecha de fin (formato: YYYY-MM-DD)
- `format`: Formato de descarga (opcional, default: csv)

### **Ejemplo:**
```bash
curl "http://localhost:5000/astronauts/reports/csv?startDate=2024-10-01&endDate=2024-10-31" -o reporte-astronautas.csv
```

### **Respuesta:**
- **Content-Type:** `text/csv`
- **Content-Disposition:** `attachment; filename="astronautas-reporte-2024-10-01-2024-10-31.csv"`
- **Archivo CSV** con todos los datos de monitoreo

### **Estructura del CSV:**
```csv
id,astronautId,astronautName,codename,fullName,timestamp,faceDetected,faceConfidence,eyeOpening,tensionExpressions,pallor,focus,concentration,ear,eyeState,dominantEmotion,emotionConfidence,emotionalState,overallState,stateDescription,alertLevel,consecutiveClosedFrames,stabilityFrames,dominantSentiment,sentimentPercentage,totalFrames,activeAlerts,recommendedActions,createdAt,updatedAt
1,bautista_machuca_luis_carlos,Bautista Machuca Luis Carlos,BMLC,Bautista Machuca Luis Carlos,2024-10-05T19:04:34.689Z,true,0.8823501690163126,89.32716345241235,53.701305929749566,34.383313254868845,77.83422028225608,64.9546147085882,0.22523450642410334,open,surprise,0.7790133245777213,ESTRESADO,ESTRESADO,Bautista Machuca Luis Carlos muestra signos de estrés,WARNING,2,12,ESTRESADO,82.57311080110163,55,"[""ESTRÉS ALTO DETECTADO""]","[""RECOMENDAR_DESCANSO"",""MONITOREAR_ESTADO""]",2024-10-05T19:09:38.042Z,2024-10-05T19:09:38.042Z
```

---

## 📄 **3. Reporte JSON (Descarga)**

### **Endpoint:**
```http
GET /astronauts/reports/json?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

### **Parámetros:**
- `startDate`: Fecha de inicio (formato: YYYY-MM-DD)
- `endDate`: Fecha de fin (formato: YYYY-MM-DD)

### **Ejemplo:**
```bash
curl "http://localhost:5000/astronauts/reports/json?startDate=2024-10-01&endDate=2024-10-31" -o reporte-astronautas.json
```

### **Respuesta:**
- **Content-Type:** `application/json`
- **Content-Disposition:** `attachment; filename="astronautas-reporte-2024-10-01-2024-10-31.json"`
- **Archivo JSON** con todos los datos estructurados

### **Estructura del JSON:**
```json
{
  "success": true,
  "reportInfo": {
    "generatedAt": "2024-10-05T19:45:00.000Z",
    "dateRange": {
      "startDate": "2024-10-01",
      "endDate": "2024-10-31"
    },
    "totalRecords": 1500
  },
  "data": [
    {
      "id": 1,
      "astronautId": "bautista_machuca_luis_carlos",
      "astronautName": "Bautista Machuca Luis Carlos",
      "codename": "BMLC",
      "fullName": "Bautista Machuca Luis Carlos",
      "timestamp": "2024-10-05T19:04:34.689Z",
      "faceDetected": true,
      "faceConfidence": 0.8823501690163126,
      "eyeOpening": 89.32716345241235,
      "tensionExpressions": 53.701305929749566,
      "pallor": 34.383313254868845,
      "focus": 77.83422028225608,
      "concentration": 64.9546147085882,
      "ear": 0.22523450642410334,
      "eyeState": "open",
      "dominantEmotion": "surprise",
      "emotionConfidence": 0.7790133245777213,
      "emotionalState": "ESTRESADO",
      "overallState": "ESTRESADO",
      "stateDescription": "Bautista Machuca Luis Carlos muestra signos de estrés",
      "alertLevel": "WARNING",
      "consecutiveClosedFrames": 2,
      "stabilityFrames": 12,
      "dominantSentiment": "ESTRESADO",
      "sentimentPercentage": 82.57311080110163,
      "totalFrames": 55,
      "activeAlerts": ["ESTRÉS ALTO DETECTADO"],
      "recommendedActions": ["RECOMENDAR_DESCANSO", "MONITOREAR_ESTADO"],
      "createdAt": "2024-10-05T19:09:38.042Z",
      "updatedAt": "2024-10-05T19:09:38.042Z"
    }
    // ... más registros
  ]
}
```

---

## 🚀 **Ejemplos de Uso en Frontend**

### **JavaScript/React:**
```javascript
// 1. Obtener resumen estadístico
async function getReportSummary(startDate, endDate) {
  try {
    const response = await fetch(
      `http://localhost:5000/astronauts/reports/summary?startDate=${startDate}&endDate=${endDate}`
    );
    const summary = await response.json();
    return summary;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 2. Descargar reporte CSV
async function downloadCsvReport(startDate, endDate) {
  try {
    const response = await fetch(
      `http://localhost:5000/astronauts/reports/csv?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `astronautas-reporte-${startDate}-${endDate}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. Descargar reporte JSON
async function downloadJsonReport(startDate, endDate) {
  try {
    const response = await fetch(
      `http://localhost:5000/astronauts/reports/json?startDate=${startDate}&endDate=${endDate}`
    );
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `astronautas-reporte-${startDate}-${endDate}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// 4. Componente React de ejemplo
function ReportGenerator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const data = await getReportSummary(startDate, endDate);
      setSummary(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCsv = () => {
    downloadCsvReport(startDate, endDate);
  };

  const handleDownloadJson = () => {
    downloadJsonReport(startDate, endDate);
  };

  return (
    <div>
      <h2>Generador de Reportes</h2>
      
      <div>
        <label>Fecha Inicio:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>
      
      <div>
        <label>Fecha Fin:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>
      
      <div>
        <button onClick={handleGenerateSummary} disabled={loading}>
          {loading ? 'Generando...' : 'Ver Resumen'}
        </button>
        <button onClick={handleDownloadCsv} disabled={!startDate || !endDate}>
          Descargar CSV
        </button>
        <button onClick={handleDownloadJson} disabled={!startDate || !endDate}>
          Descargar JSON
        </button>
      </div>
      
      {summary && (
        <div>
          <h3>Resumen del Reporte</h3>
          <p>Total de registros: {summary.reportInfo.totalRecords}</p>
          <p>Astronautas únicos: {summary.reportInfo.uniqueAstronauts}</p>
          <p>Días de monitoreo: {summary.reportInfo.duration.days}</p>
          
          <h4>Estados:</h4>
          <ul>
            {Object.entries(summary.statistics.stateCounts).map(([state, count]) => (
              <li key={state}>
                {state}: {count} ({summary.statistics.statePercentages[state].toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## 📊 **Casos de Uso Comunes**

### **1. Reporte Diario:**
```bash
curl "http://localhost:5000/astronauts/reports/summary?startDate=2024-10-05&endDate=2024-10-05"
```

### **2. Reporte Semanal:**
```bash
curl "http://localhost:5000/astronauts/reports/csv?startDate=2024-10-01&endDate=2024-10-07" -o reporte-semanal.csv
```

### **3. Reporte Mensual:**
```bash
curl "http://localhost:5000/astronauts/reports/json?startDate=2024-10-01&endDate=2024-10-31" -o reporte-mensual.json
```

### **4. Reporte de Última Hora:**
```bash
# Para obtener datos de la última hora
curl "http://localhost:5000/astronauts/reports/summary?startDate=$(date -d '1 hour ago' -u +%Y-%m-%dT%H:%M:%SZ)&endDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

---

## 🔧 **Configuración y Requisitos**

### **Reiniciar el Servidor:**
Después de agregar el nuevo controlador, reinicia el servidor NestJS:

```bash
# Detener el servidor actual (Ctrl+C)
# Luego ejecutar:
npm run start:dev
```

### **Verificar que Funciona:**
```bash
# 1. Probar endpoint de resumen
curl "http://localhost:5000/astronauts/reports/summary?startDate=2024-10-01&endDate=2024-10-31"

# 2. Probar descarga CSV
curl "http://localhost:5000/astronauts/reports/csv?startDate=2024-10-01&endDate=2024-10-31" -o test-report.csv

# 3. Probar descarga JSON
curl "http://localhost:5000/astronauts/reports/json?startDate=2024-10-01&endDate=2024-10-31" -o test-report.json
```

¡Ahora tienes un sistema completo de reportes para descargar datos de todos los astronautas por rango de fechas! 🚀📊
