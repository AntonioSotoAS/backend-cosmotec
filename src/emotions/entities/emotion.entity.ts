import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codename: string;

  @Column()
  tipo: string; // feliz, triste, ansioso, emocionado, etc.

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEmocion: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
