import {
    createBank,
    editBank,
} from '../../_services/bank.service';
import { validateBank } from './model';
import { BankType } from './type';

export const createBankEvent = async (body: BankType) => {
    validateBank(body);
    return await createBank(body);
}

export const editBankEvent = async (id: string, body: BankType) => {
    validateBank(body);
    return await editBank(id, body);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */