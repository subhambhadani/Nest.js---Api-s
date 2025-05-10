import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // This class will automatically inherit all properties from CreateUserDto
  // and make them optional due to PartialType
  // You can add additional properties or methods here if needed
}
