import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsISO31661Alpha2, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name!: string;

    @IsNotEmpty()
    @IsString()
    last_name!: string;

    @IsNotEmpty()
    @IsString()
    business_name!: string;

    @IsEmail()
    email!: string;

    @IsPhoneNumber()
    phone!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsISO31661Alpha2()
    country_code!: string;

}
