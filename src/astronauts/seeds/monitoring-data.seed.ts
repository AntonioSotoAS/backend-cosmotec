import { DataSource } from 'typeorm';
import { AstronautMonitoring } from '../entities/astronaut-monitoring.entity';

export class MonitoringDataSeed {
  constructor(private dataSource: DataSource) {}

  async run() {
    const monitoringRepository = this.dataSource.getRepository(AstronautMonitoring);

    // Generar datos de monitoreo de ejemplo para los últimos 7 días
    const astronautIds = [
      'bautista_machuca_luis_carlos', 
      'castro_garcia_jose_heiner', 
      'gamonal_chauca_jose_roger', 
      'lopez_campoverde_miguel_angel', 
      'miranda_saldana_rodolfo_junior', 
      'montejo_soto_arturo_antonio'
    ];
    const states = ['OPTIMO', 'ESTRESADO', 'CRITICO'];
    
    console.log('🌱 Iniciando seed de datos de monitoreo...');

    for (const astronautId of astronautIds) {
      const astronautName = this.getAstronautName(astronautId);
      const codename = this.getCodename(astronautId);
      
      // Generar datos para los últimos 7 días (cada 5 minutos)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      
      for (let i = 0; i < 7 * 24 * 12; i++) { // 7 días * 24 horas * 12 registros por hora (cada 5 min)
        const timestamp = new Date(startDate.getTime() + i * 5 * 60 * 1000);
        
        // Generar estado basado en patrones realistas
        const state = this.generateRealisticState(timestamp, astronautId);
        
        const monitoringData = {
          astronautId,
          astronautName,
          codename,
          timestamp,
          faceDetected: true,
          faceConfidence: 0.85 + Math.random() * 0.1,
          recognizedName: astronautName,
          eyeOpening: this.generateEyeOpening(state),
          tensionExpressions: this.generateTensionExpressions(state),
          pallor: this.generatePallor(state),
          focus: this.generateFocus(state),
          concentration: this.generateConcentration(state),
          ear: 0.20 + Math.random() * 0.15,
          eyeState: this.generateEyeState(state),
          dominantEmotion: this.generateDominantEmotion(state),
          emotionConfidence: 0.7 + Math.random() * 0.2,
          emotionalState: state,
          emotionBreakdown: this.generateEmotionBreakdown(state),
          overallState: state,
          stateDescription: this.generateStateDescription(state, astronautName),
          alertLevel: this.generateAlertLevel(state),
          consecutiveClosedFrames: Math.floor(Math.random() * 5),
          stabilityFrames: 10 + Math.floor(Math.random() * 20),
          sentimentCounts: this.generateSentimentCounts(state),
          dominantSentiment: state,
          sentimentPercentage: 60 + Math.random() * 30,
          totalFrames: 50 + Math.floor(Math.random() * 20),
          activeAlerts: this.generateActiveAlerts(state),
          alertHistory: [],
          recommendedActions: this.generateRecommendedActions(state)
        };

        try {
          const monitoring = monitoringRepository.create(monitoringData);
          await monitoringRepository.save(monitoring);
        } catch (error) {
          console.error(`❌ Error creando datos de monitoreo para ${astronautId}:`, error);
        }
      }
      
      console.log(`✅ Datos de monitoreo generados para ${astronautName}`);
    }

    console.log('🎉 Seed de datos de monitoreo completado');
  }

  private getAstronautName(astronautId: string): string {
    const names = {
      'bautista_machuca_luis_carlos': 'Bautista Machuca Luis Carlos',
      'castro_garcia_jose_heiner': 'Castro García José Heiner',
      'gamonal_chauca_jose_roger': 'Gamonal Chauca José Roger',
      'lopez_campoverde_miguel_angel': 'López Campoverde Miguel Ángel',
      'miranda_saldana_rodolfo_junior': 'Miranda Saldaña Rodolfo Junior',
      'montejo_soto_arturo_antonio': 'Montejo Soto Arturo Antonio'
    };
    return names[astronautId] || 'Desconocido';
  }

  private getCodename(astronautId: string): string {
    const codenames = {
      'bautista_machuca_luis_carlos': 'BMLC',
      'castro_garcia_jose_heiner': 'CGJH',
      'gamonal_chauca_jose_roger': 'GCJR',
      'lopez_campoverde_miguel_angel': 'LCMA',
      'miranda_saldana_rodolfo_junior': 'MSRJ',
      'montejo_soto_arturo_antonio': 'MSAA'
    };
    return codenames[astronautId] || 'UNK';
  }

  private generateRealisticState(timestamp: Date, astronautId: string): string {
    const hour = timestamp.getHours();
    const dayOfWeek = timestamp.getDay();
    
    // Patrones realistas basados en hora y día
    if (hour >= 2 && hour <= 6) {
      // Madrugada - más probabilidad de fatiga
      return Math.random() < 0.7 ? 'CRITICO' : Math.random() < 0.5 ? 'ESTRESADO' : 'OPTIMO';
    } else if (hour >= 7 && hour <= 9) {
      // Mañana - estado óptimo
      return Math.random() < 0.8 ? 'OPTIMO' : Math.random() < 0.5 ? 'ESTRESADO' : 'CRITICO';
    } else if (hour >= 10 && hour <= 17) {
      // Día laboral - variado
      return Math.random() < 0.6 ? 'OPTIMO' : Math.random() < 0.7 ? 'ESTRESADO' : 'CRITICO';
    } else if (hour >= 18 && hour <= 22) {
      // Tarde/noche - más relajado
      return Math.random() < 0.7 ? 'OPTIMO' : Math.random() < 0.6 ? 'ESTRESADO' : 'CRITICO';
    } else {
      // Noche - fatiga
      return Math.random() < 0.5 ? 'OPTIMO' : Math.random() < 0.6 ? 'ESTRESADO' : 'CRITICO';
    }
  }

