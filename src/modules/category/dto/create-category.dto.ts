import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Obrigatório preenher o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'Custo mensal é obrigatório' })
  @IsNumber({}, { message: 'Custo mensal deve ser um número' })
  monthlyCost: number;

  @IsNotEmpty({ message: 'Custo mensal é obrigatório' })
  @IsNumber({}, { message: 'Custo mensal deve ser um número' })
  annualCost: number;
}
