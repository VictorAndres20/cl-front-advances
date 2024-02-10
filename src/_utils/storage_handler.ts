import {crypt, decrypt} from './crypt';

const TOKEN_KEY = 'advqwer';
const COMPANY_KEY = 'advasdf';
const COMPANY_NAME_KEY = 'advnatf';
const USER_ID_KEY = 'advzxcv';
const ROL_ID_KEY = 'advuiop';

export const putValue = (key: string, value: any) => {
    window.localStorage.setItem(key, crypt(value.toString()));
}

export const getValue = (key: string) => {
    let data = window.localStorage.getItem(key);
    if(data != null) return decrypt(data);
    else return data;
}

export const cleanValue = (key: string) => {
    window.localStorage.removeItem(key);
}

export const cleanValues = () => {
    window.localStorage.clear();
}

export const putToken = (token: string) => {
    putValue(TOKEN_KEY, token);
}

export const getToken = () => {
    return getValue(TOKEN_KEY);
}

export const putCompany = (id: any) => {
    putValue(COMPANY_KEY, id);
}

export const getCompany = () => {
    return Number(getValue(COMPANY_KEY));
}

export const putCompanyName = (id: any) => {
    putValue(COMPANY_NAME_KEY, id);
}

export const getCompanyName = () => {
    return getValue(COMPANY_NAME_KEY);
}

export const putUserId = (id: any) => {
    putValue(USER_ID_KEY, id);
}

export const getUserId = () => {
    return getValue(USER_ID_KEY);
}

export const putRol = (id: any) => {
    putValue(ROL_ID_KEY, id);
}

export const getRol = () => {
    return getValue(ROL_ID_KEY);
}