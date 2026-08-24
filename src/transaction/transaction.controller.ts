import { Body, Controller, Post, ValidationPipe, Headers } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { CreateTrxnDto } from './dto/create-trxn.dto.js';


@Controller('transaction')
export class TransactionController {

    constructor(private readonly transactionService: TransactionService){}

    @Post('initialize')
    async initialize(@Body(ValidationPipe) createTrxnDto: CreateTrxnDto,  @Headers('x-api-key') apiKey: string,){

        try{

            const res = await this.transactionService.initializeTransaction(createTrxnDto, apiKey)
            return res;

        }catch(err){
            throw err
        }


    }

    
}
