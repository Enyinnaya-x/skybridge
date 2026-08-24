import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTrxnDto } from './dto/create-trxn.dto.js';
import { PrismaService } from '@/prisma/prisma.service.js';
import { randomInt } from 'crypto';

@Injectable()
export class TransactionService {

    constructor(private readonly prisma: PrismaService){}


    async initializeTransaction(createTrxnDto: CreateTrxnDto, apiKey: string){

        //confirm the apiKey is valid
        const isValidKey = await this.prisma.apiKeys.findFirst({
            where: {
                api_key: apiKey,
                is_valid: true
            }
        });

        if (!isValidKey) throw new UnauthorizedException("Invalid API Key");

        //generate an account number for them to accept funds
        
        const acc_num = randomInt(1_000_000_000, 10_000_000_000).toString();
        const bank_name = process.env.BANK_NAME ?? "SkyBridge";
        const amount = createTrxnDto.amount;
        const expires_at = new Date(Date.now() + 30 * 60 * 1000);
        const user_id = isValidKey.user_id!;
        
        const data = {
            acc_num,
            bank_name,
            amount,
            expires_at,
            user_id
        }

        await this.prisma.virtualAccounts.create({
            data
        });

        return {
            acc_num,
            bank_name,
            amount,
            expires_at
        };


    }
}
