import { UserType } from '../_events/user/type';
import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service';


const BASE_PATH = '/user';

export const findAllUser = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS, null);
}

export const findUserById = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS, null);
}

export const createUser = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editUser = async (id: any, body: any) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllUserPaged = async (page: any, limit: any) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS, null);
}

export const editPasswordUser = async (id: string, body: UserType) => {
    return await handleFetch(`${BASE_PATH}/edit/password/${id}`, PUT_OPTIONS, body);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */