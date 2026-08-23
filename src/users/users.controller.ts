import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateKeyDto } from './dto/create-key.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


    @Post('key')
    async createApiKey(@Body(ValidationPipe) createKeyDto: CreateKeyDto){
      try{ 
          const res = await this.usersService.createApiKey(createKeyDto);
          return res;
      }catch(err){
        throw err
      }
    }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
