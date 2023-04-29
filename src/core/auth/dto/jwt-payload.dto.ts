import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/modules/users/enum/user.role';

export class JwtPayloadDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  email: string;
}
