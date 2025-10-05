import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';
import { Emotion } from './entities/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  controllers: [EmotionsController],
  providers: [EmotionsService],
})
export class EmotionsModule {}
