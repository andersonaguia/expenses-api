import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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
            categoryToSave.monthlyCost = newCategory.monthlyCost;
            categoryToSave.annualCost = newCategory.annualCost;
            categoryToSave.modifiedBy = userExist;
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
        console.log(error);
        reject(error);
      }
    });
  }

  async findById(categoryId: number): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryRepository.findOne({
          where: { id: Equal(categoryId), deletedAt: IsNull() },
        });
        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByName(name: string): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryRepository.findOne({
          where: { name: name, deletedAt: IsNull() },
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
          where: {
            deletedAt: IsNull(),
          },
          relations: {
            modifiedBy: true,
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
      category.monthlyCost = el.monthlyCost;
      category.annualCost = el.annualCost;
      category.createdAt = el.createdAt;
      category.modifiedBy = el.modifiedBy.name;
      return category;
    });
    return categoriesFormatted;
  }

  update(
    data: UpdateCategoryDto,
    categoryId: number,
    req: any,
  ): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersService.findUserById(+req.user.id);
        if (!user) {
          reject({
            statusCode: 404,
            message: 'Usuário não encontrado',
          });
        } else {
          let categoryNameExists: CategoryEntity = null;
          if (data.name) {
            data.name = data.name.toUpperCase();
            categoryNameExists = await this.findByName(data.name);
          } else {
            delete data.name;
          }
          if (categoryNameExists) {
            reject({
              statusCode: 409,
              message: 'Já existe uma categoria com o mesmo nome',
            });
          } else {
            const category = await this.findById(categoryId);
            if (!category) {
              reject({
                statusCode: 404,
                message: 'Categoria não encontrada',
              });
            } else {
              data.modifiedBy = user;
              data.updatedAt = new Date();
              const { affected } = await this.categoryRepository.update(
                {
                  id: Equal(category.id),
                },
                data,
              );

              if (affected > 0) {
                resolve({
                  statusCode: 200,
                  message: 'Dados atualizados com sucesso',
                });
              } else {
                reject({
                  code: 400,
                  message:
                    'Ocorreu um erro ao atualizar os dados. Tente novamente!',
                });
              }
            }
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(categoryId: number, req: any): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersService.findUserById(+req.user.id);
        if (!user) {
          reject({
            statusCode: 404,
            message: 'Usuário não encontrado',
          });
        } else {
          const category = await this.findById(categoryId);
          if (!category) {
            reject({
              statusCode: 404,
              message: 'Categoria não encontrada',
            });
          } else {
            const dataToUpdate = {
              modifiedBy: user,
              deletedAt: new Date(),
            };

            const { affected } = await this.categoryRepository.update(
              {
                id: Equal(category.id),
              },
              dataToUpdate,
            );

            if (affected > 0) {
              resolve({
                statusCode: 200,
                message: 'Dados excluídos com sucesso',
              });
            } else {
              reject({
                code: 400,
                message:
                  'Ocorreu um erro ao excluir os dados. Tente novamente!',
              });
            }
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
