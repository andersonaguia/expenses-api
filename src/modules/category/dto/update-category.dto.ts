import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Obrigatório informar o nome' })
  @IsString({ message: 'Nome deve ser uma string' })
  readonly name: string;
}
