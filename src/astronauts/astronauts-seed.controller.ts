import { Controller, Post, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SeedsRunner } from './seeds';

@Controller('astronauts/seeds')
export class AstronautsSeedController {
  constructor(private dataSource: DataSource) {}

  @Post('run-all')
  async runAllSeeds() {
    try {
      const seedsRunner = new SeedsRunner(this.dataSource);
      await seedsRunner.runAllSeeds();
      
      return {
        success: true,
        message: 'Todos los seeds ejecutados exitosamente',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error ejecutando seeds',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Post('profiles')
  async runProfilesSeed() {
    try {
      const seedsRunner = new SeedsRunner(this.dataSource);
      await seedsRunner.runProfilesSeed();
      
      return {
        success: true,
        message: 'Seed de perfiles ejecutado exitosamente',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error ejecutando seed de perfiles',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Post('monitoring')
  async runMonitoringSeed() {
    try {
      const seedsRunner = new SeedsRunner(this.dataSource);
      await seedsRunner.runMonitoringSeed();
      
      return {
        success: true,
        message: 'Seed de datos de monitoreo ejecutado exitosamente',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error ejecutando seed de datos de monitoreo',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Get('status')
  async getSeedStatus() {
    try {
      const profileRepository = this.dataSource.getRepository('AstronautProfile');
      const monitoringRepository = this.dataSource.getRepository('AstronautMonitoring');
      
      const profileCount = await profileRepository.count();
      const monitoringCount = await monitoringRepository.count();
      
      return {
        success: true,
        data: {
          profiles: profileCount,
          monitoringRecords: monitoringCount,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error obteniendo estado de seeds',
        error: error.message
      };
    }
  }
}
