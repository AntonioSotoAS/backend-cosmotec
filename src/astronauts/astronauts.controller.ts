import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { AstronautsService } from './astronauts.service';
import { Astronaut } from './entities/astronaut.entity';
import { CreateAstronautDto } from './dto/create-astronaut.dto';
import { UpdateAstronautDto } from './dto/update-astronaut.dto';
import { CreateAstronautMonitoringDto } from './dto/create-astronaut-monitoring.dto';
import { CreateCrewStatusDto } from './dto/create-crew-status.dto';
import { AstronautMonitoring } from './entities/astronaut-monitoring.entity';
import { CrewStatus } from './entities/crew-status.entity';
import { AstronautProfile } from './entities/astronaut-profile.entity';

@Controller('astronauts')
export class AstronautsController {
  constructor(private readonly astronautsService: AstronautsService) {}

  @Get()
  async findAll(): Promise<Astronaut[]> {
    return this.astronautsService.findAll();
  }

  // Endpoint de prueba simple
  @Get('test')
  async testEndpoint(): Promise<any> {
    return {
      success: true,
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      data: {
        astronauts: ['Bautista Machuca', 'Castro García', 'Gamonal Chauca', 'López Campoverde', 'Miranda Saldaña', 'Montejo Soto']
      }
    };
  }

  // Endpoint para obtener perfiles de astronautas
  @Get('profiles')
  async getAstronautProfiles(): Promise<AstronautProfile[]> {
    return this.astronautsService.getAstronautProfiles();
  }

  // Endpoint para obtener dashboard data (datos para el panel de control)
  @Get('dashboard')
  async getDashboardData(): Promise<any> {
    return this.astronautsService.getDashboardData();
  }

  // Endpoint para obtener alertas activas
  @Get('alerts/active')
  async getActiveAlerts(): Promise<any[]> {
    return this.astronautsService.getActiveAlerts();
  }

  // Endpoint para obtener estadísticas de la tripulación
  @Get('crew/statistics')
  async getCrewStatistics(): Promise<any> {
    return this.astronautsService.getCrewStatistics();
  }

  // Endpoint para obtener estado actual de la tripulación
  @Get('crew-status/current')
  async getCurrentCrewStatus(): Promise<CrewStatus | null> {
    return this.astronautsService.getCurrentCrewStatus();
  }

  // Endpoint para obtener historial de estados de tripulación
  @Get('crew-status/history')
  async getCrewStatusHistory(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<CrewStatus[]> {
    return this.astronautsService.getCrewStatusHistory(limit, offset);
  }

  // Endpoint para obtener estadísticas de un astronauta específico
  @Get('statistics/:astronautId')
  async getAstronautStatistics(@Param('astronautId') astronautId: string): Promise<any> {
    return this.astronautsService.getAstronautStatistics(astronautId);
  }

  // Endpoint para obtener el estado actual de un astronauta
  @Get('status/:astronautId')
  async getCurrentStatus(@Param('astronautId') astronautId: string): Promise<AstronautMonitoring | null> {
    return this.astronautsService.getCurrentStatus(astronautId);
  }

  // Endpoint para obtener datos de monitoreo de un astronauta específico
  @Get('monitoring/:astronautId')
  async getMonitoringData(
    @Param('astronautId') astronautId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ): Promise<AstronautMonitoring[]> {
    return this.astronautsService.getMonitoringData(astronautId, limit, offset);
  }

  // Endpoint para obtener datos históricos con filtros
  @Get('monitoring/history/:astronautId')
  async getHistoricalData(
    @Param('astronautId') astronautId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('state') state?: string
  ): Promise<AstronautMonitoring[]> {
    return this.astronautsService.getHistoricalData(astronautId, startDate, endDate, state);
  }

  // Endpoint genérico para obtener astronauta por ID - DEBE ir AL FINAL
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Astronaut> {
    const astronaut = await this.astronautsService.findOne(id);
    if (!astronaut) {
      throw new NotFoundException('Astronauta no encontrado');
    }
    return astronaut;
  }

  @Post()
  async create(@Body() createAstronautDto: CreateAstronautDto): Promise<Astronaut> {
    return this.astronautsService.create(createAstronautDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAstronautDto: UpdateAstronautDto): Promise<Astronaut> {
    const astronaut = await this.astronautsService.findOne(id);
    if (!astronaut) {
      throw new NotFoundException('Astronauta no encontrado');
    }
    const updatedAstronaut = await this.astronautsService.update(id, updateAstronautDto);
    if (!updatedAstronaut) {
      throw new NotFoundException('Error al actualizar el astronauta');
    }
    return updatedAstronaut;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const astronaut = await this.astronautsService.findOne(id);
    if (!astronaut) {
      throw new NotFoundException('Astronauta no encontrado');
    }
    return this.astronautsService.delete(id);
  }

  // ========== ENDPOINTS PARA MONITOREO DE ASTRONAUTAS ==========

  // Endpoint para recibir datos de monitoreo del sistema Python
  @Post('monitoring')
  async createMonitoringData(@Body() createMonitoringDto: CreateAstronautMonitoringDto): Promise<AstronautMonitoring> {
    return this.astronautsService.createMonitoringData(createMonitoringDto);
  }

  // Endpoint para crear/actualizar estado de tripulación
  @Post('crew-status')
  async createCrewStatus(@Body() createCrewStatusDto: CreateCrewStatusDto): Promise<CrewStatus> {
    return this.astronautsService.createCrewStatus(createCrewStatusDto);
  }

  // Endpoint para crear/actualizar perfil de astronauta
  @Post('profiles')
  async createAstronautProfile(@Body() profileData: any): Promise<AstronautProfile> {
    return this.astronautsService.createAstronautProfile(profileData);
  }

}
