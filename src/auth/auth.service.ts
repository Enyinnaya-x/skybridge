
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { User } from '../../generated/prisma/client.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  
    async create(createUserDto: CreateUserDto): Promise<User> {
      //check if the user exist
      const existingUser = await this.prisma.user.findFirst({
        where:{
          OR:[
            {email: createUserDto.email},
            {phone: createUserDto.phone},
            {business_name: createUserDto.business_name}
          ]
        }
      });
  
      if (existingUser) throw new ConflictException("This account already exists, log in instead");
  
  
      return this.prisma.user.create({data: createUserDto,});
  
  
    }

    async signIn( email: string, pass: string,): Promise<{ access_token: string }> {

        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
        throw new UnauthorizedException();
        }
        const payload = { sub: user.id, useremail: user.email };
        return {
        // Here the JWT secret key that's used for signing the payload 
        // is the key that was passed in the JwtModule
        access_token: await this.jwtService.signAsync(payload),
        };

    }
}
