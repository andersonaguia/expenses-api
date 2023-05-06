import { DataSource } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { EvolutionEntity } from '../evolution/entities/evolution.entity';

export const expenseProviders = [
  {
    provide: 'EXPENSE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ExpenseEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EVOLUTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EvolutionEntity),
    inject: ['DATA_SOURCE'],
  },
];
