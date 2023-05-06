import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from '../dto/signin.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { JwtTokenDto } from '../dto/jwt-token.dto';
import { Roles } from '../guards/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/enum/user.role';
import { RolesGuard } from '../guards/roles/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class authController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  async singIn(@Body() credentials: SignInDTO): Promise<JwtTokenDto> {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      if (error.statusCode == 401) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  /*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)*/
  @Post('/signup')
  async signUp(
    @Body() user: CreateUserDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.authService.signUp(user);
    } catch (error) {
      if (error.statusCode == 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
