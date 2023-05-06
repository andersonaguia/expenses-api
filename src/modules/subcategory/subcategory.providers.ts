import { DataSource } from 'typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { ExpenseEntity } from '../expense/entities/expense.entity';

export const categoryProviders = [
  {
    provide: 'SUBCATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubcategoryEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EXPENSE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExpenseEntity),
    inject: ['DATA_SOURCE'],
  },
];
