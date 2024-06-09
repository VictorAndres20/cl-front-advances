import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service';


const BASE_PATH = '/bank-supported';

export const findAllBankSupported = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS, null);
}

export const findBankSupportedById = async (id: string) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS, null);
}

export const createBankSupported = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editBankSupported = async (id: string, body: any) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllBankSupportedPaged = async (page: number, limit: number) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS, null);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */