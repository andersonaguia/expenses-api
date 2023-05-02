import { DataSource } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';

export const expenseProviders = [
  {
    provide: 'EXPENSE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExpenseEntity),
    inject: ['DATA_SOURCE'],
  },
];
