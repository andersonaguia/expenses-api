import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpenseEntity } from '../entities/expense.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private readonly expenseRepository: Repository<ExpenseEntity>,
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    newExpense: CreateExpenseDto,
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
          const category = await this.categoryService.findById(
            +newExpense.category,
          );
          if (!category) {
            reject({
              statusCode: 404,
              message: 'Caterogia não foi encontrada',
            });
          } else {
            const expense = new ExpenseEntity();
            expense.currentYear = newExpense.currentYear;
            expense.name = newExpense.name;
            expense.category = category;
            expense.comments = newExpense.comments;
            expense.solarPercentage = newExpense.solarPercentage;
            expense.rivierePercentage = newExpense.rivierePercentage;
            expense.monthlyExpense = newExpense.monthlyExpense;
            expense.annualExpense = newExpense.annualExpense;
            expense.solarMonthExpense = newExpense.solarMonthExpense;
            expense.riviereMonthExpense = newExpense.riviereMonthExpense;
            expense.createdAt = new Date();
            expense.modifiedBy = user;

            await this.expenseRepository.save(expense);
            resolve({
              statusCode: 201,
              message: 'Despensa criada com sucesso',
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /*
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
            user: true,
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
      category.modifiedBy = el.user.name;
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
          const categoryNameExists = await this.findByName(data.name);
          if (categoryNameExists) {
            reject({
              statusCode: 409,
              message: 'Já existe uma categoria com esse nome',
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
                name: data.name.toUpperCase(),
                user: user,
                updatedAt: new Date(),
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
              user: user,
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
  */
}
