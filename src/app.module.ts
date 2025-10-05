import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AstronautsModule } from './astronauts/astronauts.module';
import { EmotionsModule } from './emotions/emotions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'naruto20',
      database: 'cosmotec',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AstronautsModule,
    EmotionsModule,
  ],
})
export class AppModule {}
