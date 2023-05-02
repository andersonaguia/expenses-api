import { BaseEntity } from 'src/core/entities/base.entity';
import { ExpenseEntity } from 'src/modules/expense/entities/expense.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'evolution' })
export class EvolutionEntity extends BaseEntity {
  @ManyToOne(() => ExpenseEntity, (expense) => expense.id, {
    nullable: false,
  })
  expense: ExpenseEntity;

  @Column({ type: 'float' })
  currentMonthlyCash: number;

  @Column({ type: 'float' })
  currentAnnualCash: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  modifiedBy: UserEntity;
}
