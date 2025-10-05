import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Post()
  async create(@Body() body: Partial<User>): Promise<User> {
    return this.usersService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<User>): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const updatedUser = await this.usersService.update(id, body);
    if (!updatedUser) {
      throw new NotFoundException('Error al actualizar el usuario');
    }
    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.usersService.delete(id);
  }
}