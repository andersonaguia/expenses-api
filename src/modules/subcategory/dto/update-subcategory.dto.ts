import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class UpdateSubcategoryDto {
  @IsNotEmpty({ message: 'Obrigatório informar o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  modifiedBy: UserEntity;

  updatedAt: Date;
}
