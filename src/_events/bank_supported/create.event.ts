import {
    createBankSupported,
    editBankSupported,
} from '../../_services/bank_supported.service';
import { validateBankSupported } from './model';
import { BankSupportedType } from './type';

export const createBankSupportedEvent = async (body: BankSupportedType) => {
    validateBankSupported(body);
    return await createBankSupported(body);
}

export const editBankSupportedEvent = async (id: string, body: BankSupportedType) => {
    validateBankSupported(body);
    return await editBankSupported(id, body);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */