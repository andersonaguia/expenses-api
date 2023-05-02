import { BaseEntity } from 'src/core/entities/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'expense' })
export class ExpenseEntity extends BaseEntity {
  @Column({ nullable: false })
  currentYear: number;

  @Column({ length: 250, unique: true })
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    nullable: false,
  })
  category: CategoryEntity;

  @Column({ length: 250 })
  comments: string;

  @Column({ nullable: false })
  solarPercentage: number;

  @Column({ nullable: false })
  rivierePercentage: number;

  @Column({ type: 'float' })
  monthlyExpense: number;

  @Column({ type: 'float' })
  annualExpense: number;

  @Column({ type: 'float' })
  solarMonthExpense: number;

  @Column({ type: 'float' })
  riviereMonthExpense: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  modifiedBy: UserEntity;
}
