import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { authController } from './controller/auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
require('dotenv-flow').config();

@Module({
  controllers: [authController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6h',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
