import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { CategoryModule } from '../category/category.module';
import { UsersModule } from '../users/users.module';
import { ExpenseModule } from '../expense/expense.module';
import { evolutionProviders } from './evolution.providers';
import { ExpenseService } from '../expense/services/expense.service';
import { EvolutionController } from './controllers/evolution.controller';

@Module({
  imports: [UsersModule, CategoryModule, ExpenseModule],
  controllers: [EvolutionController],
  providers: [...databaseProviders, ...evolutionProviders, ExpenseService],
  exports: [],
})
export class EvolutionModule {}
