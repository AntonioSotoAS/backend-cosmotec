# 🚀 API Documentation - Sistema de Monitoreo de Astronautas COSMOTEC

## 📋 Resumen del Sistema

Este sistema permite monitorear en tiempo real el estado emocional y físico de astronautas utilizando análisis facial y reconocimiento de emociones. Los datos se envían cada minuto desde el sistema Python al backend NestJS.

## 🗄️ Estructura de Base de Datos

### Entidades Principales:

1. **AstronautMonitoring** - Datos de monitoreo individual
2. **CrewStatus** - Estado general de la tripulación  
3. **AstronautProfile** - Perfiles de astronautas
4. **Emotion** - Datos emocionales (existente)

## 🔗 Endpoints Principales

### 1. Recibir Datos del Sistema Python
```http
POST /astronauts/monitoring/data
Content-Type: application/json
```

**Ejemplo de payload desde Python:**
```json
{
  "astronautId": "carlos_diaz",
  "astronautName": "Carlos Diaz", 
  "codename": "CD",
  "timestamp": "2024-01-15T13:32:06Z",
  "faceDetected": true,
  "faceConfidence": 0.85,
  "recognizedName": "Carlos Diaz",
  "eyeOpening": 85,
  "tensionExpressions": 45,
  "pallor": 30,
  "focus": 90,
  "concentration": 88,
  "ear": 0.25,
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
  "stateDescription": "Carlos está contento/feliz",
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
```

### 2. Obtener Estado Actual de Astronauta
```http
GET /astronauts/status/{astronautId}
```

### 3. Obtener Datos Históricos
```http
GET /astronauts/monitoring/history/{astronautId}?startDate=2024-01-01&endDate=2024-01-31&state=OPTIMO
```

### 4. Obtener Estado de Tripulación
```http
GET /astronauts/crew-status/current
```

### 5. Obtener Datos del Dashboard
```http
GET /astronauts/dashboard
```

### 6. Obtener Alertas Activas
```http
GET /astronauts/alerts/active
```

## 📊 Datos que se Guardan Cada Minuto

### Datos Básicos:
- `timestamp` - Fecha y hora del registro
- `astronautId` - ID único del astronauta
- `astronautName` - Nombre completo
- `codename` - Código de identificación

### Datos de Reconocimiento Facial:
- `faceDetected` - Si se detectó una cara
- `faceConfidence` - Confianza del reconocimiento (0-1)
- `recognizedName` - Nombre reconocido

### Indicadores Faciales:
- `eyeOpening` - Apertura ocular (0-100%)
- `tensionExpressions` - Expresiones de tensión (0-100%)
- `pallor` - Palidez (0-100%)
- `focus` - Focalización (0-100%)
- `concentration` - Concentración (0-100%)
- `ear` - Eye Aspect Ratio
- `eyeState` - Estado de los ojos (open/drowsy/closed)

### Datos Emocionales:
- `dominantEmotion` - Emoción dominante
- `emotionConfidence` - Confianza emocional
- `emotionalState` - Estado emocional (OPTIMO/ESTRESADO/CRITICO)
- `emotionBreakdown` - Desglose de emociones

### Estado General:
- `overallState` - Estado general (OPTIMO/ESTRESADO/CRITICO)
- `stateDescription` - Descripción del estado
- `alertLevel` - Nivel de alerta (NORMAL/WARNING/CRITICAL)
- `consecutiveClosedFrames` - Frames consecutivos con ojos cerrados
- `stabilityFrames` - Frames de estabilidad

### Análisis por Minuto:
- `sentimentCounts` - Conteo de sentimientos
- `dominantSentiment` - Sentimiento dominante
- `sentimentPercentage` - Porcentaje de sentimiento
- `totalFrames` - Total de frames analizados

### Alertas:
- `activeAlerts` - Alertas activas
- `alertHistory` - Historial de alertas
- `recommendedActions` - Acciones recomendadas

## 🎯 Integración con Sistema Python

Tu código Python ya está configurado para enviar datos a:
```python
API_URL = "http://localhost:5000/emotions"
```

**Cambia la URL a:**
```python
API_URL = "http://localhost:3000/astronauts/monitoring/data"
```

Y actualiza la función `send_emotion_to_api` para enviar todos los datos:

```python
def send_emotion_to_api(astronaut_data):
    """Envía datos completos de monitoreo a la API"""
    try:
        data = {
            "astronautId": astronaut_data.get("astronautId", "unknown"),
            "astronautName": astronaut_data.get("astronautName", "Desconocido"),
            "codename": astronaut_data.get("codename", "UNK"),
            "timestamp": datetime.now().isoformat() + "Z",
            "faceDetected": astronaut_data.get("faceDetected", False),
            "faceConfidence": astronaut_data.get("faceConfidence", 0),
            "recognizedName": astronaut_data.get("recognizedName", ""),
            "eyeOpening": astronaut_data.get("eyeOpening", 0),
            "tensionExpressions": astronaut_data.get("tensionExpressions", 0),
            "pallor": astronaut_data.get("pallor", 0),
            "focus": astronaut_data.get("focus", 0),
            "concentration": astronaut_data.get("concentration", 0),
            "ear": astronaut_data.get("ear", 0),
            "eyeState": astronaut_data.get("eyeState", "unknown"),
            "dominantEmotion": astronaut_data.get("dominantEmotion", "neutral"),
            "emotionConfidence": astronaut_data.get("emotionConfidence", 0),
            "emotionalState": astronaut_data.get("emotionalState", "OPTIMO"),
            "emotionBreakdown": astronaut_data.get("emotionBreakdown", {}),
            "overallState": astronaut_data.get("overallState", "OPTIMO"),
            "stateDescription": astronaut_data.get("stateDescription", ""),
            "alertLevel": astronaut_data.get("alertLevel", "NORMAL"),
            "consecutiveClosedFrames": astronaut_data.get("consecutiveClosedFrames", 0),
            "stabilityFrames": astronaut_data.get("stabilityFrames", 0),
            "sentimentCounts": astronaut_data.get("sentimentCounts", {}),
            "dominantSentiment": astronaut_data.get("dominantSentiment", "OPTIMO"),
            "sentimentPercentage": astronaut_data.get("sentimentPercentage", 0),
            "totalFrames": astronaut_data.get("totalFrames", 0),
            "activeAlerts": astronaut_data.get("activeAlerts", []),
            "alertHistory": astronaut_data.get("alertHistory", []),
            "recommendedActions": astronaut_data.get("recommendedActions", [])
        }
        
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
```

## 🚀 Cómo Usar

1. **Iniciar el backend NestJS:**
```bash
npm run start:dev
```

2. **Configurar la base de datos PostgreSQL** con las entidades creadas

3. **Ejecutar el sistema Python** con la nueva URL de API

4. **Acceder al dashboard** usando los endpoints para obtener datos en tiempo real

## 📈 Dashboard Data

El endpoint `/astronauts/dashboard` devuelve:
- Estado actual de todos los astronautas
- Alertas activas
- Estadísticas de la tripulación
- Datos históricos para gráficos

¡El sistema está listo para monitorear astronautas en tiempo real! 🚀👨‍🚀
