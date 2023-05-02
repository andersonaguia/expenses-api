import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'Obrigatório preenher o ano atual' })
  @IsNumber({}, { message: 'Ano atual deve ser um número' })
  readonly currentYear: number;

  @IsNotEmpty({ message: 'Obrigatório preenher o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Obrigatório preencher a categoria' })
  @IsNumber({}, { message: 'Categoria deve ser um número' })
  category: number;

  @IsString({ message: 'Nome deve ser uma string' })
  readonly comments?: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o percentual do Solar' })
  @IsNumber({}, { message: 'Percentual do Solar deve ser um número' })
  readonly solarPercentage: number;

  @IsNotEmpty({ message: 'Obrigatório preencher o percentual do Rivière' })
  @IsNumber({}, { message: 'Percentual do Rivière deve ser um número' })
  readonly rivierePercentage: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa mensal' })
  @IsNumber({}, { message: 'Despesa mensal deve ser um número' })
  readonly monthlyExpense: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa anual' })
  @IsNumber({}, { message: 'Despesa anual deve ser um número' })
  readonly annualExpense: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa mensal do Solar' })
  @IsNumber({}, { message: 'Despesa mensal do solar deve ser um número' })
  readonly solarMonthExpense: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa mensal do Rivière' })
  @IsNumber({}, { message: 'Despesa mensal do Rivière deve ser um número' })
  readonly riviereMonthExpense: number;
}
