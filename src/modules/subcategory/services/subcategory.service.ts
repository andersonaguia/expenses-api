import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { SubcategoryEntity } from '../entities/subcategory.entity';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { SubcategoryResponseDto } from '../dto/subcategory-response.dto';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @Inject('SUBCATEGORY_REPOSITORY')
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    newCategory: CreateSubcategoryDto,
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
          const subcategoryExists = await this.subcategoryRepository.findOne({
            where: {
              name: newCategory.name.toUpperCase(),
              deletedAt: IsNull(),
            },
          });
          if (subcategoryExists) {
            reject({
              statusCode: 409,
              message: 'Já existe uma subcategoria cadastrada com o mesmo nome',
            });
          } else {
            const subcategoryToSave = new SubcategoryEntity();
            subcategoryToSave.name = newCategory.name.toUpperCase();
            subcategoryToSave.modifiedBy = userExist;
            subcategoryToSave.createdAt = new Date();
            subcategoryToSave.updatedAt = null;

            await this.subcategoryRepository.save(subcategoryToSave);
            resolve({
              statusCode: 201,
              message: 'Subcategoria criada com sucesso',
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async findById(subcategoryId: number): Promise<SubcategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const subcategory = await this.subcategoryRepository.findOne({
          where: { id: Equal(subcategoryId), deletedAt: IsNull() },
        });
        resolve(subcategory);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByName(name: string): Promise<SubcategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const subcategory = await this.subcategoryRepository.findOne({
          where: { name: name, deletedAt: IsNull() },
        });
        resolve(subcategory);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<SubcategoryResponseDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const subcategories = await this.subcategoryRepository.find({
          where: {
            deletedAt: IsNull(),
          },
          relations: {
            modifiedBy: true,
          },
        });
        if (subcategories.length > 0) {
          resolve(this.formatSubcategories(subcategories));
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  formatSubcategories(
    subccategories: SubcategoryEntity[],
  ): SubcategoryResponseDto[] {
    const subcategoriesFormatted = subccategories.map((el) => {
      const subcategory = new SubcategoryResponseDto();
      subcategory.id = el.id;
      subcategory.name = el.name;
      subcategory.createdAt = el.createdAt;
      subcategory.modifiedBy = el.modifiedBy.name;
      return subcategory;
    });
    return subcategoriesFormatted;
  }

  update(
    data: UpdateSubcategoryDto,
    subcategoryId: number,
    req: any,
  ): Promise<DefaultResponseDto> {
    data.name = data.name.toUpperCase();
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersService.findUserById(+req.user.id);
        if (!user) {
          reject({
            statusCode: 404,
            message: 'Usuário não encontrado',
          });
        } else {
          let subcategoryNameExists: SubcategoryEntity = null;

          subcategoryNameExists = await this.findByName(data.name);

          if (subcategoryNameExists) {
            reject({
              statusCode: 409,
              message: 'Já existe uma subcategoria com o mesmo nome',
            });
          } else {
            const subcategory = await this.findById(subcategoryId);
            if (!subcategory) {
              reject({
                statusCode: 404,
                message: 'Subcategoria não encontrada',
              });
            } else {
              data.modifiedBy = user;
              data.updatedAt = new Date();
              const { affected } = await this.subcategoryRepository.update(
                {
                  id: Equal(subcategory.id),
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

  delete(subcategoryId: number, req: any): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersService.findUserById(+req.user.id);
        if (!user) {
          reject({
            statusCode: 404,
            message: 'Usuário não encontrado',
          });
        } else {
          const subcategory = await this.findById(subcategoryId);
          if (!subcategory) {
            reject({
              statusCode: 404,
              message: 'Subcategoria não encontrada',
            });
          } else {
            const dataToUpdate = {
              modifiedBy: user,
              deletedAt: new Date(),
            };

            const { affected } = await this.subcategoryRepository.update(
              {
                id: Equal(subcategory.id),
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
