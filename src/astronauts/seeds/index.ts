import { DataSource } from 'typeorm';
import { AstronautProfilesSeed } from './astronaut-profiles.seed';
import { MonitoringDataSeed } from './monitoring-data.seed';

export class SeedsRunner {
  constructor(private dataSource: DataSource) {}

  async runAllSeeds() {
    console.log('🌱 Iniciando proceso de seed completo...');
    
    try {
      // 1. Seed de perfiles de astronautas
      const profilesSeed = new AstronautProfilesSeed(this.dataSource);
      await profilesSeed.run();
      
      // 2. Seed de datos de monitoreo
      const monitoringSeed = new MonitoringDataSeed(this.dataSource);
      await monitoringSeed.run();
      
      console.log('🎉 Todos los seeds completados exitosamente');
    } catch (error) {
      console.error('❌ Error ejecutando seeds:', error);
      throw error;
    }
  }

  async runProfilesSeed() {
    console.log('🌱 Ejecutando solo seed de perfiles...');
    const profilesSeed = new AstronautProfilesSeed(this.dataSource);
    await profilesSeed.run();
  }

  async runMonitoringSeed() {
    console.log('🌱 Ejecutando solo seed de datos de monitoreo...');
    const monitoringSeed = new MonitoringDataSeed(this.dataSource);
    await monitoringSeed.run();
  }
}
