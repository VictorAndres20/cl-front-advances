import { EmployeeType } from '../_events/employee/type';
import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service';


const BASE_PATH = '/employee';

export const findAllEmployee = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS, null);
}

export const findEmployeeById = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS, null);
}

export const createEmployee = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editEmployee = async (id: any, body: any) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllEmployeePaged = async (page: any, limit: any) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS, null);
}

export const findAllEmployeeByEnterprise = async (enterprise: number) => {
    return await handleFetch(`${BASE_PATH}/enterprise/${enterprise}`, GET_OPTIONS, null);
}

export const editPasswordEmployee = async (id: string, body: EmployeeType) => {
    return await handleFetch(`${BASE_PATH}/edit/password/${id}`, PUT_OPTIONS, body);
}

export const activateEmployee = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/activate/${id}`, PUT_OPTIONS, null);
}

export const blockEmployee = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/block/${id}`, PUT_OPTIONS, null);
}

export const retireEmployee = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/retire`, PUT_OPTIONS, body);
}

export const unretireEmployee = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/unretire`, PUT_OPTIONS, body);
}

export const readEmployeesExcel = async (body: {bytes: string}) => {
    return await handleFetch(`${BASE_PATH}/read-excel`, POST_OPTIONS, body);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */