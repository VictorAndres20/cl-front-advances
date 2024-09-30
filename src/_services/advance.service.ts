import { handleFetch, GET_OPTIONS, POST_OPTIONS, PUT_OPTIONS } from './base.service';


const BASE_PATH = '/advance';

export const findAllAdvance = async () => {
    return await handleFetch(`${BASE_PATH}/all`, GET_OPTIONS, null);
}

export const findAdvanceById = async (id: any) => {
    return await handleFetch(`${BASE_PATH}/id/${id}`, GET_OPTIONS, null);
}

export const createAdvance = async (body: any) => {
    return await handleFetch(`${BASE_PATH}/create`, POST_OPTIONS, body);
}

export const editAdvance = async (id: any, body: any) => {
    return await handleFetch(`${BASE_PATH}/edit/${id}`, PUT_OPTIONS, body);
}

export const findAllAdvancePaged = async (page: number, limit: number) => {
    return await handleFetch(`${BASE_PATH}/all-paged/${page}/${limit}`, GET_OPTIONS, null);
}

export const findAllAdvanceByEmployeePaged = async (page: number, limit: number, employee: string) => {
    return await handleFetch(`${BASE_PATH}/all/employee/paged/${page}/${limit}/${employee}`, GET_OPTIONS, null);
}

export const findAllAdvanceByEnterprise = async (enterprise: number) => {
    return await handleFetch(`${BASE_PATH}/all/enterprise/${enterprise}`, GET_OPTIONS, null);
}

export const findAllPendingAdvanceByEnterprise = async (enterprise: number) => {
    return await handleFetch(`${BASE_PATH}/all/enterprise/pending/${enterprise}`, GET_OPTIONS, null);
}

export const approveAdvance = async (id: string) => {
    return await handleFetch(`${BASE_PATH}/approve/${id}`, PUT_OPTIONS, null);
}

export const declineAdvance = async (id: string) => {
    return await handleFetch(`${BASE_PATH}/decline/${id}`, PUT_OPTIONS, null);
}

export const pdfAdvanceById = async (id: string) => {
    return await handleFetch(`${BASE_PATH}/pdf/${id}`, GET_OPTIONS, null);
}

export const findAllPendingAdvance = async () => {
    return await handleFetch(`${BASE_PATH}/all/pending`, GET_OPTIONS, null);
}

export const findAllAdvanceByPeriod = async (period: string) => {
    return await handleFetch(`${BASE_PATH}/all-period/${period}`, GET_OPTIONS, null);
}

/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */