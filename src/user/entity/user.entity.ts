import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  avatar: string | null;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @CreateDateColumn()
  createdAt: Date;
}
