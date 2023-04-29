import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { UserRole } from '../enum/user.role';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Obrigatório preencher o nome' })
  @IsString({ message: 'Nome precisa ser uma string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o cargo' })
  @IsString({ message: 'Cargo precisa ser uma string' })
  readonly occupation: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o e-mail' })
  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido',
    },
  )
  readonly email: string;

  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Obrigatório inserir uma senha' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Senha precisa possuir 8 caracteres sendo ao menos um maiúsculo, um minúsculo e um caractere especial',
  })
  readonly password: string;

  @Match('password', { message: 'Senhas não conferem' })
  @IsNotEmpty({ message: 'Confirmação da senha é obrigatória' })
  readonly passwordConfirmation: string;

  @IsEnum(UserRole, { message: 'Insira uma regra válida' })
  readonly role?: UserRole;
}
