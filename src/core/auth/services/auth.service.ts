import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from '../dto/signin.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtTokenDto } from '../dto/jwt-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: SignInDTO): Promise<JwtTokenDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(credentials);
        if (!user) {
          reject({ code: 401, message: 'E-mail ou senha incorretos' });
        }
        const jwtPayload: JwtPayloadDTO = {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        };
        const token = this.jwtService.sign(jwtPayload);

        resolve({ statusCode: 200, token: token });
      } catch (error) {
        reject(error);
      }
    });
  }

  async checkCredentials(credentials: SignInDTO): Promise<UserEntity> {
    const { email, password } = credentials;
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.findUserByEmail(email);
        if (user && (await user.checkPassword(password))) {
          resolve(user);
        }
        resolve(null);
      } catch (error) {
        reject(error);
      }
    });
  }

  async signUp(user: CreateUserDto): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const userToReturn = await this.userService.createUser(user);
        if (userToReturn.statusCode === 201) {
          resolve({
            statusCode: 201,
            message: 'Cadastro realizado com sucesso!',
          });
        } else {
          reject(userToReturn);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
