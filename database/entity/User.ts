import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column('timestamp')
  @CreateDateColumn()
  createdAt!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updatedAt!: Date;
}
