export class CreateUserDto {
  name: string;
  email: string;
  role: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
