import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { Emotion } from './entities/emotion.entity';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Get()
  async findAll(): Promise<Emotion[]> {
    return this.emotionsService.findAll();
  }

  @Get('by-codename/:codename')
  async findByCodename(@Param('codename') codename: string): Promise<Emotion[]> {
    return this.emotionsService.findByCodename(codename);
  }

  @Get('by-date-range')
  async getByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ): Promise<Emotion[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.emotionsService.getEmotionsByDateRange(start, end);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Emotion> {
    const emotion = await this.emotionsService.findOne(id);
    if (!emotion) {
      throw new NotFoundException('Emoción no encontrada');
    }
    return emotion;
  }

  @Post()
  async create(@Body() createEmotionDto: CreateEmotionDto): Promise<Emotion> {
    return this.emotionsService.create(createEmotionDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEmotionDto: UpdateEmotionDto): Promise<Emotion> {
    const emotion = await this.emotionsService.findOne(id);
    if (!emotion) {
      throw new NotFoundException('Emoción no encontrada');
    }
    const updatedEmotion = await this.emotionsService.update(id, updateEmotionDto);
    if (!updatedEmotion) {
      throw new NotFoundException('Error al actualizar la emoción');
    }
    return updatedEmotion;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const emotion = await this.emotionsService.findOne(id);
    if (!emotion) {
      throw new NotFoundException('Emoción no encontrada');
    }
    return this.emotionsService.delete(id);
  }
}
