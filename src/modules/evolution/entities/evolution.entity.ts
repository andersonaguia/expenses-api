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

  @Column({ type: 'float', precision: 8, scale: 2 })
  lastPayment: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  currentMonthlyCash: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  currentAnnualCash: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  modifiedBy: UserEntity;
}
