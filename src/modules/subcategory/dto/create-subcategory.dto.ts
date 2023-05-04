import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsNotEmpty({ message: 'Obrigatório preenher o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;
}
