import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThan } from 'typeorm';
import { Astronaut } from './entities/astronaut.entity';
import { AstronautMonitoring } from './entities/astronaut-monitoring.entity';
import { CrewStatus } from './entities/crew-status.entity';
import { AstronautProfile } from './entities/astronaut-profile.entity';
import { CreateAstronautMonitoringDto } from './dto/create-astronaut-monitoring.dto';
import { CreateCrewStatusDto } from './dto/create-crew-status.dto';

@Injectable()
export class AstronautsService {
  constructor(
    @InjectRepository(Astronaut)
    private astronautRepository: Repository<Astronaut>,
    @InjectRepository(AstronautMonitoring)
    private monitoringRepository: Repository<AstronautMonitoring>,
    @InjectRepository(CrewStatus)
    private crewStatusRepository: Repository<CrewStatus>,
    @InjectRepository(AstronautProfile)
    private profileRepository: Repository<AstronautProfile>,
  ) {}

  async findAll(): Promise<Astronaut[]> {
    return this.astronautRepository.find();
  }

  async findOne(id: number): Promise<Astronaut | null> {
    return this.astronautRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Astronaut>): Promise<Astronaut> {
    const astronaut = this.astronautRepository.create(data);
    return this.astronautRepository.save(astronaut);
  }

  async update(id: number, data: Partial<Astronaut>): Promise<Astronaut | null> {
    await this.astronautRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.astronautRepository.delete(id);
  }

  // ========== MÉTODOS PARA MONITOREO DE ASTRONAUTAS ==========

  async createMonitoringData(createMonitoringDto: CreateAstronautMonitoringDto): Promise<AstronautMonitoring> {
    const monitoring = this.monitoringRepository.create(createMonitoringDto);
    return this.monitoringRepository.save(monitoring);
  }

