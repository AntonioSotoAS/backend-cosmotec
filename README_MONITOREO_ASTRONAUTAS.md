# 🚀 Sistema de Monitoreo de Astronautas COSMOTEC

## 📋 Resumen del Sistema

Sistema de monitoreo en tiempo real para astronautas que utiliza análisis facial y reconocimiento de emociones. Los datos se envían cada minuto desde el sistema Python al backend NestJS.

## 🔄 Datos que se Guardan Cada Minuto

### 📊 **Estructura de Datos por Minuto:**

```json
{
  "timestamp": "2024-01-15T13:32:06Z",
  "astronautId": "carlos_diaz",
  "astronautName": "Carlos Diaz",
  "codename": "CD",
  
  // === RECONOCIMIENTO FACIAL ===
  "faceDetected": true,
  "faceConfidence": 0.85,
  "recognizedName": "Carlos Diaz",
  
  // === INDICADORES FACIALES ===
  "eyeOpening": 85,           // Apertura ocular %
  "tensionExpressions": 45,    // Expresiones de tensión %
  "pallor": 30,               // Palidez %
  "focus": 90,                // Focalización %
  "concentration": 88,         // Concentración %
  "ear": 0.25,                // Eye Aspect Ratio
  "eyeState": "open",         // open/drowsy/closed
  
  // === DATOS EMOCIONALES ===
  "dominantEmotion": "happy",
  "emotionConfidence": 0.75,
  "emotionalState": "OPTIMO",  // OPTIMO/ESTRESADO/CRITICO
  "emotionBreakdown": {
    "happy": 0.75,
    "neutral": 0.15,
    "sad": 0.05,
    "angry": 0.03,
    "surprise": 0.02
  },
  
  // === ESTADO GENERAL ===
  "overallState": "OPTIMO",     // OPTIMO/ESTRESADO/CRITICO
  "stateDescription": "Carlos está contento/feliz",
  "alertLevel": "NORMAL",       // NORMAL/WARNING/CRITICAL
  "consecutiveClosedFrames": 0,
  "stabilityFrames": 15,
  
  // === ANÁLISIS POR MINUTO ===
  "sentimentCounts": {
    "OPTIMO": 45,
    "ESTRESADO": 10,
    "CRITICO": 5
  },
  "dominantSentiment": "OPTIMO",
  "sentimentPercentage": 75.0,
  "totalFrames": 60,
  
  // === ALERTAS ===
  "activeAlerts": ["ESTRÉS ALTO DETECTADO"],
  "alertHistory": [
    {
      "type": "ESTRÉS ALTO DETECTADO",
      "timestamp": "15:02",
      "severity": "HIGH"
    }
  ],
  "recommendedActions": [
    "NOTIFICAR_MÉDICO",
    "RECOMENDAR_DESCANSO"
  ]
}
```

## 🎯 Endpoint Principal para Enviar Datos

### **URL del Endpoint:**
```
POST http://localhost:3000/astronauts/monitoring/data
```

### **Headers:**
```
Content-Type: application/json
```

### **Ejemplo de Envío desde Python:**

