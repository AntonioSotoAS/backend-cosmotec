import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('astronaut_monitoring')
@Index(['astronautId', 'timestamp'])
@Index(['timestamp'])
export class AstronautMonitoring {
  @PrimaryGeneratedColumn()
  id: number;

  // Identificación del astronauta
  @Column()
  astronautId: string;

  @Column()
  astronautName: string;

  @Column()
  codename: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  // Datos de reconocimiento facial
  @Column({ type: 'boolean', default: false })
  faceDetected: boolean;

  @Column({ type: 'float', nullable: true })
  faceConfidence: number;

  @Column({ nullable: true })
  recognizedName: string;

  // Indicadores faciales
  @Column({ type: 'float', nullable: true })
  eyeOpening: number; // Apertura ocular %

  @Column({ type: 'float', nullable: true })
  tensionExpressions: number; // Expresiones de tensión %

  @Column({ type: 'float', nullable: true })
  pallor: number; // Palidez %

  @Column({ type: 'float', nullable: true })
  focus: number; // Focalización %

  @Column({ type: 'float', nullable: true })
  concentration: number; // Concentración %

  @Column({ type: 'float', nullable: true })
  ear: number; // Eye Aspect Ratio

  @Column({ nullable: true })
  eyeState: string; // open, drowsy, closed

  // Datos emocionales
  @Column({ nullable: true })
  dominantEmotion: string; // happy, sad, angry, etc.

  @Column({ type: 'float', nullable: true })
  emotionConfidence: number;

  @Column({ nullable: true })
  emotionalState: string; // OPTIMO, ESTRESADO, CRITICO

  @Column({ type: 'json', nullable: true })
  emotionBreakdown: object; // {happy: 0.75, neutral: 0.15, ...}

  // Estado general
  @Column()
  overallState: string; // OPTIMO, ESTRESADO, CRITICO

  @Column({ type: 'text', nullable: true })
  stateDescription: string;

  @Column({ nullable: true })
  alertLevel: string; // NORMAL, WARNING, CRITICAL

  @Column({ type: 'int', default: 0 })
  consecutiveClosedFrames: number;

  @Column({ type: 'int', default: 0 })
  stabilityFrames: number;

  // Análisis por minuto
  @Column({ type: 'json', nullable: true })
  sentimentCounts: object; // {OPTIMO: 45, ESTRESADO: 10, CRITICO: 5}

  @Column({ nullable: true })
  dominantSentiment: string;

  @Column({ type: 'float', nullable: true })
  sentimentPercentage: number;

  @Column({ type: 'int', default: 0 })
  totalFrames: number;

  // Alertas
  @Column({ type: 'json', nullable: true })
  activeAlerts: string[]; // ["ESTRÉS ALTO DETECTADO"]

  @Column({ type: 'json', nullable: true })
  alertHistory: object[]; // [{type: "ESTRÉS ALTO", timestamp: "15:02", severity: "HIGH"}]

  @Column({ type: 'json', nullable: true })
  recommendedActions: string[]; // ["NOTIFICAR_MÉDICO", "RECOMENDAR_DESCANSO"]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
