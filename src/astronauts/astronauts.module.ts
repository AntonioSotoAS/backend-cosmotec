import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AstronautsService } from './astronauts.service';
import { AstronautsController } from './astronauts.controller';
import { AstronautsMonitoringController } from './astronauts-monitoring.controller';
import { AstronautsSeedController } from './astronauts-seed.controller';
import { ReportsController } from './reports.controller';
import { Astronaut } from './entities/astronaut.entity';
import { AstronautMonitoring } from './entities/astronaut-monitoring.entity';
import { CrewStatus } from './entities/crew-status.entity';
import { AstronautProfile } from './entities/astronaut-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Astronaut, 
    AstronautMonitoring, 
    CrewStatus, 
    AstronautProfile
  ])],
  controllers: [AstronautsController, AstronautsMonitoringController, AstronautsSeedController, ReportsController],
  providers: [AstronautsService],
})
export class AstronautsModule {}
