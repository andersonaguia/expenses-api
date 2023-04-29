import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(
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

  async findById(categoryId: number): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryRepository.findOne({
          where: { id: Equal(categoryId) },
        });
        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const categories = await this.categoryRepository.find({
          relations: {
            createdBy: true,
          },
        });
        if (categories.length > 0) {
          resolve(this.formatCategories(categories));
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  formatCategories(categories: CategoryEntity[]): CategoryResponseDto[] {
    const categoriesFormatted = categories.map((el) => {
      const category = new CategoryResponseDto();
      category.id = el.id;
      category.name = el.name;
      category.createdAt = el.createdAt;
      category.createdBy = el.createdBy.name;
      return category;
    });
    return categoriesFormatted;
  }
}
