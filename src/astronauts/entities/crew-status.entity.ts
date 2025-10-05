import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('crew_status')
@Index(['timestamp'])
export class CrewStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  // Estado de cada miembro de la tripulación
  @Column({ type: 'json' })
  crewMembers: {
    astronautId: string;
    name: string;
    codename: string;
    status: string; // OPTIMO, CONCENTRADO, FATIGA, ANSIEDAD, CRITICO
    color: string; // Para el dashboard
    lastUpdate: Date;
  }[];

  // Resumen general de la tripulación
  @Column({ type: 'int', default: 0 })
  totalMembers: number;

  @Column({ type: 'int', default: 0 })
  optimalCount: number;

  @Column({ type: 'int', default: 0 })
  stressedCount: number;

  @Column({ type: 'int', default: 0 })
  criticalCount: number;

  @Column({ type: 'int', default: 0 })
  unknownCount: number;

  // Alertas generales de la tripulación
  @Column({ type: 'json', nullable: true })
  crewAlerts: string[];

  @Column({ type: 'text', nullable: true })
  crewNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
