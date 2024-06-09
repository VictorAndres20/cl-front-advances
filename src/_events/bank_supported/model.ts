import { BankSupportedType } from "./type";

export const validateBankSupported = (body: BankSupportedType) => {
    //const {  } = body;
}

export const transformEntityBankSupported = (entity: BankSupportedType) => {
    let newEnt = {...entity}
    if(typeof newEnt.bank === 'object') newEnt.bank = newEnt.bank?.cod;
    return newEnt;
}

export const buildEmptyBankSupported = () => {
    return {
        cod: '',
        bank: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */