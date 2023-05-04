import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { categoryProviders } from './subcategory.providers';
import { UsersModule } from '../users/users.module';
import { SubcategoryController } from './controllers/subcategory.controller';
import { SubcategoryService } from './services/subcategory.service';

@Module({
  imports: [UsersModule],
  controllers: [SubcategoryController],
  providers: [...databaseProviders, ...categoryProviders, SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
