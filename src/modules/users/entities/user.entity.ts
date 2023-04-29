import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enum/user.role';

@Entity({ name: 'system_users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 150 })
  name: string;

  @Column({ nullable: false })
  occupation: string;

  @Column({ nullable: false, length: 50, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @Column({ default: true, nullable: false })
  active: boolean;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true, default: null })
  updatedAt: Date;

  @Column({ nullable: true, default: null })
  deletedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
