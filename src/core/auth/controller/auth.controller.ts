import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from '../dto/signin.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Controller('auth')
export class authController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  async singIn(@Body() credentials: SignInDTO): Promise<JwtTokenDto> {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      if (error.code == 401) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto): Promise<DefaultResponseDto> {
    try {
      const res = await this.authService.signUp(user);
      return res;
    } catch (error) {
      if (error.code == 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
