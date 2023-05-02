import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpenseEntity } from '../entities/expense.entity';
import { CategoryService } from 'src/modules/category/services/category.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { ExpenseResponseDto } from '../dto/expense-response.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';

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

  async findAll(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const expenses = await this.expenseRepository.find({
          where: {
            deletedAt: IsNull(),
          },
          relations: {
            category: true,
            modifiedBy: true,
          },
        });
        if (expenses.length > 0) {
          resolve(this.formatExpenses(expenses));
        } else {
          resolve([]);
        }
      } catch (error) {
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
      expense.solarPercentage = el.solarPercentage;
      expense.rivierePercentage = el.rivierePercentage;
      expense.monthlyExpense = el.monthlyExpense;
      expense.annualExpense = el.annualExpense;
      expense.solarMonthExpense = el.solarMonthExpense;
      expense.riviereMonthExpense = el.riviereMonthExpense;
      expense.category = {
        id: el.category.id,
        name: el.category.name,
      };
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
            const dataToUpdate = {
              modifiedBy: user,
              deletedAt: new Date(),
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
