import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEvolutionDto {
  @IsNotEmpty({ message: 'Obrigatório informar o ID da despesa' })
  @IsNumber({}, { message: 'ID da despesa deve ser um número' })
  expenseId: number;

  @IsNotEmpty({ message: 'Obrigatório informar o valor do último pagamento' })
  @IsNumber({}, { message: 'Último pagamento deve ser um número' })
  lastPayment: number;

  @IsNotEmpty({ message: 'Obrigatório informar o saldo mensal' })
  @IsNumber({}, { message: 'Saldo mensal deve ser um número' })
  currentMonthlyCash: number;

  @IsNotEmpty({ message: 'Obrigatório informar o saldo anual' })
  @IsNumber({}, { message: 'Saldo anual deve ser um número' })
  currentAnnualCash: number;
}
