import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emotion } from './entities/emotion.entity';

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private emotionRepository: Repository<Emotion>,
  ) {}

  async findAll(): Promise<Emotion[]> {
    return this.emotionRepository.find({
      order: { fechaEmocion: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Emotion | null> {
    return this.emotionRepository.findOne({ where: { id } });
  }

  async findByCodename(codename: string): Promise<Emotion[]> {
    return this.emotionRepository.find({
      where: { codename },
      order: { fechaEmocion: 'DESC' }
    });
  }

  async create(data: Partial<Emotion>): Promise<Emotion> {
    const emotion = this.emotionRepository.create(data);
    return this.emotionRepository.save(emotion);
  }

  async update(id: number, data: Partial<Emotion>): Promise<Emotion | null> {
    await this.emotionRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.emotionRepository.delete(id);
  }

  async getEmotionsByDateRange(startDate: Date, endDate: Date): Promise<Emotion[]> {
    return this.emotionRepository
      .createQueryBuilder('emotion')
      .where('emotion.fechaEmocion BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('emotion.fechaEmocion', 'DESC')
      .getMany();
  }
}
