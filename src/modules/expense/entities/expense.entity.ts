import { BaseEntity } from 'src/core/entities/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
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

  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.id, {
    nullable: true,
  })
  subcategory: SubcategoryEntity;

  @Column({ length: 250 })
  comments: string;

  @Column({ nullable: false })
  residentialPercentage: number;

  @Column({ nullable: false })
  commercialPercentage: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  monthlyExpense: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  annualExpense: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  residentialMonthExpense: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  commercialMonthExpense: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  modifiedBy: UserEntity;
}
