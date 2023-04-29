import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { categoryProviders } from './category.providers';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CategoryController],
  providers: [...databaseProviders, ...categoryProviders, CategoryService],
  exports: [],
})
export class CategoryModule {}
