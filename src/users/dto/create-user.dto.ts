import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'], {
    message: 'Role must be one of the following: ADMIN, ENGINEER, INTERN',
  })
  role: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
