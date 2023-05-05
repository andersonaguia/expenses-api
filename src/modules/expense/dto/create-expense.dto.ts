import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'Obrigatório preenher o ano atual' })
  @IsNumber({}, { message: 'Ano atual deve ser um número' })
  readonly currentYear: number;

  @IsNotEmpty({ message: 'Obrigatório preenher o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Obrigatório preencher a categoria' })
  @IsNumber({}, { message: 'Categoria deve ser um número' })
  categoryId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Subcategoria deve ser um número' })
  subcategoryId?: number;

  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  readonly comments?: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o percentual do residencial' })
  @IsNumber({}, { message: 'Percentual do residencial deve ser um número' })
  readonly residentialPercentage: number;

  @IsNotEmpty({ message: 'Obrigatório preencher o percentual do comercial' })
  @IsNumber({}, { message: 'Percentual do comercial deve ser um número' })
  readonly commercialPercentage: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa mensal' })
  @IsNumber({}, { message: 'Despesa mensal deve ser um número' })
  readonly monthlyExpense: number;

  @IsNotEmpty({ message: 'Obrigatório preencher a despesa anual' })
  @IsNumber({}, { message: 'Despesa anual deve ser um número' })
  readonly annualExpense: number;

  @IsNotEmpty({
    message: 'Obrigatório preencher a despesa mensal do residencial',
  })
  @IsNumber({}, { message: 'Despesa mensal do residencial deve ser um número' })
  readonly residentialMonthExpense: number;

  @IsNotEmpty({
    message: 'Obrigatório preencher a despesa mensal do comercial',
  })
  @IsNumber({}, { message: 'Despesa mensal do comercial deve ser um número' })
  readonly commercialMonthExpense: number;
}
