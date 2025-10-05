import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  codename: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaEmocion?: Date;
}
