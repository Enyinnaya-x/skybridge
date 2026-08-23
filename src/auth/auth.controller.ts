import { Controller, ValidationPipe, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginUserDto } from '../users/dto/login-user.dto.js';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){};
    
    @Public()
    @Post('register')
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        try {
            const res = await this.authService.create(createUserDto);
            return {
          first_name: res.first_name,
          last_name: res.last_name,
          business_name: res.business_name,
          email: res.email,
          phone: res.phone,
        };
      } catch (err) {
        throw err;
    }
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto){
        try{
            const res = await this.authService.signIn(loginUserDto.email, loginUserDto.password)
            return res;
        }catch(err){
            throw err;
        }
    }

    
}
