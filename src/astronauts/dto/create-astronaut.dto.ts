import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateAstronautDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsString()
  @IsNotEmpty()
  codename: string;

  @IsOptional()
  @IsUrl()
  fotoUrl?: string;
}
