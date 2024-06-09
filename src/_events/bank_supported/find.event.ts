import {
    findAllBankSupported,
    findBankSupportedById,
    findAllBankSupportedPaged,
} from '../../_services/bank_supported.service';

export const findAllBankSupportedEvent = async () => {
    return await findAllBankSupported();
}

export const findBankSupportedByIdEvent = async (id: string) => {
    return await findBankSupportedById(id);
}

export const findAllBankSupportedPagedEvent = async (page: number, limit = 8) => {
    return await findAllBankSupportedPaged(page, limit);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */