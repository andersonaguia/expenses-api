import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { databaseProviders } from 'src/core/database/database.provider';
import { UsersService } from './services/users.service';
import { userProviders } from './users.providers';

@Module({
  controllers: [],
  providers: [...databaseProviders, ...userProviders, JwtService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
