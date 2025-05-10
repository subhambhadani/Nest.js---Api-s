import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // get all users or role based users
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    try {
      if (
        role &&
        role !== 'ADMIN' &&
        role !== 'ENGINEER' &&
        role !== 'INTERN'
      ) {
        throw new BadRequestException(
          'Invalid role provided. Please use ADMIN, ENGINEER, or INTERN.',
        );
      }
      return this.usersService.findAll(role);
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      throw error; // Re-throw the error to ensure it propagates to the client
    }
  }

  @Get('interns') // get interns
  findAllInterns() {
    try {
      return this.usersService.findAllInterns();
    } catch (error) {
      console.error('Error occurred while fetching interns:', error);
      throw error;
    }
  }

  @Get(':id') // get user by id
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      console.error('Error occurred while fetching user:', error);
    }
  }

  @Post() // create user
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error occurred while creating user:', error);
      throw error;
    }
  }

  @Patch(':id') // update user
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      console.error('Error occurred while updating user:', error);
      throw error;
    }
  }

  @Delete(':id') // delete user
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      console.error('Error occurred while deleting user:', error);
      throw error;
    }
  }
}
