import { Inject, Injectable } from '@nestjs/common';
import { Equal, IsNull, Repository } from 'typeorm';
import { EvolutionEntity } from '../entities/evolution.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpenseService } from 'src/modules/expense/services/expense.service';
import { CreateEvolutionDto } from '../dto/create-evolution.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';

@Injectable()
export class EvolutionService {
  constructor(
    @Inject('EVOLUTION_REPOSITORY')
    private readonly evolutionRepository: Repository<EvolutionEntity>,
    private readonly usersService: UsersService,
    private readonly expenseService: ExpenseService,
  ) {}

  async create(
    newEvolution: CreateEvolutionDto,
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
          const expense = await this.expenseService.findById(
            +newEvolution.expenseId,
          );
          if (!expense) {
            reject({
              statusCode: 404,
              message: 'Despesa não foi encontrada',
            });
          } else {
            const evolution = new EvolutionEntity();
            evolution.expense = expense;
            evolution.currentMonthlyCash = newEvolution.currentMonthlyCash;
            evolution.currentAnnualCash = newEvolution.currentAnnualCash;
            evolution.createdAt = new Date();
            evolution.updatedAt = null;
            evolution.modifiedBy = user;

            await this.evolutionRepository.save(evolution);
            resolve({
              statusCode: 201,
              message: 'Dados adicionados com sucesso',
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
        const evolutions = await this.evolutionRepository.find({
          where: {
            deletedAt: IsNull(),
          },
          relations: {
            expense: { category: true },
            modifiedBy: true,
          },
        });
        if (evolutions) {
          resolve(evolutions);
        }
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByCategory(categoryId: number): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const evolutions = await this.evolutionRepository.find({
          where: {
            expense: { category: { id: Equal(+categoryId) } },
            deletedAt: IsNull(),
          },
        });
        if (evolutions) {
          resolve(evolutions);
        }
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }
}
