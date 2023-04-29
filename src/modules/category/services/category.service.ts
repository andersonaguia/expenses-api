import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly usersService: UsersService,
  ) {}

  create(
    newCategory: CreateCategoryDto,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const userExist = await this.usersService.findUserById(+req.user.id);
        if (!userExist) {
          reject({
            statusCode: 404,
            message: 'Usuário não foi encontrado',
          });
        } else {
          const categoryExists = await this.categoryRepository.findOne({
            where: {
              name: newCategory.name.toUpperCase(),
              deletedAt: IsNull(),
            },
          });
          if (categoryExists) {
            reject({
              statusCode: 409,
              message: 'Já existe uma categoria cadastrada com o mesmo nome',
            });
          } else {
            const categoryToSave = new CategoryEntity();
            categoryToSave.name = newCategory.name.toUpperCase();
            categoryToSave.createdBy = userExist;
            categoryToSave.createdAt = new Date();
            categoryToSave.updatedAt = null;

            await this.categoryRepository.save(categoryToSave);
            resolve({
              statusCode: 201,
              message: 'Categoria criada com sucesso',
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
