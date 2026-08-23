import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { APIKEYTYPE } from '../../../generated/prisma/client.js';

export class CreateKeyDto{
    @IsEmail()
    email!: string;

    @IsNotEmpty()
      @IsEnum(APIKEYTYPE, { message: "Invalid api key type" })
    type!: APIKEYTYPE;
}