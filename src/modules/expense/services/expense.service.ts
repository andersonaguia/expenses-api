import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpenseEntity } from '../entities/expense.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { ExpenseResponseDto } from '../dto/expense-response.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { SubcategoryService } from 'src/modules/subcategory/services/subcategory.service';
import { EvolutionEntity } from 'src/modules/evolution/entities/evolution.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @Inject('EVOLUTION_REPOSITORY')
    private readonly evolutionRepository: Repository<EvolutionEntity>,
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
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
            +newExpense.categoryId,
          );
          if (!category) {
            reject({
              statusCode: 404,
              message: 'Categoria não foi encontrada',
            });
          } else {
            const subcategory = await this.subcategoryService.findById(
              +newExpense.subcategoryId,
            );
            const expense = new ExpenseEntity();
            expense.currentYear = newExpense.currentYear;
            expense.name = newExpense.name;
            expense.category = category;
            expense.subcategory = subcategory;
            expense.comments = newExpense.comments;
            expense.residentialPercentage = newExpense.residentialPercentage;
            expense.commercialPercentage = newExpense.commercialPercentage;
            expense.monthlyExpense = newExpense.monthlyExpense;
            expense.annualExpense = newExpense.annualExpense;
            expense.residentialMonthExpense =
              newExpense.residentialMonthExpense;
            expense.commercialMonthExpense = newExpense.commercialMonthExpense;
            expense.createdAt = new Date();
            expense.modifiedBy = user;

            await this.expenseRepository.save(expense);
            resolve({
              statusCode: 201,
              message: 'Despesa criada com sucesso',
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const expenses = await this.expenseRepository.find({
          where: {
            deletedAt: IsNull(),
          },
          relations: {
            category: true,
            subcategory: true,
            modifiedBy: true,
          },
        });
        if (expenses.length > 0) {
          resolve(this.formatExpenses(expenses));
        } else {
          resolve([]);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  formatExpenses(expenses: ExpenseEntity[]): ExpenseResponseDto[] {
    const expensesFormatted = expenses.map((el) => {
      const expense = new ExpenseResponseDto();
      expense.id = el.id;
      expense.currentYear = el.currentYear;
      expense.name = el.name;
      expense.comments = el.comments;
      expense.residentialPercentage = el.residentialPercentage;
      expense.commercialPercentage = el.commercialPercentage;
      expense.monthlyExpense = el.monthlyExpense;
      expense.annualExpense = el.annualExpense;
      expense.residentialMonthExpense = el.residentialMonthExpense;
      expense.commercialMonthExpense = el.commercialMonthExpense;
      expense.category = {
        id: el.category.id,
        name: el.category.name,
      };

      if (el.subcategory) {
        expense.subcategory = {
          id: el.subcategory.id,
          name: el.subcategory.name,
        };
      } else {
        expense.subcategory = null;
      }

      expense.createdAt = el.createdAt;
      expense.modifiedBy = el.modifiedBy.name;

      return expense;
    });
    return expensesFormatted;
  }

  async findById(expenseId: number): Promise<ExpenseEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const expense = await this.expenseRepository.findOne({
          where: { id: Equal(expenseId), deletedAt: IsNull() },
        });
        resolve(expense);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByName(name: string): Promise<ExpenseEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const expense = await this.expenseRepository.findOne({
          where: { name: name, deletedAt: IsNull() },
        });
        resolve(expense);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(
    data: UpdateExpenseDto,
    expenseId: number,
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
          const expense = await this.findById(expenseId);

          if (!expense) {
            reject({
              statusCode: 404,
              message: 'Despesa não encontrada',
            });
          } else {
            const dataToUpdate = {
              comments: data.comments,
              modifiedBy: user,
              updatedAt: new Date(),
            };

            const { affected } = await this.expenseRepository.update(
              {
                id: Equal(expense.id),
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
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(expenseId: number, req: any): Promise<DefaultResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.usersService.findUserById(+req.user.id);
        if (!user) {
          reject({
            statusCode: 404,
            message: 'Usuário não encontrado',
          });
        } else {
          const expense = await this.findById(expenseId);
          if (!expense) {
            reject({
              statusCode: 404,
              message: 'Despesa não encontrada',
            });
          } else {
            const expenseWasPosted = await this.evolutionRepository.findOne({
              where: {
                expense: { id: Equal(expense.id) },
                deletedAt: IsNull(),
              },
            });
            if (expenseWasPosted) {
              reject({
                statusCode: 403,
                message:
                  'Impossível excluir pois já existem lançamentos efetuados para esta despesa.',
              });
            } else {
              const { affected } = await this.expenseRepository.delete({
                id: Equal(expense.id),
              });

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
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
