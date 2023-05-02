import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
        resolve(userExists);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findUserById(userId: number): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.userRepository.findOne({
          where: {
            id: userId,
          },
        });
        resolve(userExists);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(user: CreateUserDto): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = user;
        const userToCreate = this.userRepository.create(user);
        userToCreate.role = user.role;
        userToCreate.salt = await bcrypt.genSalt(12);
        userToCreate.password = await this.hashPassword(
          password,
          userToCreate.salt,
        );
        userToCreate.createdAt = new Date();
        const userCreated = await this.userRepository.save(userToCreate);

        if (userCreated) {
          resolve({
            statusCode: 201,
            message: 'Cadastro realizado com sucesso!',
          });
        }
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY')
          reject({
            code: 409,
            message:
              'Já existe um usuário cadastrado com o mesmo e-mail ou CNPJ',
          });
        reject(error);
      }
    });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