  private generateEyeOpening(state: string): number {
    switch (state) {
      case 'OPTIMO': return 85 + Math.random() * 15;
      case 'ESTRESADO': return 70 + Math.random() * 20;
      case 'CRITICO': return 40 + Math.random() * 30;
      default: return 50 + Math.random() * 40;
    }
  }

  private generateTensionExpressions(state: string): number {
    switch (state) {
      case 'OPTIMO': return 10 + Math.random() * 20;
      case 'ESTRESADO': return 40 + Math.random() * 30;
      case 'CRITICO': return 70 + Math.random() * 25;
      default: return 20 + Math.random() * 50;
    }
  }

  private generatePallor(state: string): number {
    switch (state) {
      case 'OPTIMO': return 5 + Math.random() * 15;
      case 'ESTRESADO': return 20 + Math.random() * 25;
      case 'CRITICO': return 50 + Math.random() * 40;
      default: return 10 + Math.random() * 30;
    }
  }

  private generateFocus(state: string): number {
    switch (state) {
      case 'OPTIMO': return 85 + Math.random() * 15;
      case 'ESTRESADO': return 60 + Math.random() * 25;
      case 'CRITICO': return 30 + Math.random() * 40;
      default: return 50 + Math.random() * 40;
    }
  }

  private generateConcentration(state: string): number {
    switch (state) {
      case 'OPTIMO': return 80 + Math.random() * 20;
      case 'ESTRESADO': return 50 + Math.random() * 30;
      case 'CRITICO': return 20 + Math.random() * 40;
      default: return 40 + Math.random() * 50;
    }
  }

  private generateEyeState(state: string): string {
    switch (state) {
      case 'OPTIMO': return 'open';
      case 'ESTRESADO': return Math.random() < 0.3 ? 'drowsy' : 'open';
      case 'CRITICO': return Math.random() < 0.6 ? 'closed' : Math.random() < 0.8 ? 'drowsy' : 'open';
      default: return 'open';
    }
  }

  private generateDominantEmotion(state: string): string {
    const emotions = {
      'OPTIMO': ['happy', 'neutral'],
      'ESTRESADO': ['surprise', 'fear', 'neutral'],
      'CRITICO': ['sad', 'angry', 'disgust']
    };
    const stateEmotions = emotions[state] || ['neutral'];
    return stateEmotions[Math.floor(Math.random() * stateEmotions.length)];
  }

  private generateEmotionBreakdown(state: string): object {
    const breakdowns = {
      'OPTIMO': { happy: 0.6, neutral: 0.3, sad: 0.05, angry: 0.03, surprise: 0.02 },
      'ESTRESADO': { happy: 0.1, neutral: 0.4, sad: 0.2, angry: 0.15, surprise: 0.15 },
      'CRITICO': { happy: 0.05, neutral: 0.2, sad: 0.4, angry: 0.3, surprise: 0.05 }
    };
    return breakdowns[state] || { neutral: 1.0 };
  }

  private generateStateDescription(state: string, astronautName: string): string {
    const descriptions = {
      'OPTIMO': `${astronautName} está en estado óptimo`,
      'ESTRESADO': `${astronautName} muestra signos de estrés`,
      'CRITICO': `${astronautName} requiere atención médica inmediata`
    };
    return descriptions[state] || 'Estado desconocido';
  }

  private generateAlertLevel(state: string): string {
    switch (state) {
      case 'OPTIMO': return 'NORMAL';
      case 'ESTRESADO': return 'WARNING';
      case 'CRITICO': return 'CRITICAL';
      default: return 'NORMAL';
    }
  }

  private generateSentimentCounts(state: string): object {
    const counts = {
      'OPTIMO': { OPTIMO: 45, ESTRESADO: 10, CRITICO: 5 },
      'ESTRESADO': { OPTIMO: 20, ESTRESADO: 35, CRITICO: 5 },
      'CRITICO': { OPTIMO: 5, ESTRESADO: 15, CRITICO: 40 }
    };
    return counts[state] || { OPTIMO: 30, ESTRESADO: 20, CRITICO: 10 };
  }

  private generateActiveAlerts(state: string): string[] {
    switch (state) {
      case 'CRITICO': return ['ESTADO CRÍTICO DETECTADO', 'REQUIERE ATENCIÓN MÉDICA'];
      case 'ESTRESADO': return ['ESTRÉS ALTO DETECTADO'];
      default: return [];
    }
  }

  private generateRecommendedActions(state: string): string[] {
    switch (state) {
      case 'CRITICO': return ['NOTIFICAR_MÉDICO', 'REVISAR_VITALES', 'PROTOCOLO_EMERGENCIA'];
      case 'ESTRESADO': return ['RECOMENDAR_DESCANSO', 'MONITOREAR_ESTADO'];
      default: return [];
    }
  }
}
