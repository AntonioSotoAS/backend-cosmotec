import { DataSource } from 'typeorm';
import { AstronautProfile } from '../entities/astronaut-profile.entity';

export class AstronautProfilesSeed {
  constructor(private dataSource: DataSource) {}

  async run() {
    const profileRepository = this.dataSource.getRepository(AstronautProfile);

    // Datos del equipo COSMOTEC - Todos en estado ÓPTIMO
    const astronautProfiles = [
      {
        astronautId: 'bautista_machuca_luis_carlos',
        fullName: 'Bautista Machuca Luis Carlos',
        codename: 'BMLC',
        initials: 'BMLC',
        photoUrl: '/images/astronauts/bautista_machuca.jpg',
        description: 'Comandante de la misión COSMOTEC con experiencia en sistemas de monitoreo',
        baselineMetrics: {
          normalEyeOpening: 88,
          normalTensionExpressions: 20,
          normalPallor: 12,
          normalFocus: 92,
          normalConcentration: 90,
          normalEar: 0.30
        },
        thresholds: {
          stressThreshold: 0.65,
          criticalThreshold: 0.85,
          drowsyThreshold: 0.24,
          closedThreshold: 0.14
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      },
      {
        astronautId: 'castro_garcia_jose_heiner',
        fullName: 'Castro García José Heiner',
        codename: 'CGJH',
        initials: 'CGJH',
        photoUrl: '/images/astronauts/castro_garcia.jpg',
        description: 'Especialista en sistemas de soporte vital y monitoreo biométrico',
        baselineMetrics: {
          normalEyeOpening: 87,
          normalTensionExpressions: 22,
          normalPallor: 14,
          normalFocus: 89,
          normalConcentration: 88,
          normalEar: 0.29
        },
        thresholds: {
          stressThreshold: 0.62,
          criticalThreshold: 0.82,
          drowsyThreshold: 0.25,
          closedThreshold: 0.15
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      },
      {
        astronautId: 'gamonal_chauca_jose_roger',
        fullName: 'Gamonal Chauca José Roger',
        codename: 'GCJR',
        initials: 'GCJR',
        photoUrl: '/images/astronauts/gamonal_chauca.jpg',
        description: 'Ingeniero de vuelo especializado en navegación y sistemas de control',
        baselineMetrics: {
          normalEyeOpening: 86,
          normalTensionExpressions: 24,
          normalPallor: 16,
          normalFocus: 88,
          normalConcentration: 87,
          normalEar: 0.28
        },
        thresholds: {
          stressThreshold: 0.60,
          criticalThreshold: 0.80,
          drowsyThreshold: 0.26,
          closedThreshold: 0.16
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      },
      {
        astronautId: 'lopez_campoverde_miguel_angel',
        fullName: 'López Campoverde Miguel Ángel',
        codename: 'LCMA',
        initials: 'LCMA',
        photoUrl: '/images/astronauts/lopez_campoverde.jpg',
        description: 'Especialista en experimentos científicos y análisis de datos',
        baselineMetrics: {
          normalEyeOpening: 89,
          normalTensionExpressions: 18,
          normalPallor: 11,
          normalFocus: 91,
          normalConcentration: 89,
          normalEar: 0.31
        },
        thresholds: {
          stressThreshold: 0.68,
          criticalThreshold: 0.88,
          drowsyThreshold: 0.23,
          closedThreshold: 0.13
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      },
      {
        astronautId: 'miranda_saldana_rodolfo_junior',
        fullName: 'Miranda Saldaña Rodolfo Junior',
        codename: 'MSRJ',
        initials: 'MSRJ',
        photoUrl: '/images/astronauts/miranda_saldana.jpg',
        description: 'Especialista en comunicaciones y sistemas de monitoreo en tiempo real',
        baselineMetrics: {
          normalEyeOpening: 85,
          normalTensionExpressions: 26,
          normalPallor: 17,
          normalFocus: 87,
          normalConcentration: 86,
          normalEar: 0.27
        },
        thresholds: {
          stressThreshold: 0.58,
          criticalThreshold: 0.78,
          drowsyThreshold: 0.27,
          closedThreshold: 0.17
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      },
      {
        astronautId: 'montejo_soto_arturo_antonio',
        fullName: 'Montejo Soto Arturo Antonio',
        codename: 'MSAA',
        initials: 'MSAA',
        photoUrl: '/images/astronauts/montejo_soto.jpg',
        description: 'Médico de vuelo y especialista en salud espacial y monitoreo biométrico',
        baselineMetrics: {
          normalEyeOpening: 90,
          normalTensionExpressions: 16,
          normalPallor: 10,
          normalFocus: 93,
          normalConcentration: 91,
          normalEar: 0.32
        },
        thresholds: {
          stressThreshold: 0.70,
          criticalThreshold: 0.90,
          drowsyThreshold: 0.22,
          closedThreshold: 0.12
        },
        isActive: true,
        isMonitoring: true,
        currentStatus: 'OPTIMO',
        statusLastUpdated: new Date()
      }
    ];

    console.log('🌱 Iniciando seed de perfiles de astronautas...');

    for (const profileData of astronautProfiles) {
      try {
        // Verificar si el perfil ya existe
        const existingProfile = await profileRepository.findOne({
          where: { astronautId: profileData.astronautId }
        });

        if (existingProfile) {
          console.log(`⚠️ Perfil ${profileData.astronautId} ya existe, actualizando...`);
          await profileRepository.update(existingProfile.id, profileData);
        } else {
          console.log(`✅ Creando perfil para ${profileData.fullName} (${profileData.codename})`);
          const profile = profileRepository.create(profileData);
          await profileRepository.save(profile);
        }
      } catch (error) {
        console.error(`❌ Error creando perfil ${profileData.astronautId}:`, error);
      }
    }

    console.log('🎉 Seed de perfiles de astronautas completado');
  }
}
