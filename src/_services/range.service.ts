import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service';


const BASE_PATH = '/range';

export const findAllRange = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS, null);
}

export const findRangeById = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS, null);
}

export const createRange = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editRange = async (id: any, body: any) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllRangePaged = async (page: any, limit: any) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS, null);
}

export const findAllRangeByEnterprise = async (enterprise: number) => {
    return await handleFetch(`${BASE_PATH}/enterprise/${enterprise}`, GET_OPTIONS, null);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */