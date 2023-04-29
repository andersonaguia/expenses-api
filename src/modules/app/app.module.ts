import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { CategoryModule } from '../category/category.module';
@Module({
  imports: [AuthModule, UsersModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
