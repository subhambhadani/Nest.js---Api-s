import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice Smith', email: 'alice@nest.com', role: 'ADMIN' },
    { id: 2, name: 'Bob Johnson', email: 'bob@nest.com', role: 'ENGINEER' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@nest.com', role: 'INTERN' },
    { id: 4, name: 'Diana Prince', email: 'diana@nest.com', role: 'ENGINEER' },
    { id: 5, name: 'Eve Adams', email: 'eve@nest.com', role: 'ADMIN' },
    { id: 6, name: 'Frank White', email: 'frank@nest.com', role: 'INTERN' },
    { id: 7, name: 'Grace Hopper', email: 'grace@nest.com', role: 'ENGINEER' },
    { id: 8, name: 'Hank Green', email: 'hank@nest.com', role: 'ADMIN' },
    { id: 9, name: 'Ivy Lee', email: 'ivy@nest.com', role: 'INTERN' },
    { id: 10, name: 'Jack Black', email: 'jack@nest.com', role: 'ENGINEER' },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    try {
      if (role) {
        return this.users.filter((user) => user.role === role);
      }
      return this.users;
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      throw new Error('Unable to fetch users at this time.');
    }
  }

  findOne(id: number) {
    try {
      const user = this.users.find((user) => user.id === id);
      console.log('User:', user);
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      return user;
    } catch (error) {
      console.error('Error occurred while fetching user:', error);
      throw new Error('Unable to fetch user at this time.');
    }
  }

  findAllInterns() {
    try {
      return this.users.filter((user) => user.role === 'INTERN');
    } catch (error) {
      console.error('Error occurred while fetching interns:', error);
      throw new Error('Unable to fetch interns at this time.');
    }
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
