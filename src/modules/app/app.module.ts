import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from 'src/core/auth/auth.module';
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
