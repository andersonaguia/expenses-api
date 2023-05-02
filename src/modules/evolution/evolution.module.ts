import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { CategoryModule } from '../category/category.module';
import { UsersModule } from '../users/users.module';
import { ExpenseModule } from '../expense/expense.module';

@Module({
  imports: [UsersModule, CategoryModule, ExpenseModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [],
})
export class EvolutionModule {}