```python
import requests
import json
from datetime import datetime

# Configuración de API
API_URL = "http://localhost:3000/astronauts/monitoring/data"
API_HEADERS = {"Content-Type": "application/json"}

def send_astronaut_monitoring_data(astronaut_data):
    """Envía datos completos de monitoreo cada minuto"""
    try:
        # Estructura de datos que debe enviar tu sistema Python
        data = {
            # Identificación básica
            "astronautId": astronaut_data.get("astronautId", "unknown"),
            "astronautName": astronaut_data.get("astronautName", "Desconocido"),
            "codename": astronaut_data.get("codename", "UNK"),
            "timestamp": datetime.now().isoformat() + "Z",
            
            # Reconocimiento facial
            "faceDetected": astronaut_data.get("faceDetected", False),
            "faceConfidence": astronaut_data.get("faceConfidence", 0),
            "recognizedName": astronaut_data.get("recognizedName", ""),
            
            # Indicadores faciales (valores 0-100)
            "eyeOpening": astronaut_data.get("eyeOpening", 0),
            "tensionExpressions": astronaut_data.get("tensionExpressions", 0),
            "pallor": astronaut_data.get("pallor", 0),
            "focus": astronaut_data.get("focus", 0),
            "concentration": astronaut_data.get("concentration", 0),
            "ear": astronaut_data.get("ear", 0),
            "eyeState": astronaut_data.get("eyeState", "unknown"),
            
            # Datos emocionales
            "dominantEmotion": astronaut_data.get("dominantEmotion", "neutral"),
            "emotionConfidence": astronaut_data.get("emotionConfidence", 0),
            "emotionalState": astronaut_data.get("emotionalState", "OPTIMO"),
            "emotionBreakdown": astronaut_data.get("emotionBreakdown", {}),
            
            # Estado general
            "overallState": astronaut_data.get("overallState", "OPTIMO"),
            "stateDescription": astronaut_data.get("stateDescription", ""),
            "alertLevel": astronaut_data.get("alertLevel", "NORMAL"),
            "consecutiveClosedFrames": astronaut_data.get("consecutiveClosedFrames", 0),
            "stabilityFrames": astronaut_data.get("stabilityFrames", 0),
            
            # Análisis por minuto
            "sentimentCounts": astronaut_data.get("sentimentCounts", {}),
            "dominantSentiment": astronaut_data.get("dominantSentiment", "OPTIMO"),
            "sentimentPercentage": astronaut_data.get("sentimentPercentage", 0),
            "totalFrames": astronaut_data.get("totalFrames", 0),
            
            # Alertas
            "activeAlerts": astronaut_data.get("activeAlerts", []),
            "alertHistory": astronaut_data.get("alertHistory", []),
            "recommendedActions": astronaut_data.get("recommendedActions", [])
        }
        
        # Enviar datos a la API
        response = requests.post(API_URL, headers=API_HEADERS, json=data, timeout=5)
        
        if response.status_code in [200, 201]:
            print(f"✅ Datos guardados exitosamente para {data['astronautName']}")
            return True
        else:
            print(f"❌ Error en API: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error enviando datos a la API: {e}")
        return False

# Ejemplo de uso en tu bucle principal
def main():
    # ... tu código existente ...
    
    # Cada minuto, enviar datos
    if elapsed_minutes >= 1.0:
        astronaut_data = {
            "astronautId": last_recognized_name.lower().replace(" ", "_"),
            "astronautName": last_recognized_name,
            "codename": last_recognized_name[:2].upper(),
            "faceDetected": person_detected,
            "faceConfidence": current_confidence,
            "recognizedName": last_recognized_name,
            "eyeOpening": 85,  # Calcular desde tu código
            "tensionExpressions": 45,  # Calcular desde tu código
            "pallor": 30,  # Calcular desde tu código
            "focus": 90,  # Calcular desde tu código
            "concentration": 88,  # Calcular desde tu código
            "ear": ear if ear else 0,
            "eyeState": eye_state,
            "dominantEmotion": dominant_emo,
            "emotionConfidence": emo_conf,
            "emotionalState": emotional_state,
            "emotionBreakdown": emo_ema or {},
            "overallState": estado_general,
            "stateDescription": estado_desc,
            "alertLevel": "CRITICAL" if estado_general == "CRITICO" else "NORMAL",
            "consecutiveClosedFrames": consecutive_closed_frames,
            "stabilityFrames": stable_state_frames,
            "sentimentCounts": sentiment_tracker,
            "dominantSentiment": dominant_sentiment,
            "sentimentPercentage": percentage,
            "totalFrames": total_states,
            "activeAlerts": ["ESTRÉS ALTO DETECTADO"] if estado_general == "ESTRESADO" else [],
            "alertHistory": [],
            "recommendedActions": ["NOTIFICAR_MÉDICO"] if estado_general == "CRITICO" else []
        }
        
        send_astronaut_monitoring_data(astronaut_data)
```

## 📊 Otros Endpoints Disponibles

### **Obtener Estado Actual:**
```
GET /astronauts/status/{astronautId}
```

### **Obtener Datos Históricos:**
```
GET /astronauts/monitoring/history/{astronautId}?startDate=2024-01-01&endDate=2024-01-31&state=OPTIMO
```

### **Obtener Datos del Dashboard:**
```
GET /astronauts/dashboard
```

### **Obtener Alertas Activas:**
```
GET /astronauts/alerts/active
```

### **Obtener Estado de Tripulación:**
```
GET /astronauts/crew-status/current
```

## 🚀 Configuración del Sistema

### **1. Iniciar Backend NestJS:**
```bash
npm run start:dev
```

### **2. Configurar Base de Datos:**
- PostgreSQL con las entidades creadas
- Las tablas se crean automáticamente con `synchronize: true`

### **3. Actualizar tu Código Python:**
- Cambiar `API_URL` a: `http://localhost:3000/astronauts/monitoring/data`
- Usar la función `send_astronaut_monitoring_data()` cada minuto

## 📈 Datos para el Panel de Control

El sistema guarda todos los datos necesarios para mostrar:

1. **Panel de Identificación**: Nombre, iniciales, estado
2. **Panel de Estado General**: Indicador visual del estado
3. **Panel de Tiempo Real**: Alertas, historial, botones de acción
4. **Panel de Indicadores Faciales**: Todos los porcentajes faciales
5. **Panel Comparativo**: Estado de toda la tripulación
6. **Panel Histórico**: Gráficos y tendencias

## ⚠️ Importante

- **Frecuencia**: Enviar datos cada minuto (60 segundos)
- **Formato**: JSON con todos los campos especificados
- **Endpoint**: `POST /astronauts/monitoring/data`
- **Validación**: El sistema valida automáticamente los datos recibidos

¡El sistema está listo para monitorear astronautas en tiempo real! 🚀👨‍🚀
