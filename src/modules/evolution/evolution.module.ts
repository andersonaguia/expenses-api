import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { CategoryModule } from '../category/category.module';
import { UsersModule } from '../users/users.module';
import { ExpenseModule } from '../expense/expense.module';
import { evolutionProviders } from './evolution.providers';

@Module({
  imports: [UsersModule, CategoryModule, ExpenseModule],
  controllers: [],
  providers: [...databaseProviders, ...evolutionProviders],
  exports: [],
})
export class EvolutionModule {}
