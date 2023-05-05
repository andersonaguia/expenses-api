import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { ExpenseModule } from '../expense/expense.module';
import { EvolutionModule } from '../evolution/evolution.module';
import { SubcategoryModule } from '../subcategory/subcategory.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoryModule,
    ExpenseModule,
    EvolutionModule,
    SubcategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
