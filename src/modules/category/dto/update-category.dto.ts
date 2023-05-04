import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Custo mensal deve ser um número' })
  readonly monthlyCost: number;

  @IsOptional()
  @IsNumber({}, { message: 'Custo anual deve ser um número' })
  readonly annualCost: number;

  modifiedBy: UserEntity;

  updatedAt: Date;
}
