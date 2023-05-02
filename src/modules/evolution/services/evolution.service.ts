import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EvolutionEntity } from '../entities/evolution.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpenseService } from 'src/modules/expense/services/expense.service';

@Injectable()
export class EvolutionService {
  constructor(
    @Inject('EVOLUTION_REPOSITORY')
    private readonly evolutionRepository: Repository<EvolutionEntity>,
    private readonly userService: UsersService,
    private readonly expenseService: ExpenseService,
  ) {}
}
