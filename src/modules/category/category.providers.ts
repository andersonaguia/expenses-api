import { DataSource } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ExpenseEntity } from '../expense/entities/expense.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EXPENSE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExpenseEntity),
    inject: ['DATA_SOURCE'],
  },
];
