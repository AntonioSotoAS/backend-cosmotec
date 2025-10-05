import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AstronautsService } from './astronauts.service';
import { CreateAstronautMonitoringDto } from './dto/create-astronaut-monitoring.dto';

@Controller('astronauts/monitoring')
export class AstronautsMonitoringController {
  constructor(private readonly astronautsService: AstronautsService) {}

  // Endpoint principal para recibir datos del sistema Python
  @Post('data')
  async receiveMonitoringData(@Body() data: any) {
    try {
      // Mapear datos del sistema Python al formato de la base de datos
      const monitoringData: CreateAstronautMonitoringDto = {
        astronautId: data.astronautId || data.codename || 'unknown',
        astronautName: data.astronautName || data.name || 'Desconocido',
        codename: data.codename || data.astronautId || 'UNK',
        timestamp: data.timestamp || new Date().toISOString(),
        
        // Datos de reconocimiento facial
        faceDetected: data.faceDetected || false,
        faceConfidence: data.faceConfidence || 0,
        recognizedName: data.recognizedName || data.astronautName,
        
        // Indicadores faciales
        eyeOpening: data.eyeOpening || data.facialIndicators?.eyeOpening || 0,
        tensionExpressions: data.tensionExpressions || data.facialIndicators?.tensionExpressions || 0,
        pallor: data.pallor || data.facialIndicators?.pallor || 0,
        focus: data.focus || data.facialIndicators?.focus || 0,
        concentration: data.concentration || data.facialIndicators?.concentration || 0,
        ear: data.ear || data.facialIndicators?.ear || 0,
        eyeState: data.eyeState || data.facialIndicators?.eyeState || 'unknown',
        
        // Datos emocionales
        dominantEmotion: data.dominantEmotion || data.emotionalData?.dominantEmotion || 'neutral',
        emotionConfidence: data.emotionConfidence || data.emotionalData?.emotionConfidence || 0,
        emotionalState: data.emotionalState || data.emotionalData?.emotionalState || 'OPTIMO',
        emotionBreakdown: data.emotionBreakdown || data.emotionalData?.emotionBreakdown || {},
        
        // Estado general
        overallState: data.overallState || data.generalStatus?.overallState || 'OPTIMO',
        stateDescription: data.stateDescription || data.generalStatus?.stateDescription || 'Estado normal',
        alertLevel: data.alertLevel || data.generalStatus?.alertLevel || 'NORMAL',
        consecutiveClosedFrames: data.consecutiveClosedFrames || 0,
        stabilityFrames: data.stabilityFrames || 0,
        
        // Análisis por minuto
        sentimentCounts: data.sentimentCounts || data.minuteAnalysis?.sentimentCounts || {},
        dominantSentiment: data.dominantSentiment || data.minuteAnalysis?.dominantSentiment || 'OPTIMO',
        sentimentPercentage: data.sentimentPercentage || data.minuteAnalysis?.sentimentPercentage || 0,
        totalFrames: data.totalFrames || data.minuteAnalysis?.totalFrames || 0,
        
        // Alertas
        activeAlerts: data.activeAlerts || data.alerts?.activeAlerts || [],
        alertHistory: data.alertHistory || data.alerts?.alertHistory || [],
        recommendedActions: data.recommendedActions || data.alerts?.recommendedActions || [],
      };

      const result = await this.astronautsService.createMonitoringData(monitoringData);
      
      return {
        success: true,
        message: 'Datos de monitoreo guardados exitosamente',
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al guardar datos de monitoreo',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Endpoint para obtener datos de monitoreo recientes
  @Get('recent/:astronautId')
  async getRecentMonitoringData(
    @Param('astronautId') astronautId: string,
    @Query('limit') limit: number = 10
  ) {
    return this.astronautsService.getMonitoringData(astronautId, limit);
  }

  // Endpoint para obtener estado actual de todos los astronautas
  @Get('current-status')
  async getCurrentStatusAll() {
    const profiles = await this.astronautsService.getAstronautProfiles();
    const statuses = await Promise.all(
      profiles.map(async (profile) => {
        const currentStatus = await this.astronautsService.getCurrentStatus(profile.astronautId);
        return {
          astronautId: profile.astronautId,
          name: profile.fullName,
          codename: profile.codename,
          currentStatus: currentStatus?.overallState || 'UNKNOWN',
          lastUpdate: currentStatus?.timestamp || null,
          isMonitoring: profile.isMonitoring,
        };
      })
    );
    
    return {
      success: true,
      data: statuses,
      timestamp: new Date().toISOString()
    };
  }
}
