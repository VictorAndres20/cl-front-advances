import {
    findAllFintech,
    findFintechById,
    findAllFintechPaged,
} from '../../_services/fintech.service';

export const findAllFintechEvent = async () => {
    return await findAllFintech();
}

export const findFintechByIdEvent = async (id: string) => {
    return await findFintechById(id);
}

export const findAllFintechPagedEvent = async (page: number, limit: number = 8) => {
    return await findAllFintechPaged(page, limit);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */