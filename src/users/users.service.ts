import {Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js'
import { User } from '../../generated/prisma/client.js';
import { randomBytes } from 'crypto';

import { CreateKeyDto } from './dto/create-key.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  async createApiKey(createKeyDto: CreateKeyDto){
    //find the user
    const user = await this.findOne(createKeyDto.email);


    if(createKeyDto.type === 'LIVE'){
      // check if user has an existing live key 
      const keyDetails = await this.prisma.apiKeys.findFirst({
        where: {
          user_id: user.id,
          type: createKeyDto.type,
          is_valid: true
        }
      })

      if (keyDetails) return {
        "message": "API Key created",
        "key": keyDetails.api_key
      }
    }

    //generate apiKey
    const prefix = createKeyDto.type === "LIVE" ? "sk_live" : "sk_test_";

    const key = prefix + randomBytes(24).toString('hex');

    const data = {
      user_id: user.id,
      api_key: key,
      type: createKeyDto.type
    }

    await this.prisma.apiKeys.create({
      data
    })

    return {
      "message": "API Key created",
      "key": key
    }
    
  }


  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where:{
        email
      }
    })

    if (!user) throw new NotFoundException("Couldn't find user");

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
