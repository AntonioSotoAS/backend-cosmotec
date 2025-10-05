import { PartialType } from '@nestjs/mapped-types';
import { CreateAstronautDto } from './create-astronaut.dto';

export class UpdateAstronautDto extends PartialType(CreateAstronautDto) {}
