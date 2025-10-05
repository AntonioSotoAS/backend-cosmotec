import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject, IsDateString } from 'class-validator';

export class CreateAstronautMonitoringDto {
  // Identificación del astronauta
  @IsString()
  astronautId: string;

  @IsString()
  astronautName: string;

  @IsString()
  codename: string;

  @IsDateString()
  timestamp: string;

  // Datos de reconocimiento facial
  @IsBoolean()
  @IsOptional()
  faceDetected?: boolean;

  @IsNumber()
  @IsOptional()
  faceConfidence?: number;

  @IsString()
  @IsOptional()
  recognizedName?: string;

  // Indicadores faciales
  @IsNumber()
  @IsOptional()
  eyeOpening?: number;

  @IsNumber()
  @IsOptional()
  tensionExpressions?: number;

  @IsNumber()
  @IsOptional()
  pallor?: number;

  @IsNumber()
  @IsOptional()
  focus?: number;

  @IsNumber()
  @IsOptional()
  concentration?: number;

  @IsNumber()
  @IsOptional()
  ear?: number;

  @IsString()
  @IsOptional()
  eyeState?: string;

  // Datos emocionales
  @IsString()
  @IsOptional()
  dominantEmotion?: string;

  @IsNumber()
  @IsOptional()
  emotionConfidence?: number;

  @IsString()
  @IsOptional()
  emotionalState?: string;

  @IsObject()
  @IsOptional()
  emotionBreakdown?: object;

  // Estado general
  @IsString()
  overallState: string;

  @IsString()
  @IsOptional()
  stateDescription?: string;

  @IsString()
  @IsOptional()
  alertLevel?: string;

  @IsNumber()
  @IsOptional()
  consecutiveClosedFrames?: number;

  @IsNumber()
  @IsOptional()
  stabilityFrames?: number;

  // Análisis por minuto
  @IsObject()
  @IsOptional()
  sentimentCounts?: object;

  @IsString()
  @IsOptional()
  dominantSentiment?: string;

  @IsNumber()
  @IsOptional()
  sentimentPercentage?: number;

  @IsNumber()
  @IsOptional()
  totalFrames?: number;

  // Alertas
  @IsArray()
  @IsOptional()
  activeAlerts?: string[];

  @IsArray()
  @IsOptional()
  alertHistory?: object[];

  @IsArray()
  @IsOptional()
  recommendedActions?: string[];
}
