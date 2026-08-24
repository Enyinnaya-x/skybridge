import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrxnDto{
    @IsNumber()
    amount!: bigint;

    @IsEmail()
    email!: string;
}