  async getMonitoringData(astronautId: string, limit: number = 50, offset: number = 0): Promise<AstronautMonitoring[]> {
    return this.monitoringRepository.find({
      where: { astronautId },
      order: { timestamp: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async getCurrentStatus(astronautId: string): Promise<AstronautMonitoring | null> {
    return this.monitoringRepository.findOne({
      where: { astronautId },
      order: { timestamp: 'DESC' },
    });
  }

  async getHistoricalData(
    astronautId: string, 
    startDate?: string, 
    endDate?: string, 
    state?: string
  ): Promise<AstronautMonitoring[]> {
    const where: any = { astronautId };
    
    if (startDate && endDate) {
      where.timestamp = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.timestamp = MoreThan(new Date(startDate));
    } else if (endDate) {
      where.timestamp = LessThan(new Date(endDate));
    }
    
    if (state) {
      where.overallState = state;
    }

    return this.monitoringRepository.find({
      where,
      order: { timestamp: 'DESC' },
    });
  }

  async createCrewStatus(createCrewStatusDto: CreateCrewStatusDto): Promise<CrewStatus> {
    const crewStatus = this.crewStatusRepository.create(createCrewStatusDto);
    return this.crewStatusRepository.save(crewStatus);
  }

  async getCurrentCrewStatus(): Promise<CrewStatus | null> {
    const crewStatuses = await this.crewStatusRepository.find({
      order: { timestamp: 'DESC' },
      take: 1,
    });
    return crewStatuses.length > 0 ? crewStatuses[0] : null;
  }

  async getCrewStatusHistory(limit: number = 50, offset: number = 0): Promise<CrewStatus[]> {
    return this.crewStatusRepository.find({
      order: { timestamp: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async getAstronautProfiles(): Promise<AstronautProfile[]> {
    return this.profileRepository.find({
      where: { isActive: true },
      order: { fullName: 'ASC' },
    });
  }

  async createAstronautProfile(profileData: Partial<AstronautProfile>): Promise<AstronautProfile> {
    const profile = this.profileRepository.create(profileData);
    return this.profileRepository.save(profile);
  }

  async getDashboardData(): Promise<any> {
    try {
      // Obtener datos para el dashboard
      const currentCrewStatus = await this.getCurrentCrewStatus();
      const activeAlerts = await this.getActiveAlerts();
      const crewStatistics = await this.getCrewStatistics();
      
      // Obtener estado actual de cada astronauta
      const profiles = await this.getAstronautProfiles();
      const astronautStatuses = await Promise.all(
        profiles.map(async (profile) => {
          const currentStatus = await this.getCurrentStatus(profile.astronautId);
          return {
            ...profile,
            currentStatus: currentStatus || null,
          };
        })
      );

      return {
        success: true,
        crewStatus: currentCrewStatus,
        activeAlerts: activeAlerts || [],
        crewStatistics: crewStatistics || {},
        astronautStatuses: astronautStatuses || [],
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error en getDashboardData:', error);
      return {
        success: false,
        error: error.message,
        crewStatus: null,
        activeAlerts: [],
        crewStatistics: {},
        astronautStatuses: [],
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getActiveAlerts(): Promise<any[]> {
    // Obtener alertas activas de los últimos 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const recentMonitoring = await this.monitoringRepository.find({
      where: {
        timestamp: MoreThan(fiveMinutesAgo),
        alertLevel: 'CRITICAL',
      },
      order: { timestamp: 'DESC' },
    });

    return recentMonitoring.map(monitoring => ({
      astronautId: monitoring.astronautId,
      astronautName: monitoring.astronautName,
      alertType: monitoring.overallState,
      description: monitoring.stateDescription,
      timestamp: monitoring.timestamp,
      recommendedActions: monitoring.recommendedActions || [],
    }));
  }

  async getCrewStatistics(): Promise<any> {
    // Estadísticas de la tripulación en las últimas 24 horas
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const recentData = await this.monitoringRepository.find({
      where: {
        timestamp: MoreThan(twentyFourHoursAgo),
      },
    });

    // Calcular estadísticas
    const totalRecords = recentData.length;
    const stateCounts = recentData.reduce((acc, record) => {
      acc[record.overallState] = (acc[record.overallState] || 0) + 1;
      return acc;
    }, {});

    const uniqueAstronauts = new Set(recentData.map(r => r.astronautId)).size;

    return {
      totalRecords,
      uniqueAstronauts,
      stateCounts,
      timeRange: {
        start: twentyFourHoursAgo,
        end: new Date(),
      },
    };
  }

  async getAstronautStatistics(astronautId: string): Promise<any> {
    // Obtener perfil del astronauta
    const profile = await this.profileRepository.findOne({
      where: { astronautId }
    });

    if (!profile) {
      throw new Error(`Astronauta ${astronautId} no encontrado`);
    }

    // Obtener datos de los últimos 7 días
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const monitoringData = await this.monitoringRepository.find({
      where: {
        astronautId,
        timestamp: MoreThan(sevenDaysAgo),
      },
      order: { timestamp: 'DESC' },
    });

    // Calcular estadísticas
    const totalRecords = monitoringData.length;
    const stateCounts = monitoringData.reduce((acc, record) => {
      acc[record.overallState] = (acc[record.overallState] || 0) + 1;
      return acc;
    }, {});

    // Calcular porcentajes
    const statePercentages = Object.keys(stateCounts).reduce((acc, state) => {
      acc[state] = totalRecords > 0 ? (stateCounts[state] / totalRecords) * 100 : 0;
      return acc;
    }, {});

    // Calcular métricas promedio
    const averageMetrics = {
      eyeOpening: monitoringData.reduce((sum, record) => sum + (record.eyeOpening || 0), 0) / totalRecords,
      tensionExpressions: monitoringData.reduce((sum, record) => sum + (record.tensionExpressions || 0), 0) / totalRecords,
      pallor: monitoringData.reduce((sum, record) => sum + (record.pallor || 0), 0) / totalRecords,
      focus: monitoringData.reduce((sum, record) => sum + (record.focus || 0), 0) / totalRecords,
      concentration: monitoringData.reduce((sum, record) => sum + (record.concentration || 0), 0) / totalRecords,
      ear: monitoringData.reduce((sum, record) => sum + (record.ear || 0), 0) / totalRecords,
    };

    // Calcular alertas
    const alertHistory = {
      totalAlerts: monitoringData.filter(record => record.alertLevel === 'CRITICAL').length,
      criticalAlerts: monitoringData.filter(record => record.overallState === 'CRITICO').length,
      stressAlerts: monitoringData.filter(record => record.overallState === 'ESTRESADO').length,
      lastAlert: monitoringData.find(record => record.alertLevel === 'CRITICAL')?.timestamp || null,
    };

    // Calcular score de rendimiento (0-100)
    const performanceScore = totalRecords > 0 
      ? ((stateCounts['OPTIMO'] || 0) * 100 + (stateCounts['ESTRESADO'] || 0) * 50) / totalRecords
      : 0;

    return {
      astronautId: profile.astronautId,
      fullName: profile.fullName,
      codename: profile.codename,
      statistics: {
        totalRecords,
        timeRange: {
          start: sevenDaysAgo,
          end: new Date(),
        },
        stateCounts,
        statePercentages,
        averageMetrics,
        alertHistory,
        performanceScore: Math.round(performanceScore * 100) / 100,
      },
    };
  }

  // ========== MÉTODOS PARA REPORTES ==========

  async generateReportData(startDate: string, endDate: string): Promise<any[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Obtener todos los datos de monitoreo en el rango de fechas
    const monitoringData = await this.monitoringRepository.find({
      where: {
        timestamp: Between(start, end),
      },
      order: { timestamp: 'DESC' },
    });

    // Obtener perfiles de astronautas para enriquecer los datos
    const profiles = await this.profileRepository.find();
    const profileMap = new Map(profiles.map(p => [p.astronautId, p]));

    // Enriquecer datos con información del perfil
    return monitoringData.map(record => {
      const profile = profileMap.get(record.astronautId);
      return {
        id: record.id,
        astronautId: record.astronautId,
        astronautName: record.astronautName,
        codename: record.codename,
        fullName: profile?.fullName || record.astronautName,
        timestamp: record.timestamp,
        faceDetected: record.faceDetected,
        faceConfidence: record.faceConfidence,
        eyeOpening: record.eyeOpening,
        tensionExpressions: record.tensionExpressions,
        pallor: record.pallor,
        focus: record.focus,
        concentration: record.concentration,
        ear: record.ear,
        eyeState: record.eyeState,
        dominantEmotion: record.dominantEmotion,
        emotionConfidence: record.emotionConfidence,
        emotionalState: record.emotionalState,
        overallState: record.overallState,
        stateDescription: record.stateDescription,
        alertLevel: record.alertLevel,
        consecutiveClosedFrames: record.consecutiveClosedFrames,
        stabilityFrames: record.stabilityFrames,
        dominantSentiment: record.dominantSentiment,
        sentimentPercentage: record.sentimentPercentage,
        totalFrames: record.totalFrames,
        activeAlerts: record.activeAlerts,
        recommendedActions: record.recommendedActions,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt
      };
    });
  }

  async getReportSummary(startDate: string, endDate: string): Promise<any> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Obtener datos agregados
    const monitoringData = await this.monitoringRepository.find({
      where: {
        timestamp: Between(start, end),
      },
    });

    // Calcular estadísticas generales
    const totalRecords = monitoringData.length;
    const uniqueAstronauts = new Set(monitoringData.map(r => r.astronautId)).size;
    
    const stateCounts = monitoringData.reduce((acc, record) => {
      acc[record.overallState] = (acc[record.overallState] || 0) + 1;
      return acc;
    }, {});

    const alertCounts = monitoringData.reduce((acc, record) => {
      acc[record.alertLevel] = (acc[record.alertLevel] || 0) + 1;
      return acc;
    }, {});

    // Calcular métricas promedio
    const averageMetrics = {
      eyeOpening: monitoringData.reduce((sum, r) => sum + r.eyeOpening, 0) / totalRecords,
      tensionExpressions: monitoringData.reduce((sum, r) => sum + r.tensionExpressions, 0) / totalRecords,
      pallor: monitoringData.reduce((sum, r) => sum + r.pallor, 0) / totalRecords,
      focus: monitoringData.reduce((sum, r) => sum + r.focus, 0) / totalRecords,
      concentration: monitoringData.reduce((sum, r) => sum + r.concentration, 0) / totalRecords,
      ear: monitoringData.reduce((sum, r) => sum + r.ear, 0) / totalRecords,
    };

    return {
      reportInfo: {
        generatedAt: new Date().toISOString(),
        dateRange: { startDate, endDate },
        totalRecords,
        uniqueAstronauts,
        duration: {
          start: start,
          end: end,
          days: Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        }
      },
      statistics: {
        stateCounts,
        statePercentages: Object.keys(stateCounts).reduce((acc, state) => {
          acc[state] = totalRecords > 0 ? (stateCounts[state] / totalRecords) * 100 : 0;
          return acc;
        }, {}),
        alertCounts,
        averageMetrics
      }
    };
  }
}
