import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { UsersModule } from '../users/users.module';
import { expenseProviders } from './expense.providers';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseService } from './services/expense.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UsersModule, CategoryModule],
  controllers: [ExpenseController],
  providers: [...databaseProviders, ...expenseProviders, ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
