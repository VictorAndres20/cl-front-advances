import { putBank, putCompany, putCompanyName, putRol, putToken, putUserId } from "../../_utils/storage_handler";
import {
    loginUser,
    loginEmployee,
} from '../../_services/login.service';
import { LoginType } from "./type";

export const baseEntity: LoginType = {
    identification: '',
    password: '',
};

export const validateLoginModel = ({ identification, password }: LoginType) => {
    if(identification === '' || identification === undefined) throw new Error('Identificación vacía');
    if(password === '' || password === undefined) throw new Error('Contraseña vacía');
}

export const loginEvent = async (body: LoginType) => {
    validateLoginModel(body);
    let res = await loginEmployee(body);
    await putStorage(res);
    return res;
}

export const loginUserEvent = async (body: LoginType) => {
    validateLoginModel(body);
    let res = await loginUser(body);
    await putStorage(res);
    return res;
}

export const putStorage = async (res: any) => {
    putCompany(res.data.company_id);
    putCompanyName(res.data.company_name);
    putUserId(res.data.uuid);
    putRol(res.data.rol);
    putToken(res.data.token);
    putBank(res.data.bank);
}