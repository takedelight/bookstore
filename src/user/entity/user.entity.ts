import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SessionEntity } from '../../shared/session.entity';
export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
