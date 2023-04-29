import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Dados incorretos! Verifique seu e-mail e senha e tente novamente',
  })
  readonly password: string;
}
