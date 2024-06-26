import {
    findAllBank,
    findBankById,
    findAllBankPaged,
} from '../../_services/bank.service';

export const findAllBankEvent = async () => {
    return await findAllBank();
}

export const findBankByIdEvent = async (id: string) => {
    return await findBankById(id);
}

export const findAllBankPagedEvent = async (page: number, limit = 8) => {
    return await findAllBankPaged(page, limit);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */