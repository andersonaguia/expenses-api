import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExpenseDto {
  @IsNotEmpty({ message: 'Obrigatório informar o comentário' })
  @IsString({ message: 'Comentário deve ser uma string' })
  readonly comments: string;
}
