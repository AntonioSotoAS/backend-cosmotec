import { IsString, IsNumber, IsArray, IsObject, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CrewMemberDto {
  @IsString()
  astronautId: string;

  @IsString()
  name: string;

  @IsString()
  codename: string;

  @IsString()
  status: string;

  @IsString()
  color: string;

  @IsDateString()
  lastUpdate: string;
}

export class CreateCrewStatusDto {
  @IsDateString()
  timestamp: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CrewMemberDto)
  crewMembers: CrewMemberDto[];

  @IsNumber()
  @IsOptional()
  totalMembers?: number;

  @IsNumber()
  @IsOptional()
  optimalCount?: number;

  @IsNumber()
  @IsOptional()
  stressedCount?: number;

  @IsNumber()
  @IsOptional()
  criticalCount?: number;

  @IsNumber()
  @IsOptional()
  unknownCount?: number;

  @IsArray()
  @IsOptional()
  crewAlerts?: string[];

  @IsString()
  @IsOptional()
  crewNotes?: string;
}
