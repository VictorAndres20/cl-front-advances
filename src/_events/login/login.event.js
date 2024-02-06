import { putToken } from "../../_utils/storage_handler";

export const baseEntity = {
    identification: '',
    password: '',
};

export const validateLoginModel = ({ identification, password }) => {
    if(identification === '' || identification === undefined) throw new Error('Identificación vacía');
    if(password === '' || password === undefined) throw new Error('Contraseña vacía');
}

export const loginEvent = async (body) => {
    validateLoginModel(body);
    //TODO Use service
    let res = null;
    putToken('1');
    return res;
}