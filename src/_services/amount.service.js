import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service.js';


const BASE_PATH = '/amount';

export const findAllAmount = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS);
}

export const findAmountById = async (id) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS);
}

export const createAmount = async (body) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editAmount = async (id, body) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllAmountPaged = async (page, limit) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */