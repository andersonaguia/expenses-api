import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column({ length: 250, unique: true })
  name: string;

  @Column({ type: 'float' })
  monthlyCost: number;

  @Column({ type: 'float' })
  annualCost: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  modifiedBy: UserEntity;
}
