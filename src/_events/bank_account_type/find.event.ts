import {
    findAllBankAccountType,
    findBankAccountTypeById,
    findAllBankAccountTypePaged,
} from '../../_services/bank_account_type.service';

export const findAllBankAccountTypeEvent = async () => {
    return await findAllBankAccountType();
}

export const findBankAccountTypeByIdEvent = async (id: string) => {
    return await findBankAccountTypeById(id);
}

export const findAllBankAccountTypePagedEvent = async (page: number, limit: number = 8) => {
    return await findAllBankAccountTypePaged(page, limit);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */