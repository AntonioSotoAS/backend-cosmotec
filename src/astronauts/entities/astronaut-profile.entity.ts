import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('astronaut_profiles')
export class AstronautProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  astronautId: string;

  @Column()
  fullName: string;

  @Column()
  codename: string;

  @Column({ nullable: true })
  initials: string;

  @Column({ nullable: true })
  photoUrl: string; // URL de la foto para reconocimiento

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  baselineMetrics: {
    normalEyeOpening: number;
    normalTensionExpressions: number;
    normalPallor: number;
    normalFocus: number;
    normalConcentration: number;
    normalEar: number;
  };

  @Column({ type: 'json', nullable: true })
  thresholds: {
    stressThreshold: number;
    criticalThreshold: number;
    drowsyThreshold: number;
    closedThreshold: number;
  };

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isMonitoring: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastSeen: Date;

  @Column({ nullable: true })
  currentStatus: string; // OPTIMO, ESTRESADO, CRITICO

  @Column({ type: 'timestamp', nullable: true })
  statusLastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
