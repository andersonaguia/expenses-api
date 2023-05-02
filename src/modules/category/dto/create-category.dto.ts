import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Obrigatório preenher o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;
}
