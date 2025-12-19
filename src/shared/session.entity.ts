import { ISession } from 'connect-typeorm';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  public id = '';

  @Column('text')
  public json = '';

  @Column({ type: 'timestamp', nullable: true })
  public destroyedAt?: Date;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}